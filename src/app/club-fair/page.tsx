import type { Metadata } from 'next';
import ClubFairSignup from './ClubFairSignup';

export const metadata: Metadata = {
  title: 'Club Fair | Rutgers Economics Labs',
  description:
    'Meet Rutgers Economics Labs, join the REL mailing list, and explore student-led economic research at Rutgers University.',
  alternates: {
    canonical: '/club-fair',
  },
  openGraph: {
    title: 'Meet Rutgers Economics Labs',
    description:
      'Join the REL mailing list and find research projects, applications, and ways to connect.',
    url: 'https://www.rutgerseconomics.org/club-fair',
    siteName: 'Rutgers Economics Labs',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Rutgers Economics Labs',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function ClubFairPage() {
  return <ClubFairSignup />;
}
