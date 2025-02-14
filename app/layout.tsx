import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from '@/app/components/theme-toggle';
import { Providers } from './providers';
import Header from '@/app/components/shared/Header';
import { DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cotizaciones Repuestos Oyarce',
  description: 'Sistema de cotizaciones',
};

export const viewport: Viewport = {
  themeColor: '#007AFF',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className={inter.className}>
      <body>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            storageKey="theme"
          >
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
              <Header />
              <main className="py-4 pb-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {children}
                </div>
              </main>
              <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 pb-safe">
                <div className="flex justify-around">
                  <a
                    href="/nueva-cotizacion"
                    className="flex-1 py-3 flex flex-col items-center text-[#007AFF] dark:text-[#0A84FF]"
                  >
                    <DocumentTextIcon className="h-6 w-6" />
                    <span className="text-xs mt-1">Nueva Cotización</span>
                  </a>
                  <a
                    href="/historial"
                    className="flex-1 py-3 flex flex-col items-center text-[#007AFF] dark:text-[#0A84FF]"
                  >
                    <ClockIcon className="h-6 w-6" />
                    <span className="text-xs mt-1">Historial</span>
                  </a>
                </div>
              </nav>
              <ThemeToggle />
              <Toaster position="bottom-center" />
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}