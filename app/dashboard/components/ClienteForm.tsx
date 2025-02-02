'use client';

import { useFormContext } from 'react-hook-form';
import type { QuoteFormData } from '@/lib/validations/quote';

export default function ClienteForm() {
	const { register, formState: { errors } } = useFormContext<QuoteFormData>();

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
			<div className="space-y-2">
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
					Cliente *
				</label>
				<input
					{...register('client', {
						required: 'Cliente es requerido',
						minLength: { value: 2, message: 'Mínimo 2 caracteres' }
					})}
					className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 transition-colors"
					placeholder="Nombre del cliente"
				/>
				{errors.client && (
					<p className="text-red-500 text-sm">{errors.client.message}</p>
				)}
			</div>

			<div className="space-y-2">
				<label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
					Disponibilidad
				</label>
				<input
					{...register('availability')}
					className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 transition-colors"
					placeholder="Ej: Entrega inmediata"
				/>
			</div>
		</div>
	);
}