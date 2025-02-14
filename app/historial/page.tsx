'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Quote } from '@prisma/client';
import { useRouter } from 'next/navigation';

interface EnhancedQuote extends Quote {
	formattedNumber?: string;
}

export default function HistorialPage() {
	const router = useRouter();
	const [quotes, setQuotes] = useState<EnhancedQuote[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchQuotes = async () => {
			try {
				const response = await fetch('/api/quotes');
				if (!response.ok) {
					throw new Error('Failed to fetch quotes');
				}
				const data = await response.json();
				setQuotes(data);
			} catch (error) {
				console.error('Error fetching quotes:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchQuotes();
	}, []);

	if (isLoading) {
		return <div>Cargando...</div>;
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-bold">Historial de Cotizaciones</h1>
					<button
						onClick={() => router.push('/')}
						className="px-4 py-2 text-sm font-medium text-[#007AFF] hover:text-[#0051A8]"
					>
						Volver al Dashboard
					</button>
				</div>

				<div className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
					{quotes.map((quote) => (
						<Link
							key={quote.id}
							href={`/historial/${quote.id}`}
							className="ios-list-item group"
						>
							<div className="flex-1">
								<div className="flex items-center gap-2">
									<span className="text-[#007AFF] dark:text-[#0A84FF] text-sm">
										{quote.formattedNumber}
									</span>
									<span className="text-gray-900 dark:text-white">
										{quote.client}
									</span>
								</div>
								<p className="text-sm text-gray-500">
									{quote.brand} {quote.model}
								</p>
							</div>
							<div className="text-right">
								<p className="text-[#007AFF] dark:text-[#0A84FF]">
									${quote.totalWithTax.toLocaleString('es-CL')}
								</p>
								<p className="text-xs text-gray-500">
									{new Date(quote.createdAt).toLocaleDateString('es-CL')}
								</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}