'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  AtSign,
  BookOpen,
  CheckCircle2,
  Github,
  Instagram,
  Linkedin,
  Mail,
  RotateCcw,
  Users,
} from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzvpa0kUiO5HW-BV-vOCh8ZDeTmIHH2IN8QRYfHQAyc2TqfDluTrvZIXrJUKzVa9hzT6Q/exec';

const UNLOCKED_KEY = 'rel_club_fair_unlocked';

const links = [
  {
    title: 'Explore our research',
    description: 'See current and completed public-policy projects.',
    href: '/projects',
    icon: BookOpen,
    external: false,
  },
  {
    title: 'Student applications',
    description: 'Check the current application status and requirements.',
    href: '/apply',
    icon: Users,
    external: false,
  },
  {
    title: 'Meet the team',
    description: 'Get to know REL researchers and project leads.',
    href: '/people',
    icon: Users,
    external: false,
  },
  {
    title: 'REL on GitHub',
    description: 'Browse our public code and open research repositories.',
    href: 'https://github.com/Rutgers-Economics-Labs',
    icon: Github,
    external: true,
  },
];

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/rutgers-economics-labs',
    icon: Linkedin,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/rutgers.economics.labs',
    icon: Instagram,
  },
  {
    label: 'Email',
    href: 'mailto:rel@rutgerseconomics.org',
    icon: Mail,
  },
];

function normalizeNetId(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/@(scarletmail\.)?rutgers\.edu$/, '');
}

function isValidNetId(value: string) {
  return /^[a-z0-9]{2,20}$/.test(value) && /[a-z]/.test(value);
}

export default function ClubFairSignup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [netId, setNetId] = useState('');
  const [company, setCompany] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('reset')) {
      window.localStorage.removeItem(UNLOCKED_KEY);
      return;
    }

    setUnlocked(window.localStorage.getItem(UNLOCKED_KEY) === '1');
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (company.trim()) {
      setUnlocked(true);
      return;
    }

    const normalizedNetId = normalizeNetId(netId);
    if (!firstName.trim() || !lastName.trim()) {
      setError('Please enter your first and last name.');
      return;
    }
    if (!isValidNetId(normalizedNetId)) {
      setError('Enter a valid Rutgers NetID, such as abc123.');
      return;
    }

    setSubmitting(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        redirect: 'follow',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: `${normalizedNetId}@scarletmail.rutgers.edu`,
          source: 'REL club fair page',
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Signup endpoint returned ${response.status}`);
      }

      const result = (await response.json()) as { status?: string; message?: string };
      const alreadySubscribed = result.message?.toLowerCase().includes('already exists');
      if (result.status !== 'success' && !alreadySubscribed) {
        throw new Error(result.message || 'The signup could not be saved.');
      }

      window.localStorage.setItem(UNLOCKED_KEY, '1');
      setUnlocked(true);
    } catch (submissionError) {
      console.error('Club fair signup failed:', submissionError);
      setError('We could not save your signup. Please try again, or email rel@rutgerseconomics.org.');
    } finally {
      window.clearTimeout(timeout);
      setSubmitting(false);
    }
  }

  function resetSignup() {
    window.localStorage.removeItem(UNLOCKED_KEY);
    setFirstName('');
    setLastName('');
    setNetId('');
    setError('');
    setUnlocked(false);
  }

  return (
    <div className="relative overflow-hidden bg-[var(--bg-primary)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.18),transparent_68%)]" />

      <section className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 h-20 w-20 overflow-hidden rounded-2xl border border-black/5 bg-[#e5e5e7] shadow-lg shadow-red-600/15">
            <Image
              src="/images/REL Logo.JPEG"
              alt="Rutgers Economics Labs logo"
              width={80}
              height={80}
              priority
              className="h-full w-full object-cover"
            />
          </div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-red-600">
            Rutgers Economics Labs
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl">
            Turn data into public impact.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
            Join a student-led research community using economics, data, and policy analysis to solve real problems for public-sector partners.
          </p>
        </div>

        {!unlocked ? (
          <div className="mx-auto max-w-2xl rounded-3xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-xl shadow-black/5 sm:p-9">
            <div className="mb-7">
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">Stay in the loop</h2>
              <p className="mt-2 text-[var(--text-secondary)]">
                Add your Rutgers email to get application openings, events, and research opportunities—then unlock all of our links.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[var(--text-secondary)]" htmlFor="club-first-name">
                    First name
                  </label>
                  <input
                    id="club-first-name"
                    type="text"
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    disabled={submitting}
                    required
                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/15 disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[var(--text-secondary)]" htmlFor="club-last-name">
                    Last name
                  </label>
                  <input
                    id="club-last-name"
                    type="text"
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    disabled={submitting}
                    required
                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-3 text-[var(--text-primary)] outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/15 disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--text-secondary)]" htmlFor="club-netid">
                  Rutgers NetID
                </label>
                <div className="relative">
                  <AtSign className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-[var(--text-muted)]" aria-hidden="true" />
                  <input
                    id="club-netid"
                    type="text"
                    autoComplete="username"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    placeholder="abc123"
                    value={netId}
                    onChange={(event) => setNetId(event.target.value)}
                    disabled={submitting}
                    aria-describedby="club-netid-hint"
                    required
                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] py-3 pl-12 pr-4 text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-muted)] focus:border-red-500 focus:ring-4 focus:ring-red-500/15 disabled:opacity-60"
                  />
                </div>
                <p id="club-netid-hint" className="mt-2 text-sm text-[var(--text-muted)]">
                  We&apos;ll use <span className="font-medium">your-netid@scarletmail.rutgers.edu</span>. No password needed.
                </p>
              </div>

              <div className="absolute left-[-10000px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="club-company">Company</label>
                <input
                  id="club-company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={company}
                  onChange={(event) => setCompany(event.target.value)}
                />
              </div>

              {error && (
                <p className="rounded-xl bg-red-600/10 px-4 py-3 text-sm font-medium text-red-600" role="alert" aria-live="assertive">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/30 disabled:cursor-wait disabled:opacity-60"
              >
                {submitting ? 'Saving your spot…' : 'Join and see REL links'}
                {!submitting && <ArrowRight className="h-5 w-5" aria-hidden="true" />}
              </button>

              <p className="text-center text-xs leading-5 text-[var(--text-muted)]">
                We use this information only for REL updates and opportunities. You can unsubscribe at any time.
              </p>
            </form>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl" aria-live="polite">
            <div className="mb-6 rounded-2xl border border-green-600/20 bg-green-600/10 p-5 text-center">
              <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-green-600" aria-hidden="true" />
              <h2 className="text-xl font-bold text-[var(--text-primary)]">You&apos;re connected with REL.</h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">Here&apos;s everything you need to explore and get involved.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {links.map((item) => {
                const Icon = item.icon;
                const cardClass =
                  'group flex min-h-40 flex-col justify-between rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 shadow-sm transition hover:-translate-y-1 hover:border-red-600/30 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-500/20';
                const content = (
                  <>
                    <div className="flex items-start justify-between gap-4">
                      <span className="rounded-xl bg-red-600/10 p-3 text-red-600">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <ArrowRight className="h-5 w-5 text-[var(--text-muted)] transition group-hover:translate-x-1 group-hover:text-red-600" aria-hidden="true" />
                    </div>
                    <div className="mt-5">
                      <h3 className="font-bold text-[var(--text-primary)]">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{item.description}</p>
                    </div>
                  </>
                );

                return item.external ? (
                  <a key={item.href} className={cardClass} href={item.href} target="_blank" rel="noopener noreferrer">
                    {content}
                  </a>
                ) : (
                  <Link key={item.href} className={cardClass} href={item.href}>
                    {content}
                  </Link>
                );
              })}
            </div>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    className="flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] transition hover:border-red-600/30 hover:text-red-600 focus:outline-none focus:ring-4 focus:ring-red-500/20"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {item.label}
                  </a>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={resetSignup}
                className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] underline-offset-4 hover:text-red-600 hover:underline"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Reset this device
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
