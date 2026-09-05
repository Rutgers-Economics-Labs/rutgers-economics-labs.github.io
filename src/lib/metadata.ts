import type { Metadata } from 'next';

export const siteUrl = 'https://www.rutgerseconomics.org';
export const siteDescription = 'Student-driven economic research for government agencies, faculty, and public policy organizations at Rutgers University.';

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = title === 'Rutgers Economics Labs' ? title : `${title} | Rutgers Economics Labs`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle, description, url: `${siteUrl}${path}`, siteName: 'Rutgers Economics Labs',
      type: 'website', locale: 'en_US',
      images: [{ url: '/images/og-image.jpg', width: 500, height: 500, alt: 'Rutgers Economics Labs (REL)' }],
    },
    twitter: { card: 'summary', title: fullTitle, description, images: ['/images/og-image.jpg'] },
  };
}
