'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { quoteSchema, type QuoteFormData } from '@/lib/validations/quote';
import ClienteForm from '../components/ClienteForm';
import VehiculoForm from '../components/VehiculoForm';
import ProductosForm from '../components/ProductosForm';
import PDFPreview from '../components/PDFPreview';

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
        {/* Following the exact sequence from PDFCotizaciones.md */}
        <div className="space-y-8">
        {/* Logo is handled in PDF generation */}

        {/* Client information section */}
        <div className="space-y-6">
          <ClienteForm />
        </div>

        {/* Vehicle information section */}
        <div className="space-y-6">
          <VehiculoForm />
        </div>

        {/* Products section with specified spacing */}
        <div className="space-y-6">
          <ProductosForm />
        </div>

        {/* Signature section with fixed dimensions */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium mb-4">Firma</h3>
          <div className="h-[110px] w-[110px] mx-auto border-2 border-dashed border-gray-300 rounded-lg">
          {/* Signature component will go here */}
          </div>
        </div>

        {/* PDF Generation button */}
        <div className="flex justify-center pt-8">
          <button
          type="button"
          onClick={handlePreview}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
          Generar PDF
          </button>
        </div>
        </div>
      </form>
      </FormProvider>

      {/* PDF Preview Modal */}
      {previewQuote && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg w-full max-w-4xl">
        <PDFPreview quote={previewQuote} />
        </div>
      </div>
      )}
    </div>
  );
}

