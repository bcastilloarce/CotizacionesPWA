'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Error al crear la cotización');

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
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
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
          <motion.div
            className="sticky bottom-[calc(49px+env(safe-area-inset-bottom))] pt-4 pb-2 bg-gray-50 dark:bg-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handlePreview}
                disabled={isSubmitting}
                className="flex-1 h-[50px] bg-[#007AFF] text-white rounded-lg font-medium
                         disabled:opacity-50 disabled:cursor-not-allowed
                         active:bg-[#0051A8] transition-colors"
              >
                Vista Previa
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-[50px] bg-[#34C759] text-white rounded-lg font-medium
                         disabled:opacity-50 disabled:cursor-not-allowed
                         active:bg-[#248A3D] transition-colors"
              >
                Generar PDF
              </button>
            </div>
          </motion.div>
        </form>
      </FormProvider>

      {/* PDF Preview Modal */}
      {previewQuote && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <PDFPreview quote={previewQuote} />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

