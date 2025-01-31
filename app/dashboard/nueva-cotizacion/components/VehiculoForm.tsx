'use client';

import { useFormContext } from 'react-hook-form';
import type { Quote } from '@prisma/client';

export default function VehiculoForm() {
	const { register, formState: { errors } } = useFormContext<Quote>();

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div>
				<label className="block mb-2">Marca *</label>
				<input
					{...register('brand')}
					className="w-full p-2 border rounded"
					placeholder="Marca del vehículo"
				/>
				{errors.brand && (
					<p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
				)}
			</div>

			<div>
				<label className="block mb-2">Modelo *</label>
				<input
					{...register('model')}
					className="w-full p-2 border rounded"
					placeholder="Modelo del vehículo"
				/>
				{errors.model && (
					<p className="text-red-500 text-sm mt-1">{errors.model.message}</p>
				)}
			</div>

			<div>
				<label className="block mb-2">Año</label>
				<input
					type="number"
					{...register('year', { valueAsNumber: true })}
					className="w-full p-2 border rounded"
					placeholder="Año del vehículo"
				/>
			</div>

			<div>
				<label className="block mb-2">Patente</label>
				<input
					{...register('licensePlate')}
					className="w-full p-2 border rounded"
					placeholder="Patente del vehículo"
				/>
			</div>
		</div>
	);
}