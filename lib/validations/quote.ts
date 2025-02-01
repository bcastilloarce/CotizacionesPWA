import { z } from 'zod';

export const productSchema = z.object({
	name: z.string(),
	quantity: z.number(),
	unitPrice: z.number(),
	subtotal: z.number()
});

export const quoteSchema = z.object({
	client: z.string().min(1, 'El cliente es requerido'),
	date: z.string(),
	brand: z.string().min(1, 'La marca es requerida'),
	model: z.string().min(1, 'El modelo es requerido'),
	year: z.string().optional(),
	licensePlate: z.string().optional(),
	duration: z.string().min(1, 'La duración es requerida'),
	untilStockLasts: z.boolean().default(true),
	products: z.array(productSchema),
	totalWithTax: z.number(),
	availability: z.string().optional()
});

export type QuoteFormData = z.infer<typeof quoteSchema>;