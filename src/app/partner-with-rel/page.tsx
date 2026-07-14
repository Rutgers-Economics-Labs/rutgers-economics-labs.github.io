import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BarChart3, Database, FileText, LockKeyhole, Mail, MessagesSquare, SearchCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Partner With REL',
  description: 'Propose a public-interest economics or data project to Rutgers Economics Labs. Learn about REL capabilities, deliverables, and project process.',
  alternates: { canonical: '/partner-with-rel' },
  openGraph: {
    title: 'Partner With REL | Rutgers Economics Labs',
    description: 'Pro bono applied economics and data analysis for public-interest organizations.',
    url: '/partner-with-rel',
  },
};

const capabilities = [
  { icon: BarChart3, title: 'Applied economic analysis', description: 'Statistical modeling, causal inference, projections, and analysis designed around a partner’s policy or operational question.' },
  { icon: Database, title: 'Data research and engineering', description: 'Public-data discovery, collection, cleaning, and reusable data pipelines for policy research.' },
  { icon: SearchCheck, title: 'Technical research', description: 'Quantitative research using tools such as Python, R, Stata, and SQL, with a focus on transparent interpretation.' },
  { icon: FileText, title: 'Decision-ready communication', description: 'Research papers, analytical memos, code or data documentation, and clear explanations of methods and findings when appropriate.' },
];

const process = [
  ['Start with the question', 'Send a short description of the decision, policy issue, or research question you want to explore.'],
  ['Scope the work together', 'REL discusses the available context, feasible methods, likely inputs, and what a useful output could look like.'],
  ['Research and analysis', 'A student team carries out the agreed work, using public sources first whenever possible.'],
  ['Share the work', 'REL provides the agreed deliverables and honors the project’s stated public, private, or withheld status.'],
];

export default function PartnerWithRelPage() {
  return (
    <>
      <section className="py-16 sm:py-20 bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-start">
          <header className="max-w-3xl">
            <p className="text-red-700 font-semibold uppercase tracking-[0.18em] text-sm mb-4">For public-interest organizations</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-5">Partner with REL on an economics or data question.</h1>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">Rutgers Economics Labs provides pro bono applied economics and data analysis for government agencies, think tanks, and public policy organizations. We pair rigorous student research with questions that matter outside the classroom.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="mailto:rel@rutgerseconomics.org?subject=REL%20project%20proposal" className="inline-flex justify-center items-center rounded-full bg-red-600 px-7 py-3.5 font-semibold text-white hover:bg-red-700 transition-colors shadow-lg"><Mail className="mr-2 h-5 w-5" aria-hidden="true" />Propose a Project</a>
              <Link href="/projects" className="inline-flex justify-center items-center rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] px-7 py-3.5 font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-colors">Explore project work <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" /></Link>
            </div>
          </header>
          <aside className="rounded-2xl border border-red-100 bg-red-50 p-7 sm:p-8 shadow-sm">
            <p className="text-red-700 font-semibold text-sm uppercase tracking-wider mb-4">A low-friction first step</p>
            <h2 className="text-2xl font-bold text-gray-950 mb-3">A few lines are enough to begin.</h2>
            <p className="text-gray-700 leading-relaxed mb-5">Tell us the question you are considering, the audience for the work, and whether you expect to use public or non-public data. We can take it from there.</p>
            <a className="text-red-700 font-semibold underline underline-offset-4 hover:text-red-800 focus-visible:outline-red-700" href="mailto:rel@rutgerseconomics.org?subject=REL%20project%20proposal">rel@rutgerseconomics.org</a>
          </aside>
        </div>
      </section>

      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-red-700 font-semibold uppercase tracking-wider text-sm mb-3">What we do</p>
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-5">A practical research partner for public-interest work.</h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">REL is a student-led, data-driven research organization at Rutgers University. Our existing portfolio includes work on labor-force projections, municipal bonds, electricity markets, housing demand, reentry employment, agricultural markets, and program evaluation.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {capabilities.map(({ icon: Icon, title, description }) => (
              <article key={title} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-7 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-red-600/10 text-red-700 flex items-center justify-center mb-5"><Icon className="h-6 w-6" aria-hidden="true" /></div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-red-50 border-y border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-red-700 font-semibold uppercase tracking-wider text-sm mb-3">How an engagement can work</p>
            <h2 className="text-4xl font-bold text-gray-950 mb-8">From question to useful research.</h2>
            <ol className="space-y-5">
              {process.map(([title, description], index) => (
                <li key={title} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-600 text-white font-bold">{index + 1}</span>
                  <div><h3 className="font-bold text-gray-950 text-lg">{title}</h3><p className="text-gray-700 leading-relaxed">{description}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <div className="space-y-6">
            <article className="rounded-2xl bg-white p-7 shadow-sm border border-red-100">
              <Database className="h-7 w-7 text-red-700 mb-4" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-950 mb-3">Public data first</h2>
              <p className="text-gray-700 leading-relaxed">REL typically begins with public data and public documentation. This can make a project easier to understand, reproduce, and share when a partner wants a public artifact.</p>
            </article>
            <article className="rounded-2xl bg-white p-7 shadow-sm border border-red-100">
              <LockKeyhole className="h-7 w-7 text-red-700 mb-4" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-950 mb-3">When data is not public</h2>
              <p className="text-gray-700 leading-relaxed">If a project requires non-public inputs, tell us early. REL can discuss whether a secure, de-identified-data approach is appropriate for the project and preserve the agreed confidentiality label for its outputs.</p>
            </article>
            <article className="rounded-2xl bg-white p-7 shadow-sm border border-red-100">
              <MessagesSquare className="h-7 w-7 text-red-700 mb-4" aria-hidden="true" />
              <h2 className="text-2xl font-bold text-gray-950 mb-3">Typical outputs</h2>
              <p className="text-gray-700 leading-relaxed">The right deliverable depends on the question. REL&apos;s project pages document research papers, analytical projections, program evaluations, and public artifacts where one is available.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-700 font-semibold uppercase tracking-wider text-sm mb-3">Start a conversation</p>
          <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-5">Have a question worth investigating?</h2>
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">Email REL with a short project idea. There is no lengthy intake form required to start the conversation.</p>
          <a href="mailto:rel@rutgerseconomics.org?subject=REL%20project%20proposal" className="inline-flex items-center rounded-full bg-red-600 px-8 py-4 text-lg font-semibold text-white hover:bg-red-700 transition-colors shadow-lg"><Mail className="mr-2 h-5 w-5" aria-hidden="true" />Email REL about a project</a>
        </div>
      </section>
    </>
  );
}
