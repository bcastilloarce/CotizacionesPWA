'use client';

import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/app/dashboard/providers/theme-provider';
import { ThemeToggle } from '@/app/dashboard/components/theme-toggle';
import { Providers } from './providers';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cotizaciones PWA',
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
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    }
  }, []);

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
        {children}
        <ThemeToggle />
        </ThemeProvider>
      </Providers>
      </body>
    </html>

  );
}
