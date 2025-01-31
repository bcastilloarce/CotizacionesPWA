'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { quoteSchema, type QuoteFormData } from '@/lib/validations/quote';
import ClienteForm from './components/ClienteForm';
import VehiculoForm from './components/VehiculoForm';
import ProductosForm from './components/ProductosForm';
import PDFPreview from './components/PDFPreview';

export default function NewQuotePage() {
  const router = useRouter();
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Nueva Cotización</h1>

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
          <PDFPreview quote={previewQuote as any} />
        </div>
      )}
    </div>
  );
}

