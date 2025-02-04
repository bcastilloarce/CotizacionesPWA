'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/app/dashboard/components/DashboardLayout';

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

	return <DashboardLayout>{children}</DashboardLayout>;
}