'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Dashboard() {
    const { status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F2F2F7] dark:bg-[#1C1C1E]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#007AFF]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F2F2F7] dark:bg-[#1C1C1E]">
            <header className="bg-white dark:bg-[#2C2C2E] shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <h1 className="text-xl font-semibold text-[#1C1C1E] dark:text-white">
                        Sistema de Cotizaciones
                    </h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white dark:bg-[#2C2C2E] rounded-2xl shadow p-6">
                    <div className="w-full flex justify-center mb-10">
                        <Image
                            src="/assets/images/logo.png"
                            alt="Company Logo"
                            width={926}
                            height={272}
                            priority
                            className="w-full h-auto"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <button
                            onClick={() => router.push('/dashboard/nueva-cotizacion')}
                            className="p-6 bg-[#007AFF] text-white rounded-xl hover:bg-[#0051A8] transition-colors"
                        >
                            <h2 className="text-xl font-semibold mb-2">Nueva Cotización</h2>
                            <p className="text-sm opacity-80">Crear una nueva cotización para un cliente</p>
                        </button>

                        <button
                            onClick={() => router.push('/dashboard/historial')}
                            className="p-6 bg-[#34C759] text-white rounded-xl hover:bg-[#248A3D] transition-colors"
                        >
                            <h2 className="text-xl font-semibold mb-2">Historial</h2>
                            <p className="text-sm opacity-80">Ver cotizaciones anteriores</p>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

