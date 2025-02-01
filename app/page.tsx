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
        router.push('/dashboard');
      }
    } catch (error) {
      setError('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

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
            Repuestos Oyarce
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Acceso privado al sistema de generación de cotizaciones
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Usuario
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          </div>

          <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
          </div>

          {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
          {isLoading ? 'Accediendo...' : 'Acceder'}
          </button>
        </form>
        </div>
      </main>
      );
    }

