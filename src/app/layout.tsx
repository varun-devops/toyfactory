import type { Metadata } from 'next';
import { Nunito, Baloo_2 } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import RecentPurchaseAlert from '@/components/RecentPurchaseAlert';
import OfferBanner from '@/components/OfferBanner';

const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito', display: 'swap' });
const baloo = Baloo_2({ subsets: ['latin'], variable: '--font-baloo', display: 'swap', weight: ['400', '600', '700', '800'] });

export const metadata: Metadata = {
  title: 'ToyFactory India — Toys for Kids, Adults & Wellness | Delhi, Mumbai, Bengaluru',
  description: "India's #1 toy store! Shop Hot Wheels, plush toys, dolls, STEM kits, ride-on cars, adult wellness. 80% OFF. Free delivery across Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Pune, Noida, Gurugram and all Indian cities.",
  keywords: 'toys india, buy toys online india, hot wheels india, plush toys india, toys delhi, toys mumbai, toys bangalore, toys hyderabad, toys chennai, toys pune, toys noida, toys gurugram, toys kolkata, kids toys online, ride on car, stem toys, adult wellness india, ncr toys, imported toys india',
  authors: [{ name: 'ToyFactory India' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://toyfactoryindia.com',
    siteName: 'ToyFactory India',
    title: 'ToyFactory India — Toys for All Ages | 80% OFF',
    description: "India's #1 toy store — Hot Wheels, plush, dolls, STEM, wellness. Shop with 80% discount. Pan-India delivery.",
    images: [{ url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80', width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${nunito.variable} ${baloo.variable}`}>
      <head>
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Pune" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'OnlineStore',
            name: 'ToyFactory India',
            url: 'https://toyfactoryindia.com',
            description: "India's #1 online toy store with 80% discounts.",
            address: {
              '@type': 'PostalAddress',
              streetAddress: '42, Sector 18, Atta Market',
              addressLocality: 'Noida',
              addressRegion: 'Uttar Pradesh',
              postalCode: '201301',
              addressCountry: 'IN',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+91-9310-123456',
              contactType: 'customer service',
            },
          }),
        }} />
      </head>
      <body className="font-nunito bg-white min-h-screen">
        <Toaster position="top-center" toastOptions={{ duration: 2500 }} />
        <OfferBanner />
        <Navbar />
        <RecentPurchaseAlert />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
