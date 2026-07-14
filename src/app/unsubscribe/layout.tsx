import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Unsubscribe',
  description: 'Manage your Rutgers Economics Labs mailing list subscription.',
  alternates: { canonical: '/unsubscribe' },
};

export default function UnsubscribeLayout({ children }: { children: ReactNode }) {
  return children;
}
