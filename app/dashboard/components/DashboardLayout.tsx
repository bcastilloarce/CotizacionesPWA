'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	const pathname = usePathname();

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

