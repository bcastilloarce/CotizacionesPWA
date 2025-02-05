import { jsPDF } from 'jspdf';
import { getNextQuoteNumber } from '@/app/api/pdf/quoteNumbering';
import fs from 'fs';
import path from 'path';

interface PDFProduct {
	name: string;
	quantity: number;
	unitPrice: number;
}

interface QuoteData {
	client: string;
	date: string;
	brand: string;
	model: string;
	year?: string;
	licensePlate?: string;
	duration: string;
	untilStockLasts: boolean;  // Changed from optional to required
	availability?: string;
	products: Array<PDFProduct>;
	totalWithTax: number;
}

// Update image paths to be relative to project root
const LOGO_PATH = path.join(process.cwd(), 'public', 'assets', 'images', 'logo.png');
const FIRMA_PATH = path.join(process.cwd(), 'public', 'assets', 'images', 'firma.png');

const getBase64Image = (filePath: string): string => {
	const imageBuffer = fs.readFileSync(filePath);
	return `data:image/png;base64,${imageBuffer.toString('base64')}`;
};

export const generatePDF = async (data: QuoteData): Promise<Buffer> => {
	const doc = new jsPDF({
		orientation: 'portrait',
		unit: 'mm',
		format: 'a4',
		compress: true
	});
	let yPosition = 20; // Starting position

	// Add custom font for better Spanish character support
	doc.setFont('helvetica');

	// Load and add images using base64
	const logoBase64 = getBase64Image(LOGO_PATH);
	const firmaBase64 = getBase64Image(FIRMA_PATH);

	// Add logo at the top (926x272 units as specified)
	doc.addImage(logoBase64, 'PNG', (doc.internal.pageSize.width - 926/5)/2, yPosition, 926/5, 272/5);
	yPosition += (272/5) + 40; // Logo height + 40 units spacing

	// Add title
	doc.setFont('helvetica', 'bold');
	doc.setFontSize(24);
	doc.text('Cotización', doc.internal.pageSize.width/2, yPosition, { align: 'center' });
	doc.setLineWidth(0.5);
	const titleWidth = doc.getTextWidth('Cotización');
	doc.line((doc.internal.pageSize.width - titleWidth)/2, yPosition + 2,
					 (doc.internal.pageSize.width + titleWidth)/2, yPosition + 2);
	yPosition += 30; // 30 units spacing after title

	// Client Information Table
	doc.setFontSize(12);
	const tableStart = 20;
	const labelWidth = (doc.internal.pageSize.width - 40) * 0.2;
	const valueWidth = (doc.internal.pageSize.width - 40) * 0.8;

	const addTableRow = (label: string, value: string) => {
		doc.setFont('helvetica', 'bold');
		doc.setFillColor(240, 240, 240);
		doc.rect(tableStart, yPosition - 5, labelWidth, 10, 'F');
		doc.text(label, tableStart + 5, yPosition);

		doc.setFont('helvetica', 'normal');
		// Handle long text by splitting into multiple lines if needed
		const maxWidth = valueWidth - 10; // 5px padding on each side
		const lines = splitText(value, maxWidth, doc);
		lines.forEach((line, index) => {
			doc.text(line, tableStart + labelWidth + 5, yPosition + (index * 5));
		});

		// Adjust row height based on number of lines
		const rowHeight = Math.max(10, lines.length * 5 + 5);
		doc.rect(tableStart, yPosition - 5, labelWidth + valueWidth, rowHeight, 'S');
		yPosition += rowHeight;
	};

	addTableRow('Cliente', data.client);
	addTableRow('Fecha', new Date(data.date).toLocaleDateString('es-CL'));
	addTableRow('Marca', data.brand);
	addTableRow('Modelo', data.model);
	if (data.year) addTableRow('Año', data.year);
	if (data.licensePlate) addTableRow('Patente', data.licensePlate);

	const durationText = data.untilStockLasts
		? `${data.duration} días o hasta agotar stock`
		: `${data.duration} días`;
	addTableRow('Duración', durationText);

	yPosition += 60; // 60 units spacing before products table

	// Products Table with consistent styling
	const tableWidth = doc.internal.pageSize.width - 40;

	// Table headers with consistent styling
	doc.setFontSize(12);
	doc.setFont('helvetica', 'bold');
	doc.setFillColor(240, 240, 240);

	let xPos = tableStart;
	const columns = {
		product: { header: 'Producto', width: 0.4 },
		quantity: { header: 'Cantidad', width: 0.2 },
		price: { header: 'Precio', width: 0.2 },
		total: { header: 'Total', width: 0.2 }
	};

	// Draw table headers with consistent styling
	Object.entries(columns).forEach(([_, col]) => {
		const colWidth = tableWidth * col.width;
		doc.rect(xPos, yPosition - 5, colWidth, 10, 'FD'); // Fill and draw borders
		doc.text(col.header, xPos + 5, yPosition);
		xPos += colWidth;
	});
	yPosition += 10;

	// Table content with consistent styling
	doc.setFont('helvetica', 'normal');
	data.products.forEach((product) => {
		xPos = tableStart;
		let rowHeight = 10;
		let maxRowHeight = rowHeight;

		// First pass: calculate max row height based on product name wrapping
		const productLines = splitText(product.name, tableWidth * columns.product.width - 10, doc);
		maxRowHeight = Math.max(maxRowHeight, productLines.length * 5 + 5);

		// Second pass: draw cells with proper height
		Object.entries(columns).forEach(([key, col]) => {
			const colWidth = tableWidth * col.width;
			let value = '';

			// Draw cell background and border
			doc.setFillColor(255, 255, 255);
			doc.rect(xPos, yPosition - 5, colWidth, maxRowHeight, 'FD');

			switch(key) {
				case 'product':
					// Handle multiline product names
					productLines.forEach((line, index) => {
						doc.text(line, xPos + 5, yPosition + (index * 5));
					});
					break;
				case 'quantity':
					value = product.quantity.toString();
					doc.text(value, xPos + colWidth - 5 - doc.getTextWidth(value), yPosition);
					break;
				case 'price':
					value = `$${product.unitPrice.toLocaleString('es-CL')}`;
					doc.text(value, xPos + colWidth - 5 - doc.getTextWidth(value), yPosition);
					break;
				case 'total':
					value = `$${(product.quantity * product.unitPrice).toLocaleString('es-CL')}`;
					doc.text(value, xPos + colWidth - 5 - doc.getTextWidth(value), yPosition);
					break;
			}
			xPos += colWidth;
		});
		yPosition += maxRowHeight;
	});

	// Total with box
	yPosition += 20;
	doc.setFont('helvetica', 'bold');
	doc.setFontSize(14);
	const totalText = `Total con IVA: $${data.totalWithTax.toLocaleString('es-CL')}`;
	const totalWidth = doc.getTextWidth(totalText) + 10; // 5px padding on each side
	const totalBoxX = doc.internal.pageSize.width - 20 - totalWidth;
	
	// Draw total box with light gray background
	doc.setFillColor(245, 245, 245);
	doc.rect(totalBoxX, yPosition - 8, totalWidth, 12, 'F');
	doc.setDrawColor(200, 200, 200);
	doc.rect(totalBoxX, yPosition - 8, totalWidth, 12, 'S');
	
	// Draw total text
	doc.text(totalText, doc.internal.pageSize.width - 20, yPosition, { align: 'right' });

	// Availability if present
	if (data.availability) {
		yPosition += 20;
		doc.setFontSize(12);
		doc.text(`Disponibilidad: ${data.availability}`, tableStart, yPosition);
	}

	// Add signature with fixed 100x100 dimensions
	const signatureWidth = 100;
	const signatureHeight = 100;
	doc.addImage(
		firmaBase64,
		'PNG',
		(doc.internal.pageSize.width - signatureWidth)/2,
		doc.internal.pageSize.height - signatureHeight - 20,
		signatureWidth,
		signatureHeight
	);

	// Add page number
	doc.setFontSize(10);
	doc.text(
		`${doc.getCurrentPageInfo().pageNumber} / ${doc.getNumberOfPages()}`,
		doc.internal.pageSize.width - 20,
		doc.internal.pageSize.height - 10,
		{ align: 'right' }
	);

	// Return the PDF as a Buffer instead of saving
	return Buffer.from(doc.output('arraybuffer'));
};

const splitText = (text: string, maxWidth: number, doc: jsPDF): string[] => {
	const words = text.split(' ');
	const lines: string[] = [];
	let currentLine = words[0];

	for (let i = 1; i < words.length; i++) {
		const word = words[i];
		const width = doc.getTextWidth(currentLine + ' ' + word);

		if (width < maxWidth) {
			currentLine += ' ' + word;
		} else {
			lines.push(currentLine);
			currentLine = word;
		}
	}
	lines.push(currentLine);
	return lines;
};

const generateFileName = async (clientName: string): Promise<string> => {
	const sanitizedName = clientName
		.toLowerCase()
		.replace(/[^a-z0-9]/g, '_')
		.replace(/_+/g, '_');

	// Get next sequence number
	const nextNum = await getNextQuoteNumber();
	return `N${nextNum.toString().padStart(3, '0')}_${sanitizedName}.pdf`;
};