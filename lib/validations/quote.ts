import { z } from 'zod';

export const productSchema = z.object({
	name: z.string().min(1, 'El nombre del producto es requerido'),
	quantity: z.number().min(1, 'La cantidad debe ser mayor a 0'),
	unitPrice: z.number().min(0, 'El precio debe ser mayor o igual a 0'),
	subtotal: z.number(),
});

export const quoteSchema = z.object({
	client: z.string().min(1, 'El nombre del cliente es requerido'),
	brand: z.string().min(1, 'La marca es requerida'),
	model: z.string().min(1, 'El modelo es requerido'),
	year: z.number().optional(),
	licensePlate: z.string().optional(),
	duration: z.string().min(1, 'La duración es requerida'),
	untilStockLasts: z.boolean().default(false),
	availability: z.string().optional(),
	products: z.array(productSchema).min(1, 'Debe agregar al menos un producto'),
	totalWithTax: z.number(),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;