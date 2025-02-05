import { NextResponse } from 'next/server';
import { generatePDF } from '@/app/api/pdf/pdfGenerator';

export async function POST(req: Request) {
    try {
        const data = await req.json();

        if (!data) {
            return new NextResponse('Missing quote data', { status: 400 });
        }

        const pdfBuffer = await generatePDF(data);

        if (!pdfBuffer) {
            return new NextResponse('Failed to generate PDF', { status: 500 });
        }

        return new NextResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename=cotizacion.pdf'
            },
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        return new NextResponse(
            'Error generating PDF: ' + (error instanceof Error ? error.message : 'Unknown error'),
            { status: 500 }
        );
    }
}