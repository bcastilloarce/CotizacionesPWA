'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <Image
            src="/images/logo.png"
            alt="Repuestos Oyarce Logo"
            width={200}
            height={60}
            priority
            className="mb-8"
          />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Sistema de Cotizaciones
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Gestione sus cotizaciones de manera eficiente
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => router.push('/login')}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Iniciar Sesión
          </button>
          <button
            onClick={() => router.push('/register')}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Registrarse
          </button>
        </div>
      </div>
    </main>
  );
}
