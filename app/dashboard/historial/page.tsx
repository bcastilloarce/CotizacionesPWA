'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Quote } from '@prisma/client';

export default function HistorialPage() {
	const [quotes, setQuotes] = useState<Quote[]>([]);
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
		<div className="space-y-6">
			<h1 className="text-2xl font-bold">Historial de Cotizaciones</h1>

			<div className="bg-white shadow overflow-hidden sm:rounded-md">
				<ul className="divide-y divide-gray-200">
					{quotes.map((quote) => (
						<li key={quote.id}>
							<Link
								href={`/dashboard/cotizaciones/${quote.id}`}
								className="block hover:bg-gray-50"
							>
								<div className="px-4 py-4 sm:px-6">
									<div className="flex items-center justify-between">
										<div className="flex flex-col">
											<p className="text-sm font-medium text-blue-600 truncate">
												{quote.client}
											</p>
											<p className="mt-1 text-sm text-gray-500">
												{quote.brand} {quote.model}
											</p>
										</div>
										<div className="flex flex-col items-end">
											<p className="text-sm text-gray-900">
												${quote.totalWithTax.toLocaleString('es-CL')}
											</p>
											<p className="mt-1 text-sm text-gray-500">
												{new Date(quote.createdAt).toLocaleDateString('es-CL')}
											</p>
										</div>
									</div>
								</div>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}