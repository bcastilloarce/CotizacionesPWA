'use client';

import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState, useMemo, useCallback } from 'react';
import type { QuoteFormData } from '@/app/api/validations/quote';

interface ProductItem {
    name: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
}

export default function ProductosForm() {
    const { register, watch, setValue, formState: { errors } } = useFormContext<QuoteFormData>();
    const [newProduct, setNewProduct] = useState<ProductItem>({
        name: '',
        quantity: 1,
        unitPrice: 0,
        subtotal: 0
    });
    const watchProducts = watch('products');
    const products = useMemo(() => watchProducts || [], [watchProducts]);

    const handleAddProduct = () => {
        const quantity = parseInt(newProduct.quantity.toString());
        if (newProduct.name && quantity > 0 && newProduct.unitPrice > 0) {
            const updatedProducts = [...products, {
                ...newProduct,
                quantity: quantity,
                subtotal: quantity * newProduct.unitPrice
            }];
            setValue('products', updatedProducts);
            // Clear form
            setNewProduct({
                name: '',
                quantity: 1,
                unitPrice: 0,
                subtotal: 0
            });
        }
    };

    const handleRemoveProduct = (index: number) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setValue('products', updatedProducts);
    };

    const formatCurrency = useCallback((amount: number): string => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }, []);

    const calculateTotal = useCallback((): number => {
        return products.reduce((acc, product) => acc + (product.quantity * product.unitPrice), 0);
    }, [products]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#F2F2F7] dark:bg-[#1C1C1E] rounded-lg overflow-hidden mt-4"
        >
            <div className="px-4 py-3 bg-white dark:bg-[#2C2C2E]">
                <div className="space-y-4">
                    {/* Products Table */}
                    <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-6">Producto</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Cantidad</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Precio</th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white">Subtotal</th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Acciones</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-gray-800">
                                        {products.map((product, index) => (
                                            <tr key={index}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-6">{product.name}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{product.quantity}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{formatCurrency(product.unitPrice)}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-300">{formatCurrency(product.quantity * product.unitPrice)}</td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveProduct(index)}
                                                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                    >
                                                        <TrashIcon className="h-5 w-5" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {products.length > 0 && (
                                            <tr className="bg-gray-50 dark:bg-gray-700">
                                                <td colSpan={3} className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-semibold text-gray-900 dark:text-white sm:pl-6 text-right">Total con IVA:</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(calculateTotal())}</td>
                                                <td></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    {/* Product Input Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-[17px] font-regular text-[#000000] dark:text-white">
                                Producto *
                            </label>
                            <input
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                className="w-full h-[44px] px-4 text-[17px] bg-[#FFFFFF] dark:bg-[#3A3A3C]
                                         border border-[#C5C5C7] dark:border-[#3A3A3C] rounded-lg"
                                placeholder="Nombre del producto"
                            />
                        </div>
                        <div>
                            <label className="block text-[17px] font-regular text-[#000000] dark:text-white">
                                Cantidad *
                            </label>
                            <input
                                inputMode="numeric"
                                type="text"
                                pattern="[0-9]*"
                                value={newProduct.quantity === 1 && newProduct.name === '' ? '' : newProduct.quantity}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                    const numValue = value ? parseInt(value) : 0;
                                    setNewProduct({ ...newProduct, quantity: numValue });
                                }}
                                className="w-full h-[44px] px-4 text-[17px] bg-[#FFFFFF] dark:bg-[#3A3A3C]
                                         border border-[#C5C5C7] dark:border-[#3A3A3C] rounded-lg"
                                placeholder="Cantidad"
                            />
                        </div>
                        <div>
                            <label className="block text-[17px] font-regular text-[#000000] dark:text-white">
                                Precio *
                            </label>
                            <input
                                inputMode="numeric"
                                pattern="[0-9]*"
                                type="text"
                                value={newProduct.unitPrice === 0 ? '' : newProduct.unitPrice.toLocaleString('es-CL').replace(/,/g, '.')}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                    const numValue = value ? parseInt(value) : 0;
                                    setNewProduct({ ...newProduct, unitPrice: numValue });
                                }}
                                className="w-full h-[44px] px-4 text-[17px] bg-[#FFFFFF] dark:bg-[#3A3A3C]
                                         border border-[#C5C5C7] dark:border-[#3A3A3C] rounded-lg"
                                min="0"
                                placeholder="Precio en CLP"
                            />
                        </div>
                    </div>

                    {/* Add Product Button */}
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleAddProduct}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <PlusCircleIcon className="h-5 w-5 mr-2" />
                            Agregar Producto
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
