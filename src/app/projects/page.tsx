import { pageMetadata } from '@/lib/metadata';
import projects from '@/data/projects.json';
import { memberAnchor } from '@/lib/project-team';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = pageMetadata('Research projects', 'Explore REL working groups in conservation finance, coastal construction, program evaluation, and oral history, alongside past economic research.', '/projects');

type Project = (typeof projects)[number];

function ProjectCard({ project }: { project: Project }) {
  return (
    <article id={project.id} className="bg-[var(--card-bg)] border border-[var(--card-border)] card-hover p-6 sm:p-8 rounded-2xl scroll-mt-24">
      <div className="flex flex-col lg:flex-row items-start gap-5 lg:gap-6">
        <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
          {project.logo ? (
            <Image src={project.logo} alt={project.logoAlt} width={64} height={64} className="max-h-16 w-auto object-contain" />
          ) : (
            <span aria-hidden="true" className="flex h-16 w-16 items-center justify-center rounded-xl bg-red-600/10 text-red-600 text-sm font-bold">{project.abbreviation}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">{project.title}</h3>
          <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {project.tags.map((tag) => (
              <span key={tag.label} className={`px-3 py-1 rounded-full text-sm font-medium ${
                tag.color === 'green' ? 'bg-green-600/20 text-green-500' :
                tag.color === 'blue' ? 'bg-blue-600/20 text-blue-500' :
                tag.color === 'yellow' ? 'bg-yellow-600/20 text-[var(--text-primary)]' :
                'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'
              }`}>{tag.label}</span>
            ))}
          </div>
          {project.statusNote && <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">{project.statusNote}</p>}
          {project.members && (
            <div className="border-t border-[var(--card-border)] pt-4">
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Working group</h4>
              <ul className="flex flex-wrap gap-2" aria-label={`${project.abbreviation} working group`}>
                {project.members.map((name) => (
                  <li key={name}>
                    <Link href={`/people#${memberAnchor(name)}`} className="inline-block rounded-lg border border-[var(--card-border)] px-3 py-2 text-sm text-[var(--text-primary)] hover:text-red-600 focus-visible:outline-2 focus-visible:outline-red-600">
                      {name}{project.lead === name ? ' · Team lead' : ''}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {project.isPublic && project.pdfLink && (
            <a href={project.pdfLink} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">View Paper (PDF)</a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsPage() {
  return (
    <div className="py-20 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-6">Projects</h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto">Student research connecting economic questions, public data and community partners.</p>
        </div>
        <section aria-labelledby="current-projects" className="mb-16">
          <h2 id="current-projects" className="text-2xl font-bold text-[var(--text-primary)] mb-3">Fall 2026 working groups</h2>
          <p className="text-[var(--text-secondary)] mb-8 max-w-3xl">Meet this semester’s teams and the questions they are preparing to study. Each project’s status reflects its current scope and data arrangements.</p>
          <div className="space-y-8">{projects.filter((p) => p.current).map((p) => <ProjectCard key={p.id} project={p} />)}</div>
        </section>
        <section aria-labelledby="past-projects">
          <h2 id="past-projects" className="text-2xl font-bold text-[var(--text-primary)] mb-8">Past projects</h2>
          <div className="space-y-8">{projects.filter((p) => !p.current).map((p) => <ProjectCard key={p.title} project={p} />)}</div>
        </section>
      </div>
    </div>
  );
}
