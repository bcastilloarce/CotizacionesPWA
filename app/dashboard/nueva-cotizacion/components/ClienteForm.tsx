'use client';

import { useFormContext } from 'react-hook-form';
import type { QuoteFormData } from '@/lib/validations/quote';

export default function ClienteForm() {
	const { register, formState: { errors } } = useFormContext<QuoteFormData>();

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div>
				<label className="block mb-2">Cliente *</label>
				<input
					{...register('client')}
					className="w-full p-2 border rounded"
					placeholder="Nombre del cliente"
				/>
				{errors.client && (
					<p className="text-red-500 text-sm mt-1">{errors.client.message}</p>
				)}
			</div>
		</div>
	);
}