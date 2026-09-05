import Link from 'next/link';
import type { ReactNode } from 'react';
import { siteUrl } from '@/lib/metadata';

export default function ResearchPage({ title, eyebrow, intro, path, children }: {
  title: string; eyebrow: string; intro: string; path: string; children: ReactNode;
}) {
  const schema = {
    '@context': 'https://schema.org', '@type': 'WebPage',
    '@id': `${siteUrl}${path}#page`, url: `${siteUrl}${path}`, name: title, description: intro,
    isPartOf: { '@id': `${siteUrl}/#website` }, about: { '@id': `${siteUrl}/#organization` },
    breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: title, item: `${siteUrl}${path}` },
    ] },
  };
  return <article className="research-page">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <header className="research-hero">
      <div className="research-width">
        <nav aria-label="Breadcrumb" className="research-breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span>{title}</span></nav>
        <p className="research-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="research-intro">{intro}</p>
      </div>
    </header>
    <div className="research-width research-body">{children}</div>
  </article>;
}
