'use client';

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { quoteSchema, type QuoteFormData } from '@/app/api/validations/quote';
import ClienteForm from '../components/ClienteForm';
import VehiculoForm from '../components/VehiculoForm';
import ProductosForm from '../components/ProductosForm';
import PDFPreview from '../components/PDFPreview';
import Image from 'next/image';

export default function NewQuotePage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [quoteData, setQuoteData] = useState<QuoteFormData | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);

  const methods = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      untilStockLasts: false,
      products: [],
      totalWithTax: 0,
      logo: '/assets/images/logo.png',
      signature: '/assets/images/firma.png',
      quoteNumber: '',
      date: new Date().toISOString().split('T')[0],
    },
  });

  useEffect(() => {
    const generateQuoteNumber = async () => {
      const response = await fetch('/api/quotes/next-number');
      const { number } = await response.json();
      methods.setValue('quoteNumber', number);
    };
    generateQuoteNumber();
  }, [methods]);

  const onSubmit = async (data: QuoteFormData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Error al crear la cotización');

      const quote = await response.json();
      router.push(`/historial`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGeneratePDF = async () => {
    const data = methods.getValues();
    setQuoteData(data);

    try {
      const response = await fetch('/api/pdf/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Error generando PDF');

      const blob = await response.blob();
      setPdfBlob(blob);
      setShowPDF(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-4 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
      <button
        onClick={() => router.push('/')}
        className="px-4 py-2 text-sm font-medium text-[#007AFF] hover:text-[#0051A8]"
      >
        Volver
      </button>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          {/* Logo Preview */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-full flex justify-center mb-10">
              <Image
                src="/assets/images/logo.png"
                alt="Company Logo"
                width={926}
                height={272}
                priority
                className="w-full h-auto"
              />
            </div>
          </motion.section>

          {/* Client Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-[20px] font-semibold text-[#000000] dark:text-white mb-4">
              Información del Cliente
            </h2>
            <ClienteForm />
          </motion.section>

          {/* Vehicle Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-[20px] font-semibold text-[#000000] dark:text-white mb-4">
              Información del Vehículo
            </h2>
            <VehiculoForm />
          </motion.section>

          {/* Products Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ProductosForm />
          </motion.section>

          {/* Action Buttons */}
          {!showPDF && (
            <motion.div
              className="sticky bottom-0 pt-4 pb-2 bg-gray-50 dark:bg-gray-900"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                type="button"
                onClick={handleGeneratePDF}
                disabled={isSubmitting}
                className="ios-button ios-button-primary fixed bottom-[calc(49px+env(safe-area-inset-bottom))] left-4 right-4 z-40"
              >
                {isSubmitting ? 'Generando...' : 'Generar PDF'}
              </button>
            </motion.div>
          )}
        </form>
      </FormProvider>

      {/* Reemplazar el modal por una sección integrada */}
      {showPDF && quoteData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <PDFPreview
            quote={quoteData}
            pdfBlob={pdfBlob}
          />
        </motion.div>
      )}
    </div>
  );
}
