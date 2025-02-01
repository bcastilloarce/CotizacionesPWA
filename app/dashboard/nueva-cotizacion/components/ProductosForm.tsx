'use client';

import { useFormContext } from 'react-hook-form';
import type { QuoteFormData } from '@/lib/validations/quote';

interface ProductItem {
    name: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
}

export default function ProductosForm() {
    const { register, watch, setValue, formState: { errors } } = useFormContext<QuoteFormData>();
    const products = watch('products') || [];

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    const calculateSubtotal = (quantity: number, unitPrice: number): number => {
        return quantity * unitPrice;
    };

    const handleAddProduct = () => {
        const newProduct: ProductItem = {
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

    const handleProductChange = (index: number, field: keyof ProductItem, value: any) => {
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
        <div className="space-y-4">
            <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 py-4 shadow-sm">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Productos</h2>
                    <button
                        type="button"
                        onClick={handleAddProduct}
                        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 active:bg-blue-700 transition-colors"
                    >
                        + Agregar Producto
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {products.map((product: ProductItem, index) => (
                    <div 
                        key={index} 
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
                    >
                        <div className="space-y-4">
                            <div className="flex flex-col">
                                <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                    Nombre del producto
                                </label>
                                <input
                                    value={product.name}
                                    onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                                    placeholder="Ej: Pastillas de freno"
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                        Cantidad
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={product.quantity}
                                        onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value) || 0)}
                                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                                        placeholder="0"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                        Precio unitario
                                    </label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={product.unitPrice}
                                        onChange={(e) => handleProductChange(index, 'unitPrice', parseInt(e.target.value) || 0)}
                                        className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                                        placeholder="$0"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <div className="flex flex-col">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Subtotal</span>
                                    <span className="text-lg font-semibold">
                                        {formatCurrency(product.subtotal)}
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveProduct(index)}
                                    className="text-red-500 hover:text-red-700 active:text-red-800 transition-colors rounded-full p-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {errors.products && (
                <p className="text-red-500 text-sm mt-1">{errors.products.message}</p>
            )}
        </div>
    );
}