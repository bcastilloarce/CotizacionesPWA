import { jsPDF } from 'jspdf';
import { getNextQuoteNumber } from '@/app/api/pdf/quoteNumbering';
import fs from 'fs';
import path from 'path';

// Spacing constants
const SPACING = {
  LOGO: 10,
  TITLE: 15,
  TABLE: 10, // Reducido de 20 a 10
  SECTION: 8  // Reducido de 12 a 8
};
// # Bloque 2: Ajuste de dimensiones de firma ✍️
const SIGNATURE_DIMENSIONS = {
  width: 50,  // Reducido 50%
  height: 50, // Reducido 50%
  bottomMargin: 20
} as const;

// Table styles
type RGB = [number, number, number];

const TABLE_STYLES = {
  header: {
    fillColor: [220, 220, 220] as RGB, // Gris más claro
    textColor: [0, 0, 0] as RGB,
    fontSize: 12
  },
  cell: {
    fillColor: [255, 255, 255] as RGB,
    textColor: [0, 0, 0] as RGB,
    fontSize: 11
  }
};

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

const addProductsTable = (doc: jsPDF, products: PDFProduct[], startY: number) => {
  const pageHeight = doc.internal.pageSize.height;
  const rowHeight = 10;
  let currentY = startY;
  const tableWidth = doc.internal.pageSize.width - 40;
  const tableStart = 20;

  // Table headers
  const addTableHeaders = (y: number) => {
    doc.setFontSize(TABLE_STYLES.header.fontSize);
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(TABLE_STYLES.header.fillColor[0], TABLE_STYLES.header.fillColor[1], TABLE_STYLES.header.fillColor[2]);

    let xPos = tableStart;
    const columns = {
      product: { header: 'Producto', width: 0.4 },
      quantity: { header: 'Cantidad', width: 0.2 },
      price: { header: 'Precio', width: 0.2 },
      total: { header: 'Total', width: 0.2 }
    };

    Object.entries(columns).forEach(([_, col]) => {
      const colWidth = tableWidth * col.width;
      doc.rect(xPos, y - 5, colWidth, 10, 'FD');
      doc.text(col.header, xPos + 5, y);
      xPos += colWidth;
    });
    return y + 10;
  };

  currentY = addTableHeaders(currentY);

  products.forEach((product) => {
    if (currentY + rowHeight > pageHeight - 40) {
      doc.addPage();
      currentY = addTableHeaders(40);
    }

    let xPos = tableStart;
    const columns = {
      product: { width: 0.4 },
      quantity: { width: 0.2 },
      price: { width: 0.2 },
      total: { width: 0.2 }
    };

    doc.setFontSize(TABLE_STYLES.cell.fontSize);
    doc.setFont('helvetica', 'normal');

    Object.entries(columns).forEach(([key, col]) => {
      const colWidth = tableWidth * col.width;
      doc.setFillColor(TABLE_STYLES.cell.fillColor[0], TABLE_STYLES.cell.fillColor[1], TABLE_STYLES.cell.fillColor[2]);
      doc.rect(xPos, currentY - 5, colWidth, rowHeight, 'FD');

      let value = '';
      switch(key) {
        case 'product':
          value = product.name;
          doc.text(value, xPos + 5, currentY);
          break;
        case 'quantity':
          value = product.quantity.toString();
          doc.text(value, xPos + colWidth - 5 - doc.getTextWidth(value), currentY);
          break;
        case 'price':
          value = `$${product.unitPrice.toLocaleString('es-CL')}`;
          doc.text(value, xPos + colWidth - 5 - doc.getTextWidth(value), currentY);
          break;
        case 'total':
          value = `$${(product.quantity * product.unitPrice).toLocaleString('es-CL')}`;
          doc.text(value, xPos + colWidth - 5 - doc.getTextWidth(value), currentY);
          break;
      }
      xPos += colWidth;
    });

    currentY += rowHeight;
  });
  currentY = Math.min(currentY, doc.internal.pageSize.height - 100); // Asegura espacio para firma
  return currentY;
};

const addTotal = (doc: jsPDF, total: number, yPosition: number) => {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  const totalText = `Total con IVA: $${total.toLocaleString('es-CL')}`;

  const padding = 8;
  const totalWidth = doc.getTextWidth(totalText) + (padding * 2);
  const totalBoxX = doc.internal.pageSize.width - 20 - totalWidth;

  doc.setFillColor(248, 249, 250);
  doc.setDrawColor(222, 226, 230);
  doc.roundedRect(totalBoxX, yPosition - 6, totalWidth, 12, 2, 2, 'FD');

  doc.setTextColor(33, 37, 41);
  doc.text(totalText, doc.internal.pageSize.width - 20, yPosition, { align: 'right' });
};

const addSignature = (doc: jsPDF, firmaBase64: string) => {
  doc.addImage(
    firmaBase64,
    'PNG',
    (doc.internal.pageSize.width - SIGNATURE_DIMENSIONS.width)/2,
    doc.internal.pageSize.height - SIGNATURE_DIMENSIONS.height - SIGNATURE_DIMENSIONS.bottomMargin,
    SIGNATURE_DIMENSIONS.width,
    SIGNATURE_DIMENSIONS.height
  );
};

export const generatePDF = async (data: QuoteData): Promise<Buffer> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  let yPosition = SPACING.LOGO;

  doc.setFont('helvetica');

  const logoBase64 = getBase64Image(LOGO_PATH);
  const firmaBase64 = getBase64Image(FIRMA_PATH);

  doc.addImage(logoBase64, 'PNG',
    (doc.internal.pageSize.width - 926/6)/2,
    yPosition,
    926/6,
    272/6
  );

  yPosition += (272/6) + SPACING.TITLE;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.text('Cotización', doc.internal.pageSize.width/2, yPosition, { align: 'center' });
  doc.setLineWidth(0.5);
  const titleWidth = doc.getTextWidth('Cotización');
  doc.line(
    (doc.internal.pageSize.width - titleWidth)/2,
    yPosition + 2,
    (doc.internal.pageSize.width + titleWidth)/2,
    yPosition + 2
  );
  yPosition += SPACING.TITLE;

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
    const maxWidth = valueWidth - 10;
    const lines = splitText(value, maxWidth, doc);
    lines.forEach((line, index) => {
      doc.text(line, tableStart + labelWidth + 5, yPosition + (index * 5));
    });

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

  yPosition += 60;

  yPosition += SPACING.TABLE;

  yPosition = addProductsTable(doc, data.products, yPosition);

  yPosition += SPACING.SECTION;
  addTotal(doc, data.totalWithTax, yPosition);

  if (data.availability) {
    yPosition += SPACING.SECTION;
    doc.setFontSize(12);
    doc.text(`Disponibilidad: ${data.availability}`, 20, yPosition);
  }

  addSignature(doc, firmaBase64);

  doc.setFontSize(10);
  doc.text(
    `${doc.getCurrentPageInfo().pageNumber} / ${doc.getNumberOfPages()}`,
    doc.internal.pageSize.width - 20,
    doc.internal.pageSize.height - 10,
    { align: 'right' }
  );

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
}
