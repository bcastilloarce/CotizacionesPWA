'use client';

import { useFormContext } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircleIcon, XMarkIcon, PencilIcon, TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useState, useCallback, useMemo, useEffect } from 'react';
import type { QuoteFormData } from '@/app/api/validations/quote';
import { openDB } from 'idb';

const initDB = async () => {
    const db = await openDB('cotizaciones-db', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('products')) {
                db.createObjectStore('products', { keyPath: 'id', autoIncrement: true });
            }
        },
    });
    return db;
};

interface ProductItem {
    name: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
}

interface ProductModalProps {
    product?: ProductItem;
    index?: number;
    onSave: (product: ProductItem, index?: number) => void;
    onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, index, onSave, onClose }) => {
    const [formData, setFormData] = useState<ProductItem>(product || {
        name: '',
        quantity: 1,
        unitPrice: 0,
        subtotal: 0,
    });

    const handleQuantityChange = (increment: number) => {
        const newQuantity = Math.max(1, Math.min(999, formData.quantity + increment));
        const newSubtotal = newQuantity * formData.unitPrice;
        setFormData({ ...formData, quantity: newQuantity, subtotal: newSubtotal });
    };

    const handlePriceChange = (value: string) => {
        const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
        const newSubtotal = numericValue * formData.quantity;
        setFormData({ ...formData, unitPrice: numericValue, subtotal: newSubtotal });
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
                >
                    <div className="sm:flex sm:items-start">
                        <div className="w-full">
                            <div className="flex justify-between items-center mb-5">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                    {product ? 'Editar Producto' : 'Nuevo Producto'}
                                </h3>
                                <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                                    <XMarkIcon className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Producto *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="mt-1 block w-full rounded-lg"
                                        placeholder="Nombre del producto"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Cantidad *
                                    </label>
                                    <div className="mt-1 flex items-center space-x-3">
                                        <button
                                            type="button"
                                            onClick={() => handleQuantityChange(-1)}
                                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <MinusIcon className="h-5 w-5" />
                                        </button>
                                        <input
                                            type="number"
                                            value={formData.quantity}
                                            onChange={(e) => handleQuantityChange(parseInt(e.target.value) - formData.quantity)}
                                            min="1"
                                            max="999"
                                            className="block w-20 text-center border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => handleQuantityChange(1)}
                                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <PlusIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Precio unitario *
                                    </label>
                                    <div className="mt-1 relative rounded-lg">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                                            <span className="text-gray-500 sm:text-sm">$</span>
                                        </div>
                                        <input
                                            type="text"
                                            value={formData.unitPrice.toLocaleString('es-CL')}
                                            onChange={(e) => handlePriceChange(e.target.value)}
                                            className="block w-full pl-7 rounded-lg"
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="w-full inline-flex justify-center rounded-lg border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (formData.name && formData.quantity > 0 && formData.unitPrice > 0) {
                                            onSave(formData, index);
                                        }
                                    }}
                                    className="mt-3 sm:mt-0 w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                                >
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default function ProductosForm() {
    const { register, watch, setValue, formState: { errors } } = useFormContext<QuoteFormData>();
    const watchProducts = watch('products');
    const products = useMemo(() => watchProducts || [], [watchProducts]);
    const [modalProduct, setModalProduct] = useState<{ product?: ProductItem; index?: number } | null>(null);

    const formatCurrency = useCallback((amount: number): string => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }, []);

    const handleSaveProduct = (product: ProductItem, index?: number) => {
        const updatedProducts = [...products];
        if (typeof index === 'number') {
            updatedProducts[index] = product;
        } else {
            updatedProducts.push(product);
        }
        setValue('products', updatedProducts);
        setModalProduct(null);
    };

    const handleRemoveProduct = (index: number) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setValue('products', updatedProducts);
    };

    const total = useMemo(() => {
        return products.reduce((sum, product) => sum + (product.quantity * product.unitPrice), 0);
    }, [products]);

    // Save products to IndexedDB when they change
    useEffect(() => {
        const saveProducts = async () => {
            const db = await initDB();
            await db.put('products', products);
        };

        if (products.length > 0) {
            saveProducts();
        }
    }, [products]);

    // Add offline sync functionality
    useEffect(() => {
        const syncProducts = async () => {
            if (navigator.onLine) {
                const db = await initDB();
                const offlineProducts = await db.getAll('products');
                // Sync with server
                try {
                    await fetch('/api/sync-products', {
                        method: 'POST',
                        body: JSON.stringify(offlineProducts),
                    });
                    await db.clear('products');
                } catch (error) {
                    console.error('Sync failed:', error);
                }
            }
        };

        window.addEventListener('online', syncProducts);
        return () => window.removeEventListener('online', syncProducts);
    }, []);

    return (
        <>
            <div className="space-y-4">
                <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 py-4 px-4 sm:px-6 shadow-sm">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Productos</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {products.length} producto{products.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setModalProduct({})}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <PlusCircleIcon className="h-5 w-5 mr-2" />
                            Agregar Producto
                        </button>
                    </div>
                </div>

                <div className="space-y-4 px-4 sm:px-6">
                    <AnimatePresence>
                        {products.map((product: ProductItem, index) => (
                            <motion.div
                                key={index}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
                            >
                                <div className="p-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                {product.name}
                                            </h3>
                                            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                {product.quantity} x {formatCurrency(product.unitPrice)}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                                                {formatCurrency(product.quantity * product.unitPrice)}
                                            </div>
                                            <div className="flex space-x-1">
                                                <button
                                                    type="button"
                                                    onClick={() => setModalProduct({ product, index })}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-full"
                                                >
                                                    <PencilIcon className="h-5 w-5" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveProduct(index)}
                                                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-full"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {products.length > 0 && (
                        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
                            <div className="flex justify-between items-center text-lg font-semibold">
                                <span>Total con IVA</span>
                                <span>{formatCurrency(total)}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {modalProduct !== null && (
                    <ProductModal
                        product={modalProduct.product}
                        index={modalProduct.index}
                        onSave={handleSaveProduct}
                        onClose={() => setModalProduct(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}