import type { Metadata } from 'next';
import Image from 'next/image';
import projects from '../../data/projects.json';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore Rutgers Economics Labs case studies in public policy, applied economics, data analysis, and research.',
  alternates: { canonical: '/projects' },
  openGraph: {
    title: 'Projects | Rutgers Economics Labs',
    description: 'REL project case studies, including public and confidential work statuses.',
    url: '/projects',
  },
};

type CaseStudy = {
  problem: string;
  data: string;
  methods: string;
  deliverable: string;
};

const caseStudies: Record<string, CaseStudy> = {
  'Rutgers Agentic Intelligence Lab': {
    problem: 'Create a reusable framework for complex economic datasets.',
    data: 'Economic data sources connected in an ontology-like format.',
    methods: 'Structured, reusable data-cleaning and analysis pipelines.',
    deliverable: 'An internal general-purpose framework for economic analysis.',
  },
  'New Jersey Department of Environmental Protection': {
    problem: 'Evaluate the relationship between climate risk, adaptation measures, and municipal borrowing costs in New Jersey.',
    data: 'NJ FloodMapper, FEMA CRS scores, NJ I-Bank funding data, and MSRB EMMA bond filings.',
    methods: 'Matched-pair econometric analysis and Difference-in-Differences models.',
    deliverable: 'Analysis of the SLR Penalty and Resilience Premium in municipal bond markets.',
  },
  'New Jersey Board of Public Utilities': {
    problem: 'Assess competitive dynamics in PJM wholesale electricity auction markets.',
    data: 'Independent Market Monitor annual reports and auction data.',
    methods: 'Analysis of market efficiency and price formation.',
    deliverable: 'Research to inform potential improvements to New Jersey energy procurement strategies.',
  },
  'Federal Department of Housing and Urban Development': {
    problem: 'Develop population projections and housing demand estimates for New Jersey and the tri-state area.',
    data: 'Migration patterns and demographic components for major metropolitan areas.',
    methods: 'Population and housing-demand projection analysis.',
    deliverable: 'Estimates looking three to five years ahead to support regional planning.',
  },
  'New Jersey Department of Labor': {
    problem: 'Develop population and labor-force projections for New Jersey and its counties from 2022–2050.',
    data: 'Long-term demographic trends, 2020 Decennial Census shifts, and COVID-19 impacts.',
    methods: 'Medium, high-growth, and low-growth projection scenarios.',
    deliverable: 'A reference framework for planning and policy.',
  },
  'Virginia Center for Public Policy': {
    problem: 'Examine post-incarceration employment and economic opportunity in Virginia.',
    data: 'Return regions, labor-market structures, second-chance opportunities, and vocational skills.',
    methods: 'Regional analysis and five-year employment trend projections.',
    deliverable: 'Analysis of barriers and workforce-development recommendations.',
  },
  'US Department of Agriculture': {
    problem: 'Identify potential anticompetitive practices in the meat industry.',
    data: 'Meat-industry price spreads.',
    methods: 'Time-series analysis.',
    deliverable: 'A completed public research paper.',
  },
  'New Jersey Department of Community Affairs': {
    problem: 'Evaluate the impact of the Zone Assistance Fund program on Urban Enterprise Zones in New Jersey.',
    data: 'Project data is not published with the withheld paper.',
    methods: 'Program evaluation.',
    deliverable: 'Paper withheld; project scope remains publicly described.',
  },
  'New Jersey Economic Development Authority': {
    problem: 'Evaluate the NJ ZIP program and model the price premium for medium- and heavy-duty electric vehicle sales.',
    data: 'NJ ZIP program and medium- and heavy-duty electric vehicle sales information.',
    methods: 'Program evaluation and price-premium modeling.',
    deliverable: 'Paper withheld; project scope remains publicly described.',
  },
};

function tagClass(color: string) {
  if (color === 'green') return 'bg-green-100 text-green-800 border-green-200';
  if (color === 'blue') return 'bg-blue-100 text-blue-800 border-blue-200';
  if (color === 'yellow') return 'bg-amber-100 text-amber-900 border-amber-200';
  return 'bg-gray-100 text-gray-700 border-gray-200';
}

export default function ProjectsPage() {
  return (
    <div className="py-16 sm:py-20 bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl mb-14 sm:mb-16">
          <p className="text-red-700 font-semibold uppercase tracking-wider text-sm mb-3">Research portfolio</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-5">Projects with a clear record of scope and status.</h1>
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed">Each case study distinguishes the partner question, data, methods, expected deliverable, and whether the project is public, private, internal, or withheld. REL does not publish private project outputs.</p>
        </header>

        <div className="space-y-8">
          {projects.map((project) => {
            const caseStudy = caseStudies[project.title];
            return (
              <article key={project.title} className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-3xl overflow-hidden shadow-sm" aria-labelledby={`${project.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-title`}>
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col md:flex-row gap-6 md:items-start">
                    <div className="w-20 h-20 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shrink-0 overflow-hidden p-2">
                      <Image src={project.logo} alt={project.logoAlt} width={64} height={64} className="max-h-full w-auto object-contain" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => <span key={tag.label} className={`px-3 py-1 rounded-full text-xs font-bold border ${tagClass(tag.color)}`}>{tag.label}</span>)}
                      </div>
                      <h2 id={`${project.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-title`} className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3">{project.title}</h2>
                      <p className="text-[var(--text-secondary)] leading-relaxed">{project.description}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mt-8">
                    <div className="rounded-xl bg-[var(--bg-tertiary)] p-5"><h3 className="text-sm font-bold uppercase tracking-wider text-red-700 mb-2">Partner question</h3><p className="text-[var(--text-secondary)] leading-relaxed">{caseStudy.problem}</p></div>
                    <div className="rounded-xl bg-[var(--bg-tertiary)] p-5"><h3 className="text-sm font-bold uppercase tracking-wider text-red-700 mb-2">Data</h3><p className="text-[var(--text-secondary)] leading-relaxed">{caseStudy.data}</p></div>
                    <div className="rounded-xl bg-[var(--bg-tertiary)] p-5"><h3 className="text-sm font-bold uppercase tracking-wider text-red-700 mb-2">Methods</h3><p className="text-[var(--text-secondary)] leading-relaxed">{caseStudy.methods}</p></div>
                    <div className="rounded-xl bg-[var(--bg-tertiary)] p-5"><h3 className="text-sm font-bold uppercase tracking-wider text-red-700 mb-2">Deliverable / status</h3><p className="text-[var(--text-secondary)] leading-relaxed">{caseStudy.deliverable}</p></div>
                  </div>

                  {project.isPublic && project.pdfLink && (
                    <div className="mt-7 flex flex-wrap items-center gap-4 rounded-xl bg-green-50 border border-green-100 px-5 py-4">
                      <p className="text-green-900 font-medium flex-1">This project has a public artifact available to read.</p>
                      <a href={project.pdfLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-lg bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800 transition-colors focus-visible:outline-green-950">Read the USDA paper (PDF) <span aria-hidden="true" className="ml-2">↗</span></a>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
