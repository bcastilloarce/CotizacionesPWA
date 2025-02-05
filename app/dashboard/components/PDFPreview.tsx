'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { QuoteFormData } from '@/app/api/validations/quote';

interface PDFPreviewProps {
    quote: QuoteFormData;
    onClose: () => void;
    pdfBlob: Blob | null;
}

export default function PDFPreview({ quote, onClose, pdfBlob }: PDFPreviewProps) {
	const [pdfUrl, setPdfUrl] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (pdfBlob) {
			const url = URL.createObjectURL(pdfBlob);
			setPdfUrl(url);
			return () => {
				if (url) URL.revokeObjectURL(url);
			};
		} else {
			generatePreview();
		}
	}, [pdfBlob]);

	const generatePreview = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch('/api/pdf/generate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(quote),
			});

			if (!response.ok) throw new Error('Failed to generate PDF');

			const blob = await response.blob();
			const url = URL.createObjectURL(blob);
			setPdfUrl(url);
		} catch (err) {
			setError(err instanceof Error ? err.message : 'An error occurred');
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
		<div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full">
			<div className="p-6">
				<h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
					Vista Previa de Cotización
				</h2>

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
						<div className="flex justify-center gap-4 mt-4">
							<button
								onClick={handleDownload}
								className="bg-[#34C759] text-white px-6 py-2 rounded-lg hover:bg-[#248A3D] transition-colors flex items-center gap-2"
							>
								<span>💾</span> Guardar PDF
							</button>
							<button
								onClick={handleShare}
								className="bg-[#007AFF] text-white px-6 py-2 rounded-lg hover:bg-[#0051A8] transition-colors flex items-center gap-2"
							>
								<span>📤</span> Compartir PDF
							</button>
						</div>
					</>
				) : null}
			</div>
		</div>
	);
}
