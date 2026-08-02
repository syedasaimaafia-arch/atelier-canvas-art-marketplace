import './globals.css';
import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'ATELIER CANVAS | Elite Fine Art & Painting Marketplace',
  description: 'Discover and collect museum-grade oil and acrylic paintings. Powered by Next.js, FastAPI art valuation, Supabase, and Google OAuth.',
  keywords: ['fine art', 'paintings', 'oil painting', 'acrylic art', 'abstract canvas', 'art marketplace', 'buy paintings'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#07080b] text-slate-100 antialiased selection:bg-[#d4af37] selection:text-black">
        <Providers>
          <div className="flex min-h-screen flex-col justify-between">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
