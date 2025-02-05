'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { generatePDF } from '@/app/api/pdf/pdfGenerator';
import type { QuoteFormData } from '@/app/api/validations/quote';

interface PDFPreviewProps {
	quote: QuoteFormData;
	onClose: () => void;
}

export default function PDFPreview({ quote, onClose }: PDFPreviewProps) {
	const [pdfUrl, setPdfUrl] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		generatePreview();
		return () => {
			// Cleanup URL when component unmounts
			if (pdfUrl) {
				window.URL.revokeObjectURL(pdfUrl);
			}
		};
	}, []);

	const generatePreview = async () => {
		setIsLoading(true);
		setError(null);
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
			setError('Error al generar el PDF. Por favor, intente nuevamente.');
		} finally {
			setIsLoading(false);
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
		<div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full mx-4">
			{/* Close button */}
			<button
				onClick={onClose}
				className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
			>
				<XMarkIcon className="h-6 w-6" />
			</button>

			<div className="p-6">
				<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Vista Previa de Cotización</h2>
				
				{isLoading ? (
					<div className="flex flex-col items-center justify-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
						<p className="mt-4 text-gray-600 dark:text-gray-300">Generando PDF...</p>
					</div>
				) : error ? (
					<div className="flex flex-col items-center justify-center py-12">
						<p className="text-red-500 text-center mb-4">{error}</p>
						<button
							onClick={generatePreview}
							className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
						>
							Reintentar
						</button>
					</div>
				) : pdfUrl ? (
					<>
						<div className="w-full h-[600px] border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-700">
							<iframe
								src={`${pdfUrl}#view=FitH`}
								className="w-full h-full"
								title="Vista previa del PDF"
							/>
						</div>
						<div className="flex justify-end gap-4 mt-4">
							<button
								onClick={handleDownload}
								className="bg-[#34C759] text-white px-6 py-2 rounded-lg hover:bg-[#248A3D] transition-colors"
							>
								Guardar PDF
						</button>
							<button
								onClick={handleShare}
								className="bg-[#007AFF] text-white px-6 py-2 rounded-lg hover:bg-[#0051A8] transition-colors"
							>
								Compartir PDF
							</button>
						</div>
					</>
				) : null}
			</div>
		</div>
	);
}
