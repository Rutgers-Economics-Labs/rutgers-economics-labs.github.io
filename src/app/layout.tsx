import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import type { ReactNode } from 'react';

// import font awesome
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

// Google tag (gtag.js)
// <script async src="https://www.googletagmanager.com/gtag/js?id=G-VNVTNP4NMX"></script>

import Script from 'next/script';
import { pageMetadata, siteUrl, siteDescription } from '@/lib/metadata';


export const metadata = {
  ...pageMetadata('Rutgers Economics Labs', siteDescription, '/'),
  metadataBase: new URL(siteUrl),
  authors: [{ name: 'Rutgers Economics Labs' }],
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const, 'max-snippet': -1 } },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="color-scheme" content="light dark" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body className="bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
        <Header />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org', '@graph': [
            { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'Rutgers Economics Labs', alternateName: 'REL', url: siteUrl, logo: `${siteUrl}/images/og-image.jpg`, description: siteDescription, email: 'rel@rutgerseconomics.org', sameAs: ['https://github.com/Rutgers-Economics-Labs', 'https://www.linkedin.com/company/rutgers-economics-labs', 'https://www.instagram.com/rutgers.economics.labs'] },
            { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: siteUrl, name: 'Rutgers Economics Labs', publisher: { '@id': `${siteUrl}/#organization` } },
          ],
        }).replace(/</g, '\\u003c') }} />
        <main>{children}</main>
        <Footer />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-VNVTNP4NMX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VNVTNP4NMX');
          `}
        </Script>
      </body>
    </html>
  );
}
