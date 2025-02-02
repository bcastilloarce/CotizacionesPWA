'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { quoteSchema, type QuoteFormData } from '@/lib/validations/quote';
import ClienteForm from './components/ClienteForm';
import VehiculoForm from './components/VehiculoForm';
import ProductosForm from './components/ProductosForm';
import PDFPreview from './components/PDFPreview';

export default function Dashboard() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [activeTab, setActiveTab] = useState('new');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [previewQuote, setPreviewQuote] = useState<QuoteFormData | null>(null);

	const methods = useForm<QuoteFormData>({
		resolver: zodResolver(quoteSchema),
		defaultValues: {
			untilStockLasts: false,
			products: [],
			totalWithTax: 0,
		},
	});

	const onSubmit = async (data: QuoteFormData) => {
		try {
			setIsSubmitting(true);
			const response = await fetch('/api/quotes', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error('Error al crear la cotización');
			}

			const quote = await response.json();
			router.push(`/dashboard/cotizaciones/${quote.id}`);
		} catch (error) {
			console.error('Error:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handlePreview = () => {
		const data = methods.getValues();
		setPreviewQuote(data);
	};

	if (status === 'loading') {
		return (
			<div className="min-h-screen flex items-center justify-center bg-[#F2F2F7] dark:bg-[#1C1C1E]">
				<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#007AFF]"></div>
			</div>
		);
	}

	if (status === 'unauthenticated') {
		router.push('/');
		return null;
	}

	return (
		<div className="min-h-screen bg-[#F2F2F7] dark:bg-[#1C1C1E]">
			<header className="bg-white dark:bg-[#2C2C2E] shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex justify-between items-center">
						<h1 className="text-xl font-semibold text-[#1C1C1E] dark:text-white">
							Sistema de Cotizaciones
						</h1>
						<nav className="flex space-x-4">
							<button
								onClick={() => setActiveTab('new')}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
									activeTab === 'new'
										? 'bg-[#007AFF] text-white'
										: 'text-[#8E8E93] hover:text-[#007AFF]'
								}`}
							>
								Nueva Cotización
							</button>
							<button
								onClick={() => setActiveTab('history')}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
									activeTab === 'history'
										? 'bg-[#007AFF] text-white'
										: 'text-[#8E8E93] hover:text-[#007AFF]'
								}`}
							>
								Historial
							</button>
						</nav>
					</div>
				</div>
			</header>

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{activeTab === 'new' ? (
					<div className="bg-white dark:bg-[#2C2C2E] rounded-2xl shadow p-6">
						<h2 className="text-lg font-semibold text-[#1C1C1E] dark:text-white mb-6">
							Nueva Cotización
						</h2>
						<FormProvider {...methods}>
							<form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
								<ClienteForm />
								<VehiculoForm />
								<ProductosForm />

								<div className="flex justify-end space-x-4">
									<button
										type="button"
										onClick={handlePreview}
										className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
									>
										Vista Previa
									</button>
									<button
										type="submit"
										disabled={isSubmitting}
										className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 disabled:opacity-50"
									>
										{isSubmitting ? 'Guardando...' : 'Guardar Cotización'}
									</button>
								</div>
							</form>
						</FormProvider>

						{previewQuote && (
							<div className="mt-8">
								<h2 className="text-xl font-semibold mb-4">Vista Previa</h2>
								<PDFPreview quote={previewQuote} />
							</div>
						)}
					</div>
				) : (
					<div className="bg-white dark:bg-[#2C2C2E] rounded-2xl shadow p-6">
						<h2 className="text-lg font-semibold text-[#1C1C1E] dark:text-white mb-6">
							Historial de Cotizaciones
						</h2>
						<p className="text-[#8E8E93]">Historial de cotizaciones en desarrollo...</p>
					</div>
				)}
			</main>
		</div>
	);
}
