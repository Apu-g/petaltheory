import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'Petal Theory — Handmade Flower Bouquets & Keychains',
  description:
    'Discover exquisite handmade flower bouquets and keychains crafted with love. Premium quality, everlasting beauty — perfect for gifting. Shop now via WhatsApp.',
  keywords: [
    'handmade flowers',
    'flower bouquets',
    'handcrafted keychains',
    'petal theory',
    'gift ideas',
    'artificial flowers',
    'premium bouquets',
  ],
  openGraph: {
    title: 'Petal Theory — Where Flowers Bloom, Art Lives',
    description:
      'Handmade flower bouquets & keychains. Premium quality, everlasting beauty.',
    type: 'website',
    locale: 'en_IN',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} scroll-smooth`}
    >
      <head>
        <meta name="theme-color" content="#FAF5EE" />
        <link rel="icon" href="/images/logo.jpg" />
      </head>
      <body className="min-h-screen bg-cream text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
