'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  PlusCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  PlusCircleIcon as PlusCircleIconSolid,
  ClockIcon as ClockIconSolid
} from '@heroicons/react/24/solid';

export default function Footer() {
  const pathname = usePathname();

  const tabs = [
    {
      name: 'Inicio',
      href: '/dashboard',
      icon: HomeIcon,
      activeIcon: HomeIconSolid
    },
    {
      name: 'Nueva',
      href: '/dashboard/nueva-cotizacion',
      icon: PlusCircleIcon,
      activeIcon: PlusCircleIconSolid
    },
    {
      name: 'Historial',
      href: '/dashboard/historial',
      icon: ClockIcon,
      activeIcon: ClockIconSolid
    }
  ];

  return (
    <footer className="fixed bottom-0 w-full bg-white dark:bg-black backdrop-blur-lg bg-opacity-80 dark:bg-opacity-80 border-t border-gray-200 dark:border-gray-800">
      <div className="h-[49px] max-w-screen-xl mx-auto px-4">
        <nav className="h-full">
          <ul className="h-full flex items-center justify-around">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href;
              const Icon = isActive ? tab.activeIcon : tab.icon;

              return (
                <li key={tab.name}>
                  <Link href={tab.href} className="relative px-3 py-2">
                    <div className="flex flex-col items-center">
                      <Icon
                        className={`h-6 w-6 ${
                          isActive ? 'text-[#007AFF]' : 'text-gray-500 dark:text-gray-400'
                        }`}
                      />
                      <span
                        className={`text-[10px] ${
                          isActive ? 'text-[#007AFF] font-medium' : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {tab.name}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute -bottom-[17px] left-0 right-0 h-0.5 bg-[#007AFF]"
                        />
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Safe area spacing for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </footer>
  );
}