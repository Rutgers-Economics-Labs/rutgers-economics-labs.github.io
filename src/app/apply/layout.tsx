import type { ReactNode } from 'react';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata('Apply to REL', 'Check application availability and join the Rutgers Economics Labs mailing list for student research opportunities.', '/apply');
export default function ApplyLayout({ children }: { children: ReactNode }) { return children; }
