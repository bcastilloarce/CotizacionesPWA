import DashboardLayout from '@/app/dashboard/components/DashboardLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
	return <DashboardLayout>{children}</DashboardLayout>;
}
