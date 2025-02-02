import { jsPDF } from 'jspdf';
import { getNextQuoteNumber } from '@/utils/quoteNumbering';
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
	const doc = new jsPDF();
	let yPosition = 20; // Starting position

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
		doc.text(value, tableStart + labelWidth + 5, yPosition);
		doc.rect(tableStart, yPosition - 5, labelWidth + valueWidth, 10, 'S');
		yPosition += 10;
	};

	addTableRow('Cliente', data.client);
	addTableRow('Fecha', new Date(data.date).toLocaleDateString('es-CL'));
	addTableRow('Marca', data.brand);
	addTableRow('Modelo', data.model);
	if (data.year) addTableRow('Año', data.year);
	if (data.licensePlate) addTableRow('Patente', data.licensePlate);

	const durationText = data.untilStockLasts
		? `${data.duration} o hasta agotar stock`
		: data.duration;
	addTableRow('Duración', durationText);

	yPosition += 60; // 60 units spacing before products table

	// Products Table
	const columns = {
		product: { header: 'Producto', width: 0.4 },
		quantity: { header: 'Cantidad', width: 0.2 },
		price: { header: 'Precio', width: 0.2 },
		total: { header: 'Total', width: 0.2 }
	};

	// Table headers
	doc.setFont('helvetica', 'bold');
	doc.setFillColor(240, 240, 240);
	let xPos = tableStart;
	const tableWidth = doc.internal.pageSize.width - 40;

	Object.entries(columns).forEach(([_, col]) => {
		const colWidth = tableWidth * col.width;
		doc.rect(xPos, yPosition - 5, colWidth, 10, 'F');
		doc.text(col.header, xPos + 5, yPosition);
		xPos += colWidth;
	});
	yPosition += 10;

	// Table content
	doc.setFont('helvetica', 'normal');
	data.products.forEach((product) => {
		xPos = tableStart;
		Object.entries(columns).forEach(([key, col]) => {
			const colWidth = tableWidth * col.width;
			let value = '';
			switch(key) {
				case 'product':
					value = product.name;
					break;
				case 'quantity':
					value = product.quantity.toString();
					break;
				case 'price':
					value = `$${product.unitPrice.toLocaleString('es-CL')}`;
					break;
				case 'total':
					value = `$${(product.quantity * product.unitPrice).toLocaleString('es-CL')}`;
					break;
			}
			doc.text(value, xPos + 5, yPosition);
			doc.rect(xPos, yPosition - 5, colWidth, 10, 'S');
			xPos += colWidth;
		});
		yPosition += 40;
	});

	// Total
	yPosition += 40;
	doc.setFont('helvetica', 'bold');
	doc.setFontSize(14);
	const totalText = `Total con IVA: $${data.totalWithTax.toLocaleString('es-CL')}`;
	doc.text(totalText, doc.internal.pageSize.width - 20, yPosition, { align: 'right' });

	// Availability if present
	if (data.availability) {
		yPosition += 20;
		doc.setFontSize(12);
		doc.text(`Disponibilidad: ${data.availability}`, tableStart, yPosition);
	}

	// Add signature at the bottom
	const signatureWidth = 200;
	const signatureHeight = 60;
	doc.addImage(firmaBase64, 'PNG',
		(doc.internal.pageSize.width - signatureWidth)/2,
		doc.internal.pageSize.height - 80,
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