'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
	const pathname = usePathname();

	const navigation = [
		{ name: 'Nueva Cotización', href: '/dashboard/nueva-cotizacion' },
		{ name: 'Historial', href: '/dashboard/historial' },
	];

	return (
		<div className="min-h-screen bg-gray-100">
			<nav className="bg-white shadow-sm">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between h-16">
						<div className="flex">
							<div className="flex-shrink-0 flex items-center">
								<Link href="/dashboard" className="text-xl font-bold text-gray-800">
									Cotizaciones
								</Link>
							</div>
							<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
								{navigation.map((item) => (
									<Link
										key={item.name}
										href={item.href}
										className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
											pathname === item.href
												? 'border-blue-500 text-gray-900'
												: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
										}`}
									>
										{item.name}
									</Link>
								))}
							</div>
						</div>
						<div className="flex items-center">
							<button
								onClick={() => signOut()}
								className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
							>
								Cerrar Sesión
							</button>
						</div>
					</div>
				</div>
			</nav>

			<main className="py-10">
				<div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
					{children}
				</div>
			</main>
		</div>
	);
}