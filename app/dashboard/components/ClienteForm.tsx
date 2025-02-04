'use client';

import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import type { QuoteFormData } from '@/lib/validations/quote';

export default function ClienteForm() {
  const { register, formState: { errors } } = useFormContext<QuoteFormData>();

  // Haptic feedback function
  const triggerHaptic = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#F2F2F7] dark:bg-[#1C1C1E] rounded-lg overflow-hidden"
    >
      <div className="px-4 py-3 bg-white dark:bg-[#2C2C2E]">
        <motion.div
          className="space-y-2"
          whileTap={{ scale: 0.98 }}
        >
          <label className="block text-[17px] font-regular text-[#000000] dark:text-white">
            Cliente *
          </label>
          <input
            {...register('client', {
              required: 'Cliente es requerido',
              minLength: { value: 2, message: 'Mínimo 2 caracteres' },
              onChange: () => triggerHaptic()
            })}
            className="w-full h-[44px] px-4 text-[17px] bg-[#FFFFFF] dark:bg-[#3A3A3C]
                     border border-[#C5C5C7] dark:border-[#3A3A3C]
                     rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007AFF]
                     placeholder-[#8E8E93] text-[#000000] dark:text-white
                     transition-colors"
            placeholder="Nombre del cliente"
          />
          {errors.client && (
            <p className="text-[15px] text-[#FF3B30] dark:text-[#FF453A]">
              {errors.client.message}
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
