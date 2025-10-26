import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Providers } from '@/components/Providers';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: '361Degustation - Premium Sushi Experience',
  description: 'Experience the art of sushi perfection at 361Degustation. Order online for delivery or pickup. Fresh, authentic Japanese cuisine crafted with precision.',
  keywords: 'sushi, japanese food, online ordering, sushi delivery, premium sushi, 361Degustation',
  authors: [{ name: '361Degustation' }],
  openGraph: {
    title: '361Degustation - Premium Sushi Experience',
    description: 'Experience the art of sushi perfection. Order online for delivery or pickup.',
    type: 'website',
    locale: 'en_US',
    siteName: '361Degustation',
  },
  twitter: {
    card: 'summary_large_image',
    title: '361Degustation - Premium Sushi Experience',
    description: 'Experience the art of sushi perfection',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Providers>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}

