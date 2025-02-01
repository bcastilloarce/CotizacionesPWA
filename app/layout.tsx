import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export const metadata: Metadata = {
  title: 'Cotizaciones PWA',
  description: 'Sistema de cotizaciones para Repuestos Oyarce',
  manifest: '/manifest.json',
  icons: {
    icon: '/icons/icon.png',          // Standard icon for all platforms
    apple: '/icons/icon.png',         // iOS/macOS specific
    shortcut: '/icons/icon.png',      // Shortcut icon for browsers
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/icons/icon.png',
    },
  },
  themeColor: '#000000',
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        <Providers>
          {children}
          <ThemeToggle />
        </Providers>
      </body>
    </html>
  );
}
