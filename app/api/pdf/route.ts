import { NextResponse } from 'next/server';
import { generateQuotePDF } from '@/lib/pdf/generator';

export async function POST(req: Request) {
	try {
		const data = await req.json();
		const pdfBuffer = await generateQuotePDF(data);

		return new NextResponse(pdfBuffer, {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': `attachment; filename="cotizacion.pdf"`
			}
		});
	} catch (error) {
		console.error('Error generating PDF:', error);
		return NextResponse.json(
			{ error: 'Failed to generate PDF' },
			{ status: 500 }
		);
	}
}
