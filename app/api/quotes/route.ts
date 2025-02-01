import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';
import { Redis } from '@upstash/redis';

const prisma = new PrismaClient();
const redis = new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!
});

const QUOTE_NUMBER_KEY = 'quote_number_sequence';

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // Get quotes from both Prisma and Redis cache
        const quotes = await prisma.quote.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                products: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Enhance quotes with their numbers from Redis
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

        // Get the next quote number
        const quoteNumber = await redis.incr(QUOTE_NUMBER_KEY);

        // Create the quote in the database
        const quote = await prisma.quote.create({
            data: {
                client: data.client,
                brand: data.brand,
                model: data.model,
                year: data.year,
                licensePlate: data.licensePlate,
                duration: data.duration,
                untilStockLasts: data.untilStockLasts,
                availability: data.availability,
                totalWithTax: data.totalWithTax,
                userId: session.user.id,
                products: {
                    create: data.products
                }
            },
            include: {
                products: true
            }
        });

        // Store the quote number in Redis
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
