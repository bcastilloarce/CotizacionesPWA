import { NextResponse } from 'next/server';
import { generatePDF } from '@/utils/pdfGenerator';

export async function POST(req: Request) {
	try {
		const data = await req.json();
		const pdfBuffer: Buffer = await generatePDF(data);

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
