import { pageMetadata } from '@/lib/metadata';
import ClubFairSignup from './ClubFairSignup';

export const metadata = pageMetadata("Club Fair", "Meet Rutgers Economics Labs and join the mailing list for research opportunities.", "/club-fair");

export default function ClubFairPage() {
  return <ClubFairSignup />;
}
