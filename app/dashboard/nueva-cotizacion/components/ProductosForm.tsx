'use client';

import { useFormContext } from 'react-hook-form';
import type { Product } from '@prisma/client';
import type { QuoteFormData } from '@/lib/validations/quote';

export default function ProductosForm() {
	const { register, watch, setValue, formState: { errors } } = useFormContext<QuoteFormData>();
	const products = watch('products') || [];

	const calculateSubtotal = (quantity: number, unitPrice: number) => {
		return quantity * unitPrice;
	};

	const handleAddProduct = () => {
		const newProduct = {
			name: '',
			quantity: 1,
			unitPrice: 0,
			subtotal: 0,
		};
		setValue('products', [...products, newProduct]);
	};

	const handleRemoveProduct = (index: number) => {
		const updatedProducts = products.filter((_, i) => i !== index);
		setValue('products', updatedProducts);
	};

	const handleProductChange = (index: number, field: keyof Product, value: any) => {
		const updatedProducts = [...products];
		updatedProducts[index] = {
			...updatedProducts[index],
			[field]: value,
		};

		if (field === 'quantity' || field === 'unitPrice') {
			updatedProducts[index].subtotal = calculateSubtotal(
				field === 'quantity' ? value : updatedProducts[index].quantity,
				field === 'unitPrice' ? value : updatedProducts[index].unitPrice
			);
		}

		setValue('products', updatedProducts);
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">Productos</h2>
				<button
					type="button"
					onClick={handleAddProduct}
					className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
				>
					Agregar Producto
				</button>
			</div>

			{products.map((product, index) => (
				<div key={index} className="grid grid-cols-12 gap-4 mb-4">
					<div className="col-span-5">
						<input
							value={product.name}
							onChange={(e) => handleProductChange(index, 'name', e.target.value)}
							className="w-full p-2 border rounded"
							placeholder="Nombre del producto"
						/>
					</div>
					<div className="col-span-2">
						<input
							type="number"
							value={product.quantity}
							onChange={(e) =>
								handleProductChange(index, 'quantity', parseInt(e.target.value))
							}
							className="w-full p-2 border rounded"
							placeholder="Cantidad"
						/>
					</div>
					<div className="col-span-2">
						<input
							type="number"
							value={product.unitPrice}
							onChange={(e) =>
								handleProductChange(index, 'unitPrice', parseInt(e.target.value))
							}
							className="w-full p-2 border rounded"
							placeholder="Precio unitario"
						/>
					</div>
					<div className="col-span-2">
						<input
							type="number"
							value={product.subtotal}
							className="w-full p-2 border rounded bg-gray-100"
							readOnly
						/>
					</div>
					<div className="col-span-1">
						<button
							type="button"
							onClick={() => handleRemoveProduct(index)}
							className="text-red-500 hover:text-red-700"
						>
							Eliminar
						</button>
					</div>
				</div>
			))}

			{errors.products && (
				<p className="text-red-500 text-sm mt-1">{errors.products.message}</p>
			)}
		</div>
	);
}