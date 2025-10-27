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
  title: {
    default: '361Degustation - Premium Sushi & Japanese Cuisine | Order Online',
    template: '%s | 361Degustation'
  },
  description: 'Experience the art of sushi perfection at 361Degustation. Order online for delivery or pickup. Fresh, authentic Japanese cuisine crafted with precision by award-winning chefs. Serving San Francisco with the finest sushi, sashimi, and rolls.',
  keywords: ['sushi delivery', 'japanese food', 'online ordering', 'sushi near me', 'premium sushi', '361Degustation', 'authentic japanese cuisine', 'sashimi', 'nigiri', 'maki rolls', 'san francisco sushi', 'chef special', 'omakase', 'vegetarian sushi'],
  authors: [{ name: '361Degustation', url: 'https://361degustation.vercel.app' }],
  creator: '361Degustation',
  publisher: '361Degustation',
  metadataBase: new URL('https://361degustation.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: '361Degustation - Premium Sushi & Japanese Cuisine',
    description: 'Experience the art of sushi perfection. Order online for delivery or pickup. Fresh, authentic Japanese cuisine crafted with precision.',
    url: 'https://361degustation.vercel.app',
    siteName: '361Degustation',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: '361Degustation Premium Sushi'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '361Degustation - Premium Sushi Experience',
    description: 'Experience the art of sushi perfection. Order online now!',
    creator: '@361degustation',
    images: ['https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'restaurant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: '361Degustation',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&q=80',
    '@id': 'https://361degustation.vercel.app',
    url: 'https://361degustation.vercel.app',
    telephone: '+1-555-361-3610',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Sushi Street, Tokyo District',
      addressLocality: 'San Francisco',
      addressRegion: 'CA',
      postalCode: '94102',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.774929,
      longitude: -122.419418
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '11:00',
        closes: '22:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '12:00',
        closes: '23:00'
      }
    ],
    servesCuisine: 'Japanese',
    acceptsReservations: true,
    menu: 'https://361degustation.vercel.app/menu',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '287'
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
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

