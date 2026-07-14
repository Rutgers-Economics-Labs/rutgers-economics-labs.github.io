'use client';

import React, { useState } from 'react';

const strengths = [
  ['Quantitative curiosity', 'Comfort engaging with numbers, data, and evidence is a useful foundation for REL work.'],
  ['Data and technical tools', 'Python, R, Stata, SQL, spreadsheet skills, or a willingness to develop them can be relevant to a project.'],
  ['Research and writing', 'Students help turn research questions into literature reviews, analysis, and clear written interpretation.'],
  ['Collaborative problem-solving', 'REL projects connect students with public-interest organizations, so communication and teamwork matter alongside technical work.'],
];

const faqs = [
  ['When are applications open?', 'REL shares application availability and any current details through its mailing list. Subscribe below so you do not need to guess at timing.'],
  ['Do I need a specific major?', 'REL’s work brings together economics, data, policy, and technical research. Current application materials will explain any requirements when an opportunity is posted.'],
  ['What could I produce?', 'Existing REL work includes research papers with literature review, statistical analysis, and interpretation, as well as data work and policy-focused communication.'],
  ['Will every project be public?', 'No. REL project pages clearly label public, private, internal, and withheld work. A public artifact is shared only when one is available.'],
];

const applicationContext = [
  ['Relevant preparation', 'A current application may ask about coursework, tools, research, data projects, or other experience that shows how you approach evidence.'],
  ['Your interests', 'It helps to explain the kinds of economic, data, or public-policy questions you are curious to investigate.'],
  ['Next steps', 'REL shares any current application instructions and follow-up process directly, so the posted materials remain the source of truth.'],
];

export default function ApplyPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const googleAppsScriptUrl = 'https://script.google.com/macros/s/AKfycbzvpa0kUiO5HW-BV-vOCh8ZDeTmIHH2IN8QRYfHQAyc2TqfDluTrvZIXrJUKzVa9hzT6Q/exec';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firstName || !lastName || !email) {
      setIsError(true);
      setSubmitMessage('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    setIsError(false);
    setSubmitMessage('');
    try {
      await fetch(googleAppsScriptUrl, {
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ firstName, lastName, email }),
      });
      setFirstName('');
      setLastName('');
      setEmail('');
      setSubmitMessage('Thanks — you have been added to the REL mailing list.');
    } catch {
      setIsError(true);
      setSubmitMessage('We could not submit your request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="py-16 sm:py-20 bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-14 items-start">
          <header className="max-w-3xl">
            <p className="text-red-700 font-semibold uppercase tracking-[0.18em] text-sm mb-4">For Rutgers students</p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-5">Build research skills on questions that matter.</h1>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed max-w-2xl">REL gives students a way to contribute to applied economic research for government agencies, think tanks, and public policy organizations — while learning how evidence becomes useful analysis.</p>
          </header>
          <aside className="rounded-2xl border border-red-100 bg-red-50 p-7 sm:p-8 shadow-sm">
            <p className="text-red-700 font-semibold uppercase tracking-wider text-sm mb-4">Stay in the loop</p>
            <h2 className="text-2xl font-bold text-gray-950 mb-3">Application timing is shared directly.</h2>
            <p className="text-gray-700 leading-relaxed mb-5">REL posts current application information through its mailing list. Use the form below to hear about future openings, events, and updates.</p>
            <a href="#mailing-list" className="inline-flex rounded-full bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 transition-colors">Join the mailing list <span aria-hidden="true" className="ml-2">↓</span></a>
          </aside>
        </div>
      </section>

      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-red-700 font-semibold uppercase tracking-wider text-sm mb-3">What students contribute</p>
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-5">Research, data work, and practical communication.</h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">REL’s existing projects show the range of work students can encounter: defining a research question, working with data, applying statistical or econometric methods, and explaining the results in a useful form.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {strengths.map(([title, description]) => <article key={title} className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-7 shadow-sm"><h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{title}</h3><p className="text-[var(--text-secondary)] leading-relaxed">{description}</p></article>)}
          </div>
        </div>
      </section>

      <section className="py-20 bg-red-50 border-y border-red-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-red-700 font-semibold uppercase tracking-wider text-sm mb-3">How to prepare</p>
            <h2 className="text-4xl font-bold text-gray-950 mb-5">Focus on the work, not an assumed deadline.</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">Application details can change, so REL shares any current timing and selection information with applicants directly. In the meantime, you can explore the project portfolio, build familiarity with the tools that interest you, and join the mailing list.</p>
            <a href="/projects" className="inline-flex items-center rounded-full bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 transition-colors">Explore REL projects <span aria-hidden="true" className="ml-2">→</span></a>
          </div>
          <div className="rounded-2xl bg-white border border-red-100 p-7 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-950 mb-5">Frequently asked questions</h2>
            <dl className="space-y-5">
              {faqs.map(([question, answer]) => <div key={question}><dt className="font-bold text-gray-950">{question}</dt><dd className="mt-1 text-gray-700 leading-relaxed">{answer}</dd></div>)}
            </dl>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-start">
          <div>
            <p className="text-red-700 font-semibold uppercase tracking-wider text-sm mb-3">Application context</p>
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-5">What a current application can help you communicate.</h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">You do not need to infer requirements from an old date or a generic checklist. When an opportunity is posted, use its instructions and describe the preparation that is most relevant to the work.</p>
          </div>
          <div className="grid gap-4">
            {applicationContext.map(([title, description]) => <article key={title} className="rounded-2xl border border-[var(--card-border)] bg-[var(--bg-primary)] p-6"><h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{title}</h3><p className="text-[var(--text-secondary)] leading-relaxed">{description}</p></article>)}
          </div>
        </div>
      </section>

      <section id="mailing-list" className="py-20 bg-[var(--bg-primary)] border-t border-[var(--border-color)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">
          <div>
            <p className="text-red-700 font-semibold uppercase tracking-wider text-sm mb-3">Mailing list</p>
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-5">Hear when there is something to act on.</h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">Subscribe for application openings, events, and REL news. You can unsubscribe at any time.</p>
          </div>
          <div className="bg-[var(--bg-tertiary)] p-7 sm:p-8 rounded-2xl border border-[var(--card-border)]">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><label htmlFor="firstName" className="block text-sm font-bold text-[var(--text-secondary)] mb-2">First name <span aria-hidden="true">*</span></label><input id="firstName" type="text" autoComplete="given-name" required value={firstName} onChange={(event) => setFirstName(event.target.value)} className="w-full px-4 py-3 border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-lg focus:ring-2 focus:ring-red-500" disabled={isSubmitting} /></div>
                <div><label htmlFor="lastName" className="block text-sm font-bold text-[var(--text-secondary)] mb-2">Last name <span aria-hidden="true">*</span></label><input id="lastName" type="text" autoComplete="family-name" required value={lastName} onChange={(event) => setLastName(event.target.value)} className="w-full px-4 py-3 border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-lg focus:ring-2 focus:ring-red-500" disabled={isSubmitting} /></div>
              </div>
              <div><label htmlFor="email" className="block text-sm font-bold text-[var(--text-secondary)] mb-2">Email <span aria-hidden="true">*</span></label><input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full px-4 py-3 border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-lg focus:ring-2 focus:ring-red-500" disabled={isSubmitting} /></div>
              <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-40 disabled:cursor-not-allowed" disabled={isSubmitting}>{isSubmitting ? 'Submitting…' : 'Subscribe for REL updates'}</button>
              {submitMessage && <p role="status" aria-live="polite" className={`text-center font-medium ${isError ? 'text-red-700' : 'text-green-700'}`}>{submitMessage}</p>}
            </form>
            <p className="mt-6 text-center text-[var(--text-muted)] text-sm">Need to unsubscribe? <a href="/unsubscribe" className="text-red-700 hover:text-red-800 font-semibold underline">Manage your subscription</a>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
