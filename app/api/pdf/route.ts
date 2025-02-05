import { NextResponse } from 'next/server';
import { generatePDF } from '@/app/api/pdf/pdfGenerator';

export async function POST(req: Request) {
	try {
		// Parse and validate request data
		const data = await req.json();
		if (!data.client || !Array.isArray(data.products) || data.products.length === 0) {
			return NextResponse.json(
				{ error: 'Datos de cotización inválidos o incompletos' },
				{ status: 400 }
			);
		}

		// Generate PDF
		const pdfBuffer: Buffer = await generatePDF(data);
		if (!pdfBuffer || pdfBuffer.length === 0) {
			throw new Error('PDF generation failed - empty buffer');
		}

		// Generate filename using client name and date
		const date = new Date().toISOString().split('T')[0];
		const safeClientName = data.client.toLowerCase().replace(/[^a-z0-9]/g, '_');
		const filename = `cotizacion_${safeClientName}_${date}.pdf`;

		// Return PDF response
		return new NextResponse(pdfBuffer, {
			headers: {
				'Content-Type': 'application/pdf',
				'Content-Disposition': `attachment; filename="${filename}"`,
				'Cache-Control': 'no-store'
			}
		});
	} catch (error) {
		console.error('Error generating PDF:', error);
		
		// Provide more specific error messages
		const errorMessage = error instanceof Error ? error.message : 'Error desconocido al generar el PDF';
		return NextResponse.json(
			{ error: errorMessage },
			{ status: 500 }
		);
	}
}
