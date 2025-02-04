'use client';

import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState, useMemo } from 'react';
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
        if (newProduct.name && newProduct.quantity > 0 && newProduct.unitPrice > 0) {
            const updatedProducts = [...products, {
                ...newProduct,
                subtotal: newProduct.quantity * newProduct.unitPrice
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

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#F2F2F7] dark:bg-[#1C1C1E] rounded-lg overflow-hidden mt-4"
        >
            <div className="px-4 py-3 bg-white dark:bg-[#2C2C2E]">
                <div className="space-y-4">
                    {/* Product Input Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-[17px] font-regular text-[#000000] dark:text-white">
                                Producto *
                            </label>
                            <input
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
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
                                type="number"
                                value={newProduct.quantity}
                                onChange={(e) => setNewProduct({...newProduct, quantity: parseInt(e.target.value) || 0})}
                                className="w-full h-[44px] px-4 text-[17px] bg-[#FFFFFF] dark:bg-[#3A3A3C]
                                         border border-[#C5C5C7] dark:border-[#3A3A3C] rounded-lg"
                                min="1"
                            />
                        </div>
                        <div>
                            <label className="block text-[17px] font-regular text-[#000000] dark:text-white">
                                Precio *
                            </label>
                            <input
                                type="number"
                                value={newProduct.unitPrice}
                                onChange={(e) => setNewProduct({...newProduct, unitPrice: parseInt(e.target.value) || 0})}
                                className="w-full h-[44px] px-4 text-[17px] bg-[#FFFFFF] dark:bg-[#3A3A3C]
                                         border border-[#C5C5C7] dark:border-[#3A3A3C] rounded-lg"
                                min="0"
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

                    {/* Products Table */}
                    {products.length > 0 && (
                        <div className="mt-4 overflow-hidden rounded-lg border border-[#C5C5C7] dark:border-[#3A3A3C]">
                            <table className="min-w-full divide-y divide-[#C5C5C7] dark:divide-[#3A3A3C]">
                                <thead className="bg-[#F2F2F7] dark:bg-[#1C1C1E]">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-[15px] font-medium text-gray-500">Producto</th>
                                        <th className="px-6 py-3 text-left text-[15px] font-medium text-gray-500">Cantidad</th>
                                        <th className="px-6 py-3 text-left text-[15px] font-medium text-gray-500">Precio</th>
                                        <th className="px-6 py-3 text-left text-[15px] font-medium text-gray-500">Subtotal</th>
                                        <th className="px-6 py-3 text-right text-[15px] font-medium text-gray-500">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-[#2C2C2E] divide-y divide-[#C5C5C7] dark:divide-[#3A3A3C]">
                                    {products.map((product, index) => (
                                        <tr key={index}>
                                            <td className="px-6 py-4 text-[17px] text-gray-900 dark:text-white">{product.name}</td>
                                            <td className="px-6 py-4 text-[17px] text-gray-900 dark:text-white">{product.quantity}</td>
                                            <td className="px-6 py-4 text-[17px] text-gray-900 dark:text-white">{formatCurrency(product.unitPrice)}</td>
                                            <td className="px-6 py-4 text-[17px] text-gray-900 dark:text-white">{formatCurrency(product.subtotal)}</td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleRemoveProduct(index)}
                                                    className="text-red-600 hover:text-red-900"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
