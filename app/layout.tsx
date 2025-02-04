import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import Header from '@/app/components/shared/Header';
import Footer from '@/app/components/shared/Footer';
import { ThemeToggle } from '@/components/shared/theme-toggle';

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
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="theme"
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
