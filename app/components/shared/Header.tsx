'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, Bars3Icon } from '@heroicons/react/24/outline';

export default function Header() {
  const pathname = usePathname();

  const getTitle = () => {
    switch (pathname) {
      case '/dashboard':
        return 'Dashboard';
      case '/dashboard/nueva-cotizacion':
        return 'Nueva Cotización';
      case '/dashboard/historial':
        return 'Historial';
      default:
        return 'Cotizaciones';
    }
  };

  const showBackButton = pathname !== '/dashboard';

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-screen-xl mx-auto">
        <div className="h-[44px] px-4 flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center w-1/3">
            {showBackButton ? (
              <Link href="/dashboard" className="p-2 -ml-2">
                <ChevronLeftIcon className="h-5 w-5 text-[#007AFF]" />
              </Link>
            ) : (
              <button className="p-2 -ml-2">
                <Bars3Icon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            )}
          </div>

          {/* Center title */}
          <motion.h1
            className="flex-1 text-center text-[17px] font-semibold text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            key={pathname}
          >
            {getTitle()}
          </motion.h1>

          {/* Right side - keeping symmetry */}
          <div className="w-1/3" />
        </div>
      </div>
    </header>
  );
}