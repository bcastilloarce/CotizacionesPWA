'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import type { QuoteFormData } from '@/lib/validations/quote';
import { Switch } from '@headlessui/react';
import { motion } from 'framer-motion';

interface CarBrand {
  marca: string;
  modelo: string[];
}

export default function VehiculoForm() {
  const { register, control, watch, setValue, formState: { errors } } = useFormContext<QuoteFormData>();
  const [brands, setBrands] = useState<CarBrand[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const selectedBrand = watch('brand');
  const [years] = useState(() => {
    const currentYear = new Date().getFullYear() + 1; // Next year
    return Array.from({ length: 31 }, (_, i) => currentYear - i);
  });

  useEffect(() => {
    fetch('/assets/json/marcasymodelos.json')
      .then(res => res.json())
      .then(data => setBrands(data.marcasymodelos))
      .catch(err => console.error('Error loading brands:', err));
  }, []);

  useEffect(() => {
    const brandData = brands.find(b => b.marca === selectedBrand);
    setModels(brandData?.modelo || []);
    setValue('model', '');
  }, [selectedBrand, brands, setValue]);

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
      <div className="px-4 py-3 bg-white dark:bg-[#2C2C2E] space-y-6">
        {/* Brand Select */}
        <motion.div whileTap={{ scale: 0.98 }}>
          <label className="block text-[17px] font-regular text-[#000000] dark:text-white mb-2">
            Marca *
          </label>
          <select
            {...register('brand', {
              required: 'Marca es requerida',
              onChange: () => triggerHaptic()
            })}
            className="w-full h-[44px] px-4 text-[17px] bg-[#FFFFFF] dark:bg-[#3A3A3C]
                     border border-[#C5C5C7] dark:border-[#3A3A3C]
                     rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007AFF]
                     text-[#000000] dark:text-white appearance-none"
          >
            <option value="">Seleccione una marca</option>
            {brands.map(brand => (
              <option key={brand.marca} value={brand.marca}>
                {brand.marca}
              </option>
            ))}
          </select>
          {errors.brand && (
            <p className="text-[15px] text-[#FF3B30] dark:text-[#FF453A] mt-1">
              {errors.brand.message}
            </p>
          )}
        </motion.div>

        {/* Model Select */}
        <motion.div whileTap={{ scale: 0.98 }}>
          <label className="block text-[17px] font-regular text-[#000000] dark:text-white mb-2">
            Modelo *
          </label>
          <select
            {...register('model', {
              required: 'Modelo es requerido',
              onChange: () => triggerHaptic()
            })}
            className="w-full h-[44px] px-4 text-[17px] bg-[#FFFFFF] dark:bg-[#3A3A3C]
                     border border-[#C5C5C7] dark:border-[#3A3A3C]
                     rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007AFF]
                     text-[#000000] dark:text-white appearance-none"
            disabled={!selectedBrand}
          >
            <option value="">Seleccione un modelo</option>
            {models.map(model => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
          {errors.model && (
            <p className="text-[15px] text-[#FF3B30] dark:text-[#FF453A] mt-1">
              {errors.model.message}
            </p>
          )}
        </motion.div>

        {/* Year Select */}
        <motion.div whileTap={{ scale: 0.98 }}>
          <label className="block text-[17px] font-regular text-[#000000] dark:text-white mb-2">
            Año
          </label>
          <select
            {...register('year', {
              onChange: () => triggerHaptic()
            })}
            className="w-full h-[44px] px-4 text-[17px] bg-[#FFFFFF] dark:bg-[#3A3A3C]
                     border border-[#C5C5C7] dark:border-[#3A3A3C]
                     rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007AFF]
                     text-[#000000] dark:text-white appearance-none"
          >
            <option value="">Seleccione un año</option>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </motion.div>

        {/* License Plate Input */}
        <motion.div whileTap={{ scale: 0.98 }}>
          <label className="block text-[17px] font-regular text-[#000000] dark:text-white mb-2">
            Patente
          </label>
          <input
            {...register('licensePlate', {
              setValueAs: (value: string) => value.toUpperCase(),
              pattern: {
                value: /^[A-Z0-9]*$/,
                message: 'Solo letras y números permitidos'
              }
            })}
            className="w-full h-[44px] px-4 text-[17px] bg-[#FFFFFF] dark:bg-[#3A3A3C]
                     border border-[#C5C5C7] dark:border-[#3A3A3C]
                     rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007AFF]
                     text-[#000000] dark:text-white uppercase"
            placeholder="Patente del vehículo"
            maxLength={6}
            onInput={(e) => {
              const input = e.currentTarget;
              input.value = input.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
            }}
          />
        </motion.div>

        {/* Duration Select */}
        <motion.div whileTap={{ scale: 0.98 }}>
          <label className="block text-[17px] font-regular text-[#000000] dark:text-white mb-2">
            Duración *
          </label>
          <select
            {...register('duration', {
              required: 'Duración es requerida',
              onChange: () => triggerHaptic()
            })}
            className="w-full h-[44px] px-4 text-[17px] bg-[#FFFFFF] dark:bg-[#3A3A3C]
                     border border-[#C5C5C7] dark:border-[#3A3A3C]
                     rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007AFF]
                     text-[#000000] dark:text-white appearance-none"
            defaultValue="1 día"
          >
            {Array.from({ length: 30 }, (_, i) => i + 1).map(num => (
              <option key={num} value={`${num} día${num > 1 ? 's' : ''}`}>
                {num} día{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Stock Toggle */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-between py-2"
        >
          <label className="text-[17px] font-regular text-[#000000] dark:text-white">
            Hasta agotar stock
          </label>
          <Controller
            name="untilStockLasts"
            control={control}
            defaultValue={false}
            render={({ field: { value, onChange } }) => (
              <Switch
                checked={value}
                onChange={(checked) => {
                  onChange(checked);
                  triggerHaptic();
                }}
                className={`${value ? 'bg-[#34C759]' : 'bg-[#E5E5EA] dark:bg-[#636366]'}
                           relative inline-flex h-[31px] w-[51px] shrink-0 cursor-pointer
                           rounded-full border-2 border-transparent transition-colors
                           duration-200 ease-in-out focus:outline-none focus-visible:ring-2
                           focus-visible:ring-white focus-visible:ring-opacity-75`}
              >
                <span
                  className={`${value ? 'translate-x-5' : 'translate-x-0'}
                             pointer-events-none inline-block h-[27px] w-[27px]
                             transform rounded-full bg-white shadow-lg ring-0
                             transition duration-200 ease-in-out`}
                />
              </Switch>
            )}
          />
        </motion.div>

        {/* Availability Input */}
        <motion.div whileTap={{ scale: 0.98 }}>
          <label className="block text-[17px] font-regular text-[#000000] dark:text-white mb-2">
            Disponibilidad
          </label>
          <input
            {...register('availability')}
            className="w-full h-[44px] px-4 text-[17px] bg-[#FFFFFF] dark:bg-[#3A3A3C]
                     border border-[#C5C5C7] dark:border-[#3A3A3C]
                     rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007AFF]
                     text-[#000000] dark:text-white"
            placeholder="Ej: Entrega inmediata"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}