import type { Metadata } from 'next';
import ScarletCheckIn from './ScarletCheckIn';

export const metadata: Metadata = {
  title: 'Scarlet Check-In | Rutgers Economics Labs',
  description: 'Private, offline-first event check-in for Rutgers Economics Labs.',
  alternates: { canonical: '/check-in' },
  manifest: '/check-in-manifest.webmanifest',
  robots: { index: false, follow: false },
};

export default function CheckInPage() {
  return <ScarletCheckIn />;
}
