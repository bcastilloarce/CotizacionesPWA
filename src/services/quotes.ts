import { Constants } from '../utils/constants';
import { Quote, QuoteProduct } from '../utils/types';
import { VehicleUtils } from '../data/vehicleData';

export class QuotesService {
    private static STORAGE_KEY = Constants.Cache.cotizacionesKey;

    static async getAllQuotes(): Promise<Quote[]> {
        const quotesJson = localStorage.getItem(this.STORAGE_KEY);
        return quotesJson ? JSON.parse(quotesJson) : [];
    }

    static async saveQuote(quote: Omit<Quote, 'id' | 'createdAt' | 'updatedAt'>): Promise<Quote> {
        const quotes = await this.getAllQuotes();
        
        const newQuote: Quote = {
            ...quote,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        quotes.push(newQuote);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(quotes));
        
        return newQuote;
    }

    static async updateQuote(id: string, updates: Partial<Quote>): Promise<Quote | null> {
        const quotes = await this.getAllQuotes();
        const index = quotes.findIndex(q => q.id === id);
        
        if (index === -1) return null;

        const updatedQuote = {
            ...quotes[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };

        quotes[index] = updatedQuote;
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(quotes));
        
        return updatedQuote;
    }

    static async deleteQuote(id: string): Promise<boolean> {
        const quotes = await this.getAllQuotes();
        const filteredQuotes = quotes.filter(q => q.id !== id);
        
        if (filteredQuotes.length === quotes.length) return false;
        
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredQuotes));
        return true;
    }

    static calculateTotal(products: QuoteProduct[]): number {
        return products.reduce((sum, product) => sum + product.total, 0);
    }

    static validateQuote(quote: Partial<Quote>): string[] {
        const errors: string[] = [];

        if (!quote.clientName?.trim()) {
            errors.push('El nombre del cliente es requerido');
        }

        if (!quote.brand?.trim()) {
            errors.push('La marca es requerida');
        }

        if (!quote.model?.trim()) {
            errors.push('El modelo es requerido');
        }

        if (quote.brand && quote.model) {
            const isValid = VehicleUtils.validateBrandAndModel(quote.brand, quote.model);
            if (!isValid) {
                errors.push('La combinación de marca y modelo no es válida');
            }
        }

        if (!quote.duration?.trim()) {
            errors.push('La duración es requerida');
        }

        if (!quote.products?.length) {
            errors.push('Debe agregar al menos un producto');
        }

        return errors;
    }
}