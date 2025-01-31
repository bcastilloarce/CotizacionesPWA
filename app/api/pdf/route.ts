import { NextResponse } from 'next/server';
import { generateQuotePDF } from '@/lib/pdf/generator';

export async function POST(req: Request) {
	try {
		const quote = await req.json();
		const pdfDoc = await generateQuotePDF(quote);
		const pdfBytes = await (pdfDoc as any).save();

		return new NextResponse(pdfBytes, {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': `attachment; filename="cotizacion-${quote.id}.pdf"`,
			},
		});
	} catch (error) {
		console.error('Error generating PDF:', error);
		return NextResponse.json(
			{ error: 'Failed to generate PDF' },
			{ status: 500 }
		);
	}
}