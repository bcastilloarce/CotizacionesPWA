'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [activeTab, setActiveTab] = useState('new'); // 'new' or 'history'

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

	return (
		<div className="min-h-screen bg-[#F2F2F7] dark:bg-[#1C1C1E]">
			<header className="bg-white dark:bg-[#2C2C2E] shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
					<div className="flex justify-between items-center">
						<h1 className="text-xl font-semibold text-[#1C1C1E] dark:text-white">
							Sistema de Cotizaciones
						</h1>
						<nav className="flex space-x-4">
							<button
								onClick={() => setActiveTab('new')}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
									activeTab === 'new'
										? 'bg-[#007AFF] text-white'
										: 'text-[#8E8E93] hover:text-[#007AFF]'
								}`}
							>
								Nueva Cotización
							</button>
							<button
								onClick={() => setActiveTab('history')}
								className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
									activeTab === 'history'
										? 'bg-[#007AFF] text-white'
										: 'text-[#8E8E93] hover:text-[#007AFF]'
								}`}
							>
								Historial
							</button>
						</nav>
					</div>
				</div>
			</header>

			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{activeTab === 'new' ? (
					<div className="bg-white dark:bg-[#2C2C2E] rounded-2xl shadow p-6">
						<h2 className="text-lg font-semibold text-[#1C1C1E] dark:text-white mb-6">
							Nueva Cotización
						</h2>
						{/* Add your quote form here */}
						<p className="text-[#8E8E93]">Formulario de cotización en desarrollo...</p>
					</div>
				) : (
					<div className="bg-white dark:bg-[#2C2C2E] rounded-2xl shadow p-6">
						<h2 className="text-lg font-semibold text-[#1C1C1E] dark:text-white mb-6">
							Historial de Cotizaciones
						</h2>
						{/* Add your quotes history here */}
						<p className="text-[#8E8E93]">Historial de cotizaciones en desarrollo...</p>
					</div>
				)}
			</main>
		</div>
	);
}