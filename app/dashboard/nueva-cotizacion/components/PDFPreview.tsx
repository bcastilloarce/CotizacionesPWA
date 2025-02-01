'use client';

import { PDFDocument, PDFFont, PDFPage, rgb, StandardFonts } from 'pdf-lib';
import { QuoteFormData } from '@/lib/validations/quote';

interface PDFPreviewProps {
	quote: QuoteFormData;
}


const PDFPreview: React.FC<PDFPreviewProps> = ({ quote }) => {
	const generatePDF = async () => {
		const pdfDoc = await PDFDocument.create();
		const page: PDFPage = pdfDoc.addPage([612, 792]); // Letter size: 8.5" x 11"
		const { width, height } = page.getSize();
		const margin = 20;

		// Load fonts with proper typing
		const helveticaFont: PDFFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
		const helveticaBoldFont: PDFFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

		// Add title
		const titleText = 'Cotización';
		const titleWidth = helveticaBoldFont.widthOfTextAtSize(titleText, 24);
		page.drawText(titleText, {
			x: (width - titleWidth) / 2,
			y: height - 350,
			size: 24,
			font: helveticaBoldFont,
		});

		// Draw underline for title
		page.drawLine({
			start: { x: (width - titleWidth) / 2, y: height - 355 },
			end: { x: (width + titleWidth) / 2, y: height - 355 },
			thickness: 1,
			color: rgb(0, 0, 0),
		});

		// Client information table
		const clientInfoStartY = height - 420;
		const labelWidth = (width - 2 * margin) * 0.2;
		const valueWidth = (width - 2 * margin) * 0.8;

		const drawClientInfo = (label: string, value: string, yPos: number) => {
			// Label cell
			page.drawRectangle({
				x: margin,
				y: yPos,
				width: labelWidth,
				height: 30,
				color: rgb(0.9, 0.9, 0.9),
				borderColor: rgb(0, 0, 0),
				borderWidth: 1,
			});

			page.drawText(label, {
				x: margin + 10,
				y: yPos + 10,
				size: 12,
				font: helveticaBoldFont,
			});

			// Value cell
			page.drawRectangle({
				x: margin + labelWidth,
				y: yPos,
				width: valueWidth,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1,
			});

			page.drawText(value || '', {
				x: margin + labelWidth + 10,
				y: yPos + 10,
				size: 12,
				font: helveticaFont,
			});
		};

		// Draw client information
		let currentY = clientInfoStartY;
		drawClientInfo('Cliente', quote.client || '', currentY);
		currentY -= 30;
		drawClientInfo('Fecha', new Date().toLocaleDateString('es-CL'), currentY);
		currentY -= 30;
		drawClientInfo('Marca', quote.brand || '', currentY);
		currentY -= 30;
		drawClientInfo('Modelo', quote.model || '', currentY);
		currentY -= 30;

		if (quote.year) {
			drawClientInfo('Año', quote.year.toString(), currentY);
			currentY -= 30;
		}

		if (quote.licensePlate) {
			drawClientInfo('Patente', quote.licensePlate, currentY);
			currentY -= 30;
		}

		// Products table
		const productsStartY = currentY - 30;
		const columnWidths = {
			product: (width - 2 * margin) * 0.4,
			quantity: (width - 2 * margin) * 0.2,
			price: (width - 2 * margin) * 0.2,
			total: (width - 2 * margin) * 0.2,
		};

		// Draw table header
		let currentX = margin;
		['Producto', 'Cantidad', 'Precio', 'Total'].forEach((header, index) => {
			const columnWidth = Object.values(columnWidths)[index];

			page.drawRectangle({
				x: currentX,
				y: productsStartY,
				width: columnWidth,
				height: 30,
				color: rgb(0.9, 0.9, 0.9),
				borderColor: rgb(0, 0, 0),
				borderWidth: 1,
			});

			page.drawText(header, {
				x: currentX + 10,
				y: productsStartY + 10,
				size: 12,
				font: helveticaBoldFont,
			});

			currentX += columnWidth;
		});

		// Draw products
		currentY = productsStartY - 30;
		quote.products?.forEach((product) => {
			currentX = margin;

			// Product name column
			page.drawRectangle({
				x: currentX,
				y: currentY,
				width: columnWidths.product,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1,
			});
			page.drawText(product.name || '', {
				x: currentX + 10,
				y: currentY + 10,
				size: 12,
				font: helveticaFont,
			});
			currentX += columnWidths.product;

			// Quantity column
			page.drawRectangle({
				x: currentX,
				y: currentY,
				width: columnWidths.quantity,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1,
			});
			page.drawText(product.quantity.toString(), {
				x: currentX + (columnWidths.quantity - helveticaFont.widthOfTextAtSize(product.quantity.toString(), 12)) / 2,
				y: currentY + 10,
				size: 12,
				font: helveticaFont,
			});
			currentX += columnWidths.quantity;

			// Price column
			const priceText = `$${product.unitPrice.toLocaleString('es-CL')}`;
			page.drawRectangle({
				x: currentX,
				y: currentY,
				width: columnWidths.price,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1,
			});
			page.drawText(priceText, {
				x: currentX + (columnWidths.price - helveticaFont.widthOfTextAtSize(priceText, 12)) / 2,
				y: currentY + 10,
				size: 12,
				font: helveticaFont,
			});
			currentX += columnWidths.price;

			// Total column
			const totalText = `$${(product.quantity * product.unitPrice).toLocaleString('es-CL')}`;
			page.drawRectangle({
				x: currentX,
				y: currentY,
				width: columnWidths.total,
				height: 30,
				borderColor: rgb(0, 0, 0),
				borderWidth: 1,
			});
			page.drawText(totalText, {
				x: currentX + (columnWidths.total - helveticaFont.widthOfTextAtSize(totalText, 12)) / 2,
				y: currentY + 10,
				size: 12,
				font: helveticaFont,
			});

			currentY -= 30;
		});

		// Total with tax
		const totalText = `Total (IVA inc.): $${quote.totalWithTax.toLocaleString('es-CL')}`;
		page.drawText(totalText, {
			x: width - margin - helveticaBoldFont.widthOfTextAtSize(totalText, 14),
			y: currentY - 40,
			size: 14,
			font: helveticaBoldFont,
		});

		// Stock availability text if applicable
		if (quote.untilStockLasts) {
			page.drawText('* Válido hasta agotar stock', {
				x: margin,
				y: currentY - 80,
				size: 12,
				font: helveticaBoldFont,
			});
		}

		const pdfBytes = await pdfDoc.save();
		return pdfBytes;
	};

	const downloadPDF = async () => {
		const pdfBytes = await generatePDF();
		const blob = new Blob([pdfBytes], { type: 'application/pdf' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `N${String(Date.now()).slice(-3)}_${quote.client.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	};

	return (
		<div className="flex gap-4">
			<button
				onClick={async () => {
					const pdfBytes = await generatePDF();
					const blob = new Blob([pdfBytes], { type: 'application/pdf' });
					const url = URL.createObjectURL(blob);
					window.open(url);
				}}
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
			>
				Ver PDF
			</button>
			<button
				onClick={downloadPDF}
				className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
			>
				Descargar PDF
			</button>
		</div>
	);
};

export default PDFPreview;