'use client';

import { useFormContext } from 'react-hook-form';
import type { QuoteFormData } from '@/lib/validations/quote';

export default function ClienteForm() {
	const { register, formState: { errors } } = useFormContext<QuoteFormData>();

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
			</div>
		</div>
	);
}
