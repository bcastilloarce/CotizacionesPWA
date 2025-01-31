import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const quotes = await prisma.quote.findMany({
      where: {
        userId: (session.user as any).id,
      },
      include: {
        products: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(quotes);
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
        userId: (session.user as any).id,
        products: {
          create: data.products.map((product: any) => ({
            name: product.name,
            quantity: product.quantity,
            unitPrice: product.unitPrice,
            subtotal: product.subtotal,
          })),
        },
      },
      include: {
        products: true,
      },
    });

    return NextResponse.json(quote);
  } catch (error) {
    console.error('Error creating quote:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
