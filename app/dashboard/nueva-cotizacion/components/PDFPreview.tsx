'use client';

import { generatePDF } from '@/utils/pdfGenerator';
import type { QuoteFormData } from '@/lib/validations/quote';

interface PDFPreviewProps {
	quote: QuoteFormData;
}

export default function PDFPreview({ quote }: PDFPreviewProps) {
	const handleDownload = async () => {
		try {
			const response = await fetch('/api/pdf', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
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
				})
			});

			if (!response.ok) throw new Error('Failed to generate PDF');

			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `N001_${quote.client.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		} catch (error) {
			console.error('Error generating PDF:', error);
		}
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
