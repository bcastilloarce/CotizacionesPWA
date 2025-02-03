'use client';

import { useState } from 'react';
import { generatePDF } from '@/utils/pdfGenerator';
import type { QuoteFormData } from '@/lib/validations/quote';

interface PDFPreviewProps {
	quote: QuoteFormData;
}

export default function PDFPreview({ quote }: PDFPreviewProps) {
	const [pdfUrl, setPdfUrl] = useState<string | null>(null);

	const generatePreview = async () => {
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
					availability: quote.availability,
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
			setPdfUrl(url);
		} catch (error) {
			console.error('Error generating PDF:', error);
		}
	};

	const handleDownload = () => {
		if (!pdfUrl) return;
		const a = document.createElement('a');
		a.href = pdfUrl;
		a.download = `N001_${quote.client.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	const handleShare = async () => {
		if (!pdfUrl) return;
		try {
			const blob = await fetch(pdfUrl).then(r => r.blob());
			const file = new File([blob], `N001_${quote.client.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`, { type: 'application/pdf' });

			if (navigator.share) {
				await navigator.share({
					files: [file],
					title: 'Cotización',
					text: 'Compartir cotización'
				});
			} else {
				// Fallback for browsers that don't support native sharing
				handleDownload();
			}
		} catch (error) {
			console.error('Error sharing PDF:', error);
		}
	};

	return (
		<div className="flex flex-col items-center gap-4">
			{!pdfUrl ? (
				<button
					onClick={generatePreview}
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
				>
					Generar PDF
				</button>
			) : (
				<>
					<div className="w-full max-w-3xl h-[600px] border rounded">
						<iframe
							src={`${pdfUrl}#view=FitH`}
							className="w-full h-full"
							title="PDF Preview"
						/>
					</div>
					<div className="flex gap-4">
						<button
							onClick={handleDownload}
							className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
						>
							Guardar PDF
						</button>
						<button
							onClick={handleShare}
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
						>
							Compartir
						</button>
					</div>
				</>
			)}
		</div>
	);
}
