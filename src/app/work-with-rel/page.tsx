import Link from 'next/link';
import ResearchPage from '@/components/ResearchPage';
import { pageMetadata } from '@/lib/metadata';

const intro = 'Bring a meaningful economic or policy question. Work with a student research team to turn data into a transparent, useful analysis.';
export const metadata = pageMetadata('Work with REL', 'Partner with Rutgers Economics Labs on pro bono economic and policy research. Explore project fit, possible deliverables, and how to start a conversation.', '/work-with-rel');

export default function WorkWithRelPage() {
  return <ResearchPage title="Work with REL" eyebrow="For agencies, faculty & policy organizations" intro={intro} path="/work-with-rel">
    <section className="research-split">
      <div><h2>A research partnership, built around a real question.</h2><p>Rutgers Economics Labs (REL) is a student-driven technical research group at Rutgers University. We provide pro bono economic analysis for government agencies and public policy organizations, and welcome conversations with faculty about scoped empirical research.</p><p>Our projects connect student learning with a concrete research need. We agree on the question, available evidence, scope, and deliverables before a team begins.</p><a className="research-button" href="mailto:rel@rutgerseconomics.org?subject=Research%20partnership%20with%20REL">Discuss a research question <span aria-hidden="true">↗</span></a></div>
      <aside className="research-note"><p className="research-eyebrow">A useful first email</p><h3>What are you trying to understand?</h3><ul><li>The question and the decision it could inform.</li><li>Available data, access restrictions, and approvals.</li><li>Your timeline and a point of contact.</li><li>The output that would be most useful.</li></ul><p>Please do not send confidential records or personal data in an initial inquiry.</p></aside>
    </section>
    <section><p className="research-eyebrow">Where we can contribute</p><h2>From public data to a usable research output.</h2><div className="research-grid">
      {[
        ['Economic & policy analysis', 'Investigate a policy question with descriptive statistics, comparisons, or econometric methods suited to the available evidence.'],
        ['Data & projections', 'Collect and reconcile public datasets, document definitions, and explore demographic or economic scenarios.'],
        ['Research communication', 'Translate methods and findings into reproducible notebooks, visualizations, dashboards, or a written research brief.'],
      ].map(([title, text]) => <div className="research-card" key={title}><h3>{title}</h3><p>{text}</p></div>)}
    </div><p className="research-caption">The final scope and output depend on the question, data readiness, student capacity, and partner agreement.</p></section>
    <section className="research-split"><div><h2>What makes a strong partnership?</h2><p>A focused question, accessible data, and an engaged partner matter more than a large project brief. We look for work that gives students room to investigate, interpret, and revise—not simply produce a chart.</p><Link className="research-text-link" href="/projects">Explore past REL projects →</Link></div><ol className="research-steps">
      <li><h3>Define the question together</h3><p>Discuss the context, relevant literature, intended audience, and what is feasible.</p></li>
      <li><h3>Confirm scope and data access</h3><p>Agree on responsibilities, milestones, privacy requirements, and any necessary ethics or institutional approvals.</p></li>
      <li><h3>Review work along the way</h3><p>A responsive partner helps resolve domain questions and gives feedback on intermediate work.</p></li>
      <li><h3>Deliver with the limitations visible</h3><p>Document sources, assumptions, and uncertainty. Public release of partner work requires permission.</p></li>
    </ol></section>
    <section className="research-faq"><h2>Before you get in touch</h2><details><summary>Does REL charge for research?</summary><p>Our economic research work is pro bono. Project acceptance depends on fit, scope, data readiness, and team capacity.</p></details><details><summary>Can a Rutgers faculty member propose a project?</summary><p>Yes. We welcome conversations about focused empirical work. A project may be narrower than a full semester-long external engagement; the scope and supervision should be agreed in advance.</p></details><details><summary>Is every project or dataset published?</summary><p>No. Some partner work is private. Publication and data handling are agreed with the partner; completing a project does not make its records public.</p></details><details><summary>Is this a consulting service with guaranteed results?</summary><p>REL is a student research group. We cannot guarantee a particular finding, placement of a team, or turnaround before reviewing a proposed scope.</p></details></section>
    <section className="research-closing"><h2>Start with the question.</h2><p>Email a short description to rel@rutgerseconomics.org. We can begin by discussing whether the work is a fit.</p><a className="research-button" href="mailto:rel@rutgerseconomics.org?subject=Research%20partnership%20with%20REL">Email REL ↗</a><Link className="research-text-link" href="/student-experience">See how students work →</Link></section>
  </ResearchPage>;
}
