import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';
import { redis } from '@/lib/redis';

const QUOTE_NUMBER_KEY = 'quote_number_sequence';
const QUOTES_KEY = 'quotes';

interface Quote {
    id: string;
    client: string;
    brand: string;
    model: string;
    year?: number;
    licensePlate?: string;
    duration: string;
    untilStockLasts: boolean;
    availability?: string;
    products: Array<{
        name: string;
        quantity: number;
        unitPrice: number;
        subtotal: number;
    }>;
    totalWithTax: number;
    userId: string;
    createdAt: string;
}

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const quotes = await redis.get<Quote[]>(`${QUOTES_KEY}:${session.user.id}`) || [];

        const enhancedQuotes = await Promise.all(quotes.map(async (quote) => {
            const quoteNumber = await redis.get(`quote:${quote.id}:number`);
            return {
                ...quote,
                formattedNumber: quoteNumber ?
                    `N${String(quoteNumber).padStart(3, '0')}` :
                    undefined
            };
        }));

        return NextResponse.json(enhancedQuotes);
    } catch (error) {
        console.error('Error fetching quotes:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const data = await req.json();
        const quoteNumber = await redis.incr(QUOTE_NUMBER_KEY);

        const quote: Quote = {
            id: crypto.randomUUID(),
            ...data,
            userId: session.user.id,
            createdAt: new Date().toISOString()
        };

        // Obtener quotes existentes y agregar el nuevo
        const existingQuotes = await redis.get<Quote[]>(`${QUOTES_KEY}:${session.user.id}`) || [];
        await redis.set(`${QUOTES_KEY}:${session.user.id}`, [...existingQuotes, quote]);

        // Almacenar el número de cotización
        await redis.set(`quote:${quote.id}:number`, quoteNumber);

        return NextResponse.json({
            ...quote,
            formattedNumber: `N${String(quoteNumber).padStart(3, '0')}`
        });
    } catch (error) {
        console.error('Error creating quote:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
