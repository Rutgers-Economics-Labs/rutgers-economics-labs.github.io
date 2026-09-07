import Image from "next/image";
import memberOutcomes from "@/data/member-outcomes.json";

export default function MemberOutcomes() {
  return (
    <section className="bg-[var(--bg-primary)] py-20" aria-labelledby="member-outcomes-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-red-600">Member &amp; Alumni Experience</p>
          <h3 id="member-outcomes-heading" className="text-4xl font-bold text-[var(--text-primary)]">
            Where our members have worked and researched
          </h3>
          <p className="mt-5 text-lg text-[var(--text-secondary)]">
            Experience across technology, finance, public policy, research, and engineering.
          </p>
        </div>

        <div className="member-outcomes-grid grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {memberOutcomes.map((outcome, index) => (
            <figure
              data-reveal
              style={{ transitionDelay: `${index % 6 * 60}ms` }}
              key={outcome.organization}
              tabIndex={0}
              aria-label={outcome.organization}
              title={outcome.organization}
              className="member-outcome-logo group relative flex min-h-32 items-center justify-center rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-5 transition-all duration-200 hover:-translate-y-1 hover:border-red-500/40 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:border-red-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/60"
            >
              <Image
                src={outcome.logo}
                alt={`${outcome.organization} logo`}
                title={outcome.organization}
                width={180}
                height={80}
                className="member-outcome-image max-h-16 w-auto max-w-full object-contain transition duration-200"
              />
            </figure>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-relaxed text-[var(--text-muted)]">
          Organizations shown reflect publicly documented professional or research experience of REL members and alumni. They do not imply sponsorship of or partnership with REL.
        </p>
      </div>
    </section>
  );
}
