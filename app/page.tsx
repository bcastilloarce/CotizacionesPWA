'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Credenciales inválidas');
      } else if (result?.ok) {
        router.push('/dashboard/nueva-cotizacion');
      }
    } catch (error) {
      setError('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-md mx-auto p-6 space-y-6 bg-white dark:bg-[#2C2C2E] rounded-2xl shadow-lg">
        <div className="flex flex-col items-center">
          <Image
            src="/assets/images/logo.png"
            alt="Repuestos Oyarce Logo"
            width={180}
            height={54}
            priority
            className="mb-6"
          />
          <h1 className="text-2xl font-semibold text-[#1C1C1E] dark:text-white mb-2">
            Repuestos Oyarce
          </h1>
          <p className="text-[#8E8E93] text-center text-base mb-6">
            Acceso privado al sistema de cotizaciones
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-[#1C1C1E] dark:text-white mb-2">
              Usuario
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="w-full px-4 py-3 text-base text-[#1C1C1E] dark:text-white bg-[#F2F2F7] dark:bg-[#3A3A3C] border border-[#E5E5EA] dark:border-[#3A3A3C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent placeholder-[#8E8E93]"
              placeholder="Ingrese su usuario"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#1C1C1E] dark:text-white mb-2">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 text-base text-[#1C1C1E] dark:text-white bg-[#F2F2F7] dark:bg-[#3A3A3C] border border-[#E5E5EA] dark:border-[#3A3A3C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent placeholder-[#8E8E93]"
              placeholder="Ingrese su contraseña"
            />
          </div>

          {error && (
            <p className="text-[#FF3B30] text-sm text-center py-2 px-4 bg-[#FF3B30]/10 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-3 px-4 text-base font-medium text-white bg-[#007AFF] hover:bg-[#0071E3] rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#007AFF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? 'Accediendo...' : 'Acceder'}
          </button>
        </form>
      </div>
    </div>
  );
}
