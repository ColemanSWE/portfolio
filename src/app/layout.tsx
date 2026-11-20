import type { Metadata, Viewport } from 'next';
import './globals.css';
import { generatePortfolioMetadata } from '../lib/portfolio-data';

export const revalidate = 86400;

export async function generateMetadata(): Promise<Metadata> {
  const { title, description, keywords } = generatePortfolioMetadata();

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title,
    description,
    keywords,
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
      apple: '/favicon.svg',
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_US',
      images: [{ url: '/textures/erosion-portrait.jpg', width: 1280, height: 720 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#1a1a1c',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/fonts/Corepix.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
