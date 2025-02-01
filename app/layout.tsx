import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import './globals.css';
import { authOptions } from '@/lib/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cotizaciones PWA',
  description: 'Sistema de cotizaciones para Repuestos Oyarce',
  manifest: '/manifest.json',
  icons: [
    { rel: 'apple-touch-icon', url: 'icons/icon.png' },
    { rel: 'icon', url: 'icons/icon.png' },
  ],
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="es" className={inter.className}>
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

