import Header from './Header';
import Footer from './Footer';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Main content with padding for header and footer */}
      <main className="pb-[calc(49px+env(safe-area-inset-bottom))] pt-[44px]">
        {children}
      </main>

      <Footer />
    </div>
  );
}