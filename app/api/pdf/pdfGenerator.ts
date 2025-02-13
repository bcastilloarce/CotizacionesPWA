import { jsPDF } from 'jspdf';
import { getNextQuoteNumber } from '@/app/api/pdf/quoteNumbering';
import fs from 'fs';
import path from 'path';

// Update spacing constants to match specifications
const SPACING = {
  LOGO_TO_TITLE: 40,
  TITLE_TO_CLIENT: 30,
  CLIENT_TO_PRODUCTS: 60,
  PRODUCT_ROWS: 40,
  PRODUCTS_TO_TOTAL: 40,
  BOTTOM_MARGIN: 20
} as const;

// Update signature dimensions
const SIGNATURE_DIMENSIONS = {
  width: 50,        // 50% of original size
  height: 50,       // 50% of original size
  bottomMargin: 20
} as const;

// Update table column configuration
const TABLE_COLUMNS = {
  product: { header: 'Producto', width: 0.45 },    // Increased width
  quantity: { header: 'Cantidad', width: 0.15 },   // Adjusted width
  price: { header: 'Precio', width: 0.20 },        // Consistent width
  total: { header: 'Total', width: 0.20 }         // Consistent width
} as const;

// Table styles
type RGB = [number, number, number];

const TABLE_STYLES = {
  header: {
    fillColor: [245, 245, 245] as RGB,
    textColor: [50, 50, 50] as RGB,
    fontSize: 11,
    lineHeight: 7
  },
  cell: {
    fillColor: [255, 255, 255] as RGB,
    textColor: [50, 50, 50] as RGB,
    fontSize: 10,
    lineHeight: 6
  }
} as const;

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

  const addTableHeaders = (y: number) => {
    doc.setFontSize(TABLE_STYLES.header.fontSize);
    doc.setFont('helvetica', 'bold');
    doc.setFillColor(...TABLE_STYLES.header.fillColor);
    doc.setTextColor(...TABLE_STYLES.header.textColor);

    let xPos = tableStart;

    Object.entries(TABLE_COLUMNS).forEach(([key, col]) => {
      const colWidth = tableWidth * col.width;
      // Add subtle column separator
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.1);
      doc.line(xPos, y - 5, xPos, y + 5);

      doc.rect(xPos, y - 5, colWidth, 10, 'FD');
      const textX = key === 'product' ?
        xPos + 5 :
        xPos + colWidth - 5;
      doc.text(
        col.header,
        textX,
        y,
        { align: key === 'product' ? 'left' : 'right' }
      );
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

    doc.setFontSize(TABLE_STYLES.cell.fontSize);
    doc.setFont('helvetica', 'normal');

    Object.entries(TABLE_COLUMNS).forEach(([key, col]) => {
      const colWidth = tableWidth * col.width;
      doc.setFillColor(TABLE_STYLES.cell.fillColor[0], TABLE_STYLES.cell.fillColor[1], TABLE_STYLES.cell.fillColor[2]);
      doc.rect(xPos, currentY - 5, colWidth, rowHeight, 'FD');

      let value = '';
      const formatCurrency = (amount: number) =>
        `$${amount.toLocaleString('es-CL', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        })}`;

      switch(key) {
        case 'product':
          value = product.name;
          doc.text(value, xPos + 5, currentY);
          break;
        case 'quantity':
          value = product.quantity.toString();
          const textX = xPos + (colWidth / 2); // Center align
          doc.text(value, textX - doc.getTextWidth(value) / 2, currentY);
          break;
        case 'price':
          value = formatCurrency(product.unitPrice);
          doc.text(value, xPos + colWidth - 5 - doc.getTextWidth(value), currentY);
          break;
        case 'total':
          value = formatCurrency(product.quantity * product.unitPrice);
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
  doc.setFontSize(12);
  const totalText = `Total con IVA: ${total.toLocaleString('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`;

  doc.text(totalText, doc.internal.pageSize.width - 20, yPosition, { align: 'right' });
};

const addSignature = (doc: jsPDF, firmaBase64: string) => {
  const pageHeight = doc.internal.pageSize.height;
  const signatureY = pageHeight - SIGNATURE_DIMENSIONS.height - SIGNATURE_DIMENSIONS.bottomMargin;

  doc.addImage(
    firmaBase64,
    'PNG',
    (doc.internal.pageSize.width - SIGNATURE_DIMENSIONS.width)/2,
    signatureY,
    SIGNATURE_DIMENSIONS.width,
    SIGNATURE_DIMENSIONS.height
  );
};

// Add font size constants
const FONT_SIZES = {
  TITLE: 24,
  LABELS: 12,
  VALUES: 12,
  TABLE_HEADER: 12,
  TABLE_CONTENT: 12
} as const;

export const generatePDF = async (data: QuoteData): Promise<Buffer> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  let yPosition = SPACING.LOGO_TO_TITLE;

  doc.setFont('helvetica');

  const logoBase64 = getBase64Image(LOGO_PATH);
  const firmaBase64 = getBase64Image(FIRMA_PATH);

  doc.addImage(logoBase64, 'PNG',
    (doc.internal.pageSize.width - 926/6)/2,
    yPosition,
    926/6,
    272/6
  );

  yPosition += (272/6) + SPACING.LOGO_TO_TITLE;

  doc.setFontSize(FONT_SIZES.TITLE);
  doc.text('Cotización', doc.internal.pageSize.width/2, yPosition, { align: 'center' });
  doc.setLineWidth(0.5);
  const titleWidth = doc.getTextWidth('Cotización');
  doc.line(
    (doc.internal.pageSize.width - titleWidth)/2,
    yPosition + 2,
    (doc.internal.pageSize.width + titleWidth)/2,
    yPosition + 2
  );
  yPosition += SPACING.TITLE_TO_CLIENT;

  doc.setFontSize(11);
  const fieldWidth = doc.internal.pageSize.width - 40;
  const startX = 20;

  const addField = (label: string, value: string) => {
    doc.setFontSize(FONT_SIZES.LABELS);
    doc.setFont('helvetica', 'bold');
    doc.text(`${label}:`, startX, yPosition);
    doc.setFontSize(FONT_SIZES.VALUES);
    doc.setFont('helvetica', 'normal');
    doc.text(value, startX + doc.getTextWidth(`${label}: `), yPosition);
    yPosition += 20; // Fixed SPACING.FIELD error by using hardcoded value
  };

  // Format date properly
  const formattedDate = new Date(data.date).toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  addField('Cliente', data.client);
  addField('Fecha', formattedDate);
  addField('Marca', data.brand);
  addField('Modelo', data.model);
  if (data.year) addField('Año', data.year);
  if (data.licensePlate) addField('Patente', data.licensePlate);

  // Update duration field formatting
  const formatDuration = (duration: string, untilStockLasts: boolean): string => {
    return untilStockLasts ?
      `${duration} o hasta agotar stock` :
      duration;
  };

  addField('Duración', formatDuration(data.duration, data.untilStockLasts));
  yPosition += SPACING.CLIENT_TO_PRODUCTS;
  const newYPosition = addProductsTable(doc, data.products, yPosition);
  yPosition = newYPosition + SPACING.PRODUCT_ROWS;
  addTotal(doc, data.totalWithTax, yPosition);

  if (data.availability) {
    yPosition += SPACING.PRODUCTS_TO_TOTAL;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Disponibilidad:', 20, yPosition);
    doc.setFont('helvetica', 'normal');
    doc.text(data.availability, 20 + doc.getTextWidth('Disponibilidad: '), yPosition);
  }

  // Add signature at the bottom with proper spacing
  yPosition = doc.internal.pageSize.height - SIGNATURE_DIMENSIONS.height - SIGNATURE_DIMENSIONS.bottomMargin;
  addSignature(doc, firmaBase64);

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

	const nextNum = await getNextQuoteNumber();
	return `N${nextNum.toString().padStart(3, '0')}_${sanitizedName}.pdf`;
}
