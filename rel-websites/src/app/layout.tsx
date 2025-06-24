import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import type { ReactNode } from 'react';

// import font awesome
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

// Google tag (gtag.js)
// <script async src="https://www.googletagmanager.com/gtag/js?id=G-VNVTNP4NMX"></script>

import Script from 'next/script';
import Head from 'next/head';


export const metadata = {
  title: "Rutgers Economics Labs",
  description: "Rutgers Economics Labs",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />

        
      </Head>
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
