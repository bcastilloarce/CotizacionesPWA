'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
			<main className="py-4">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{children}
				</div>
			</main>
		</div>
	);
}
