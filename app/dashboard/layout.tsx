'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from './components/theme-toggle';
import Header from './components/shared/Header';
import { DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function Layout({ children }: { children: React.ReactNode }) {
	const { status } = useSession();
	const router = useRouter();

	if (status === 'loading') {
		return (
			<div className="min-h-screen flex items-center justify-center bg-[#F2F2F7] dark:bg-[#1C1C1E]">
				<div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#007AFF]"></div>
			</div>
		);
	}

	if (status === 'unauthenticated') {
		router.push('/');
		return null;
	}

	// Redirect to nueva-cotizacion if on dashboard root
	if (status === 'authenticated' && window.location.pathname === '/dashboard') {
		router.push('/dashboard/nueva-cotizacion');
		return null;
	}

	return (
		<div className="min-h-screen bg-gray-100 dark:bg-gray-900">
			<Header />
			<main className="py-4">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{children}
				</div>
			</main>
			<nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 pb-[env(safe-area-inset-bottom)]">
				<div className="flex justify-around">
					<button
						onClick={() => router.push('/dashboard/nueva-cotizacion')}
						className="flex-1 py-3 flex flex-col items-center text-[#007AFF] dark:text-[#0A84FF]"
					>
						<DocumentTextIcon className="h-6 w-6" />
						<span className="text-xs mt-1">Cotización</span>
					</button>
					<button
						onClick={() => router.push('/dashboard/historial')}
						className="flex-1 py-3 flex flex-col items-center text-[#007AFF] dark:text-[#0A84FF]"
					>
						<ClockIcon className="h-6 w-6" />
						<span className="text-xs mt-1">Historial</span>
					</button>
				</div>
			</nav>
			<ThemeToggle />
		</div>
	);
}
