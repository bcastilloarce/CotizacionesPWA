'use client';

import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import type { QuoteFormData } from '@/app/api/validations/quote';
import { Switch } from '@headlessui/react';

export default function ClienteForm() {
  const { register, formState: { errors }, watch, setValue } = useFormContext<QuoteFormData>();
  const date = watch('date');
  const stockSwitch = watch('untilStockLasts', true); // Default enabled

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
        <div className="space-y-4">
            {/* Date */}
            <div>
            <label className="block text-[17px] font-regular text-[#000000] dark:text-white">
              Fecha *
            </label>
            <input
              type="date"
              {...register('date', { required: 'Fecha es requerida' })}
              className="w-full h-[44px] px-4 text-[17px] bg-[#FFFFFF] dark:bg-[#3A3A3C]
                   border border-[#C5C5C7] dark:border-[#3A3A3C] rounded-lg whitespace-nowrap"
              style={{ lineHeight: '44px' }}
            />

            {errors.date && (
              <p className="text-[15px] text-[#FF3B30]">{errors.date.message}</p>
            )}
          </div>

          {/* Client Name */}
          <div>
            <label className="block text-[17px] font-regular text-[#000000] dark:text-white">
              Cliente *
            </label>
            <input
              {...register('client', {
                required: 'Cliente es requerido',
                minLength: { value: 2, message: 'Mínimo 2 caracteres' },
                onChange: () => triggerHaptic()
              })}
              className="ios-input"
              placeholder="Nombre del cliente"
            />
            {errors.client && (
              <p className="text-[15px] text-[#FF3B30] dark:text-[#FF453A]">
                {errors.client.message}
              </p>
            )}
            </div>


          </div>
          </div>
        </motion.div>
        );
      }
