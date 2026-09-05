import type { ReactNode } from 'react';
import { pageMetadata } from '@/lib/metadata';
export const metadata = {
  ...pageMetadata('Unsubscribe', 'Manage your Rutgers Economics Labs mailing list subscription.', '/unsubscribe'),
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
};
export default function UnsubscribeLayout({ children }: { children: ReactNode }) { return children; }
