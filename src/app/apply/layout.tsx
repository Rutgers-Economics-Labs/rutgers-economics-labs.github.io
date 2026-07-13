import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Join REL',
  description: 'Learn about the Rutgers Economics Labs student experience, skills, research work, and mailing list for application updates.',
  alternates: { canonical: '/apply' },
  openGraph: {
    title: 'Join REL | Rutgers Economics Labs',
    description: 'A student pathway into applied economics and data research for public-interest organizations.',
    url: '/apply',
  },
};

export default function ApplyLayout({ children }: { children: ReactNode }) {
  return children;
}
