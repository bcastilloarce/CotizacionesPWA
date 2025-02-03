'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import type { QuoteFormData } from '@/lib/validations/quote';
import { Switch } from '@headlessui/react';

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
		const currentYear = 2025;
		return Array.from({ length: 31 }, (_, i) => currentYear - i);
	});

	useEffect(() => {
		// Load brands and models from JSON
		fetch('/MarcasJSON/marcasymodelos.json')
			.then(res => res.json())
			.then(data => setBrands(data.marcasymodelos));
	}, []);

	useEffect(() => {
		// Update models when brand changes
		const brandData = brands.find(b => b.marca === selectedBrand);
		setModels(brandData?.modelo || []);
		setValue('model', ''); // Reset model when brand changes
	}, [selectedBrand, brands, setValue]);

	return (
		<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
			<h2 className="text-xl font-semibold mb-4">Información del Vehículo</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label className="block mb-2 text-sm font-medium">Marca *</label>
					<select
						{...register('brand')}
						className="w-full p-2 border rounded-lg"
				>
					<option value="">Seleccione una marca</option>
					{brands.map(brand => (
						<option key={brand.marca} value={brand.marca}>
							{brand.marca}
						</option>
					))}
				</select>
				{errors.brand && (
					<p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
				)}
			</div>

			<div>
				<label className="block mb-2 text-sm font-medium">Modelo *</label>
				<select
					{...register('model')}
					className="w-full p-2 border rounded-lg"
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
					<p className="text-red-500 text-sm mt-1">{errors.model.message}</p>
				)}
			</div>

			<div>
				<label className="block mb-2 text-sm font-medium">Año</label>
				<select
					{...register('year')}
					className="w-full p-2 border rounded-lg"
				>
					<option value="">Seleccione un año</option>
					{years.map(year => (
						<option key={year} value={year}>
							{year}
						</option>
					))}
				</select>
			</div>

			<div>
				<label className="block mb-2 text-sm font-medium">Patente</label>
				<input
					{...register('licensePlate', {
						setValueAs: (value: string) => value.toUpperCase(),
						pattern: /^[A-Z0-9]*$/
					})}
					className="w-full p-2 border rounded-lg uppercase"
					placeholder="Patente del vehículo"
					onInput={(e) => {
						const input = e.currentTarget;
						input.value = input.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
					}}
				/>
			</div>

			<div>
				<label className="block mb-2 text-sm font-medium">Duración</label>
				<select
					{...register('duration')}
					className="w-full p-2 border rounded-lg"
					defaultValue="1 día"
				>
					{Array.from({ length: 30 }, (_, i) => i + 1).map(num => (
						<option key={num} value={`${num} día${num > 1 ? 's' : ''}`}>
							{num} día{num > 1 ? 's' : ''}
						</option>
					))}
				</select>
			</div>

			<div>
				<label className="block mb-2 text-sm font-medium">Disponibilidad</label>
				<input
					{...register('availability')}
					className="w-full p-2 border rounded-lg"
					placeholder="Ej: Entrega inmediata"
				/>
			</div>

			<div className="flex items-center space-x-4">
				<label className="block text-sm font-medium">Hasta agotar stock</label>
				<Controller
					name="untilStockLasts"
					control={control}
					defaultValue={true}
					render={({ field: { value, onChange } }) => (
						<Switch
							checked={value}
							onChange={onChange}
							className={`${
								value ? 'bg-blue-600' : 'bg-gray-200'
							} relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
						>
							<span
								className={`${
									value ? 'translate-x-6' : 'translate-x-1'
								} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
							/>
						</Switch>
					)}
				/>
			</div>
		</div>
	</div>
	);
}