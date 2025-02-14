'use client';

import { useState, useEffect } from 'react';
import type { QuoteFormData } from '@/app/api/validations/quote';
import toast from 'react-hot-toast';

interface PDFPreviewProps {
    quote: QuoteFormData;
    pdfBlob: Blob | null;
}

export default function PDFPreview({ quote, pdfBlob }: PDFPreviewProps) {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (pdfBlob) {
            const url = URL.createObjectURL(pdfBlob);
            setPdfUrl(url);
            window.open(url, '_blank');
            toast.success('PDF generado correctamente');
            return () => {
                if (url) URL.revokeObjectURL(url);
            };
        } else {
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

                    if (!response.ok) throw new Error('Error al generar PDF');

			const blob = await response.blob();
			const url = URL.createObjectURL(blob);
			setPdfUrl(url);
                    window.open(url, '_blank');
                    toast.success('PDF generado correctamente');
		} catch (err) {
                    const errorMessage = err instanceof Error ? err.message : 'Error al generar PDF';
                    setError(errorMessage);
                    toast.error(errorMessage);
		} finally {
			setIsLoading(false);
		}
			};
			generatePreview();
		}
    }, [pdfBlob, quote]);

	const handleDownload = () => {
		if (!pdfUrl) return;
		const a = document.createElement('a');
		a.href = pdfUrl;
		a.download = `N001_${quote.client.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
        toast.success('PDF descargado correctamente');
	};

	const handleShare = async () => {
		if (!pdfUrl) return;
		try {
			const blob = await fetch(pdfUrl).then(r => r.blob());
            const file = new File(
                [blob],
                `N001_${quote.client.toLowerCase().replace(/[^a-z0-9]/g, '_')}.pdf`,
                { type: 'application/pdf' }
            );

			if (navigator.share) {
				await navigator.share({
					files: [file],
					title: 'Cotización',
					text: 'Compartir cotización'
				});
                toast.success('PDF compartido correctamente');
			} else {
				handleDownload();
			}
		} catch (error) {
            console.error('Error al compartir PDF:', error);
            toast.error('Error al compartir PDF');
        }
    };

    return null;
}
