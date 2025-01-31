'use client';

import { useEffect, useState } from 'react';
import type { Quote } from '@prisma/client';

interface PDFPreviewProps {
	quote: Quote;
}

export default function PDFPreview({ quote }: PDFPreviewProps) {
	const [pdfUrl, setPdfUrl] = useState<string | null>(null);

	useEffect(() => {
		const generatePDF = async () => {
			try {
				const response = await fetch('/api/pdf', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(quote),
				});

				if (!response.ok) {
					throw new Error('Failed to generate PDF');
				}

				const blob = await response.blob();
				const url = URL.createObjectURL(blob);
				setPdfUrl(url);

				return () => {
					URL.revokeObjectURL(url);
				};
			} catch (error) {
				console.error('Error generating PDF:', error);
			}
		};

		if (quote) {
			generatePDF();
		}
	}, [quote]);

	if (!pdfUrl) {
		return <div>Cargando vista previa...</div>;
	}

	return (
		<div className="w-full h-[600px]">
			<iframe
				src={pdfUrl}
				className="w-full h-full border rounded"
				title="Vista previa de cotización"
			/>
		</div>
	);
}