import { Constants } from '../utils/constants';
import { Quote, QuoteProduct } from '../utils/types';
import { VehicleUtils } from '../data/vehicleData';

export class PDFService {
    private static formatCurrency(amount: number): string {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    private static async loadImage(src: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    static async generatePDF(quote: Quote): Promise<Blob> {
        const { jsPDF } = await import('jspdf');
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'pt',
            format: [Constants.PDF.pageWidth, Constants.PDF.pageHeight]
        });

        // Load images
        const [logo, firma] = await Promise.all([
            this.loadImage(Constants.Paths.Assets.logo),
            this.loadImage(Constants.Paths.Assets.firma)
        ]);

        // Add logo
        const logoAspectRatio = logo.width / logo.height;
        const logoWidth = Constants.PDF.Layout.logoSize.width;
        const logoHeight = logoWidth / logoAspectRatio;
        doc.addImage(
            logo,
            'PNG',
            Constants.PDF.Margins.left,
            Constants.PDF.Margins.top,
            logoWidth,
            logoHeight
        );

        // Add title
        doc.setFont(Constants.PDF.Fonts.title);
        doc.setFontSize(Constants.PDF.Fonts.titleSize);
        doc.text(
            'COTIZACIÓN',
            Constants.PDF.pageWidth / 2,
            Constants.PDF.Margins.top + logoHeight + Constants.PDF.Styles.titleBottomSpacing,
            { align: 'center' }
        );

        // Add client info
        let y = Constants.PDF.Margins.top + logoHeight + Constants.PDF.Styles.titleBottomSpacing + 50;
        doc.setFont(Constants.PDF.Fonts.normal);
        doc.setFontSize(Constants.PDF.Fonts.normalSize);

        const clientInfo = [
            ['Cliente:', quote.clientName],
            ['Fecha:', new Date(quote.createdAt).toLocaleDateString('es-CL')],
            ['Marca:', VehicleUtils.getBrandById(quote.brand)?.name || quote.brand],
            ['Modelo:', VehicleUtils.getModelById(quote.brand, quote.model)?.name || quote.model],
            ['Duración:', quote.duration]
        ];

        if (quote.year) {
            clientInfo.push(['Año:', quote.year]);
        }
        if (quote.licensePlate) {
            clientInfo.push(['Patente:', quote.licensePlate]);
        }
        if (quote.availability) {
            clientInfo.push(['Disponibilidad:', quote.availability]);
        }

        // Add products table
        y += 150;
        const tableHeaders = Constants.PDF.TableHeaders.products;
        const tableData = quote.products.map(product => [
            product.name,
            product.quantity.toString(),
            this.formatCurrency(product.price),
            this.formatCurrency(product.total)
        ]);

        // Add total
        const total = quote.products.reduce((sum, product) => sum + product.total, 0);
        tableData.push(['', '', 'Total:', this.formatCurrency(total)]);

        // Add signature
        y = Constants.PDF.pageHeight - Constants.PDF.Margins.bottom - Constants.PDF.Layout.firmaSize.height;
        doc.addImage(
            firma,
            'PNG',
            Constants.PDF.pageWidth - Constants.PDF.Margins.right - Constants.PDF.Layout.firmaSize.width,
            y,
            Constants.PDF.Layout.firmaSize.width,
            Constants.PDF.Layout.firmaSize.height
        );

        return doc.output('blob');
    }
}