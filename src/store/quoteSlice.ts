import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Quote } from '../utils/types';
import { QuotesService } from '../services/quotes';
import { PDFService } from '../services/pdf';

interface QuoteState {
    quotes: Quote[];
    currentQuote: Quote | null;
    loading: boolean;
    error: string | null;
}

const initialState: QuoteState = {
    quotes: [],
    currentQuote: null,
    loading: false,
    error: null
};

export const fetchQuotes = createAsyncThunk(
    'quotes/fetchAll',
    async () => {
        return await QuotesService.getAllQuotes();
    }
);

export const saveQuote = createAsyncThunk(
    'quotes/save',
    async (quote: Omit<Quote, 'id' | 'createdAt' | 'updatedAt'>) => {
        return await QuotesService.saveQuote(quote);
    }
);

export const updateQuote = createAsyncThunk(
    'quotes/update',
    async ({ id, updates }: { id: string; updates: Partial<Quote> }) => {
        const result = await QuotesService.updateQuote(id, updates);
        if (!result) throw new Error('Quote not found');
        return result;
    }
);

export const deleteQuote = createAsyncThunk(
    'quotes/delete',
    async (id: string) => {
        const success = await QuotesService.deleteQuote(id);
        if (!success) throw new Error('Quote not found');
        return id;
    }
);

export const generatePDF = createAsyncThunk(
    'quotes/generatePDF',
    async (quote: Quote) => {
        const pdfBlob = await PDFService.generatePDF(quote);
        const url = URL.createObjectURL(pdfBlob);
        window.open(url, '_blank');
        return url;
    }
);

const quoteSlice = createSlice({
    name: 'quotes',
    initialState,
    reducers: {
        setCurrentQuote: (state, action: PayloadAction<Quote | null>) => {
            state.currentQuote = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuotes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuotes.fulfilled, (state, action) => {
                state.quotes = action.payload;
                state.loading = false;
            })
            .addCase(fetchQuotes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch quotes';
            })
            .addCase(saveQuote.fulfilled, (state, action) => {
                state.quotes.push(action.payload);
                state.currentQuote = action.payload;
            })
            .addCase(updateQuote.fulfilled, (state, action) => {
                const index = state.quotes.findIndex(q => q.id === action.payload.id);
                if (index !== -1) {
                    state.quotes[index] = action.payload;
                }
                state.currentQuote = action.payload;
            })
            .addCase(deleteQuote.fulfilled, (state, action) => {
                state.quotes = state.quotes.filter(q => q.id !== action.payload);
                if (state.currentQuote?.id === action.payload) {
                    state.currentQuote = null;
                }
            });
    }
});

export const { setCurrentQuote, clearError } = quoteSlice.actions;
export default quoteSlice.reducer;
