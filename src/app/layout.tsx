import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import type { ReactNode } from 'react';

// import font awesome
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

// Google tag (gtag.js)
// <script async src="https://www.googletagmanager.com/gtag/js?id=G-VNVTNP4NMX"></script>

import Script from 'next/script';


export const metadata = {
  title: "Rutgers Economics Labs",
  description: "Student-driven economic research for government agencies, think tanks, and public policy organizations at Rutgers University",
  keywords: ["Rutgers University", "Economics", "Research", "Public Policy", "Data Analysis", "Government", "Think Tank"],
  authors: [{ name: "Rutgers Economics Labs" }],
  creator: "Rutgers Economics Labs",
  publisher: "Rutgers Economics Labs",
  metadataBase: new URL('https://www.rutgerseconomics.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Rutgers Economics Labs",
    description: "Student-driven economic research for government agencies, think tanks, and public policy organizations at Rutgers University",
    url: "https://www.rutgerseconomics.org",
    siteName: "Rutgers Economics Labs",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rutgers Economics Labs Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rutgers Economics Labs",
    description: "Student-driven economic research for government agencies, think tanks, and public policy organizations at Rutgers University",
    images: ["/images/og-image.jpg"],
    creator: "@rutgerseconomics",
    site: "@rutgerseconomics",
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
    google: 'G-VNVTNP4NMX',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body className="bg-gray-50">
        <Header />
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
