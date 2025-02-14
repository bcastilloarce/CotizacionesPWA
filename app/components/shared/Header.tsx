'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const pathname = usePathname();

  const getTitle = () => {
    switch (pathname) {
      case '/':
        return 'Cotizaciones Repuestos Oyarce';
      case '/nueva-cotizacion':
        return 'Nueva Cotización';
      case '/historial':
        return 'Historial';
      default:
        return 'Cotizaciones';
    }
  };

  const showBackButton = pathname !== '/';

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80">
      <div className="h-[44px] px-4 flex items-center justify-between">
        {showBackButton ? (
          <Link href="/" className="p-2 -ml-2">
            <ChevronLeftIcon className="h-5 w-5 text-[#007AFF]" />
          </Link>
        ) : (
          <div className="w-10" />
        )}

        <motion.h1
          className="text-[17px] font-semibold text-center flex-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          key={pathname}
        >
          {getTitle()}
        </motion.h1>

        <div className="w-10" />
      </div>
    </header>
  );
}
