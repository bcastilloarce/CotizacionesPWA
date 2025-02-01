'use client';

import { generatePDF } from '@/utils/pdfGenerator';
import type { QuoteFormData } from '@/lib/validations/quote';

interface PDFPreviewProps {
	quote: QuoteFormData;
}

export default function PDFPreview({ quote }: PDFPreviewProps) {
	const handleDownload = () => {
		generatePDF({
			...quote,
			date: new Date().toISOString(),
			client: quote.client,
			year: quote.year?.toString(),
			products: quote.products.map(p => ({
				name: p.name,
				quantity: p.quantity,
				unitPrice: p.unitPrice
			})),
			totalWithTax: quote.totalWithTax
		});
	};

	return (
		<div className="flex justify-center">
			<button
				onClick={handleDownload}
				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
			>
				Descargar PDF
			</button>
		</div>
	);
}
