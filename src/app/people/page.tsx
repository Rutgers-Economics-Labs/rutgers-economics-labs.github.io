import { pageMetadata } from '@/lib/metadata';
import Image from 'next/image';
import Link from 'next/link';
import { currentProjectsFor, memberAnchor } from '@/lib/project-team';
import team from "@/data/team.json"

export const metadata = pageMetadata("Our team", "Meet Rutgers Economics Labs student researchers, team leads, executive board, and alumni.", "/people");

const orgLogos: Record<string, string> = {
  NJEDA: '/images/logo/njeda.jpg',
  NJDCA: '/images/logo/njdca.png',
  USDA: '/images/logo/usda.png',
  NJDOL: '/images/logo/njdol.png',
  Virginia: '/images/logo/virginia.png',
  HUD: '/images/logo/hud.svg',
  NJDEP: '/images/logo/njdep.png',
  NJBPU: '/images/logo/njbpu.png',
  RAIL: '/images/REL Logo.JPEG',
};

type TeamMember = (typeof team)[keyof typeof team][number];

function TeamMemberCard({ member, section }: { member: TeamMember; section: string }) {
  const currentProjects = currentProjectsFor(member.name);
  const isMember = section === 'members';
  const isAlumni = section === 'alumni';
  const isBoard = section === 'board';

  // Card sizing: Executive/Team Leads (large), Board (medium), Members/Alumni (small)
  const cardClass = isBoard ? 'max-w-[200px]' : (isMember || isAlumni ? 'max-w-[160px]' : 'max-w-[200px]');
  const imageClass = isBoard ? 'w-28 h-28 mx-auto' : (isMember || isAlumni ? 'w-24 h-24 mx-auto' : 'w-28 h-28 mx-auto');
  const textClass = isBoard ? 'text-sm' : (isMember || isAlumni ? 'text-xs' : 'text-sm');
  const orgLogosSection = member.team && member.team.length > 0 ? (
    <div className="flex flex-wrap justify-center gap-3 mt-2">
      {member.team.filter((org, idx, self) => self.indexOf(org) === idx).map((org) => (
        <Image
          key={org}
          src={orgLogos[org]}
          alt={org}
          width={32}
          height={32}
          className="h-8 object-contain"
          title={org}
        />
      ))}
    </div>
  ) : null;
  const card = (
      <div className={`card-hover bg-[var(--card-bg)] border border-[var(--card-border)] p-4 rounded-xl shadow-lg text-center transform transition-transform duration-300 ${member.linkedin ? 'cursor-pointer hover:scale-105' : ''} ${isAlumni ? 'opacity-75' : ''}`}>
        <div className="aspect-w-1 aspect-h-1 mb-4">
          {member.image ? (
            <Image src={`/${member.image}`} alt={member.name} width={128} height={128} className={`${imageClass} rounded-lg object-cover`} />
          ) : (
            <div aria-hidden="true" className={`${imageClass} rounded-lg bg-red-600/10 text-red-600 flex items-center justify-center text-2xl font-semibold`}>
              {member.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}
            </div>
          )}
        </div>
        <h5 className={`text-xl font-semibold text-[var(--text-primary)] mb-2 ${textClass}`}>{member.name}</h5>
        <p className={`text-red-600 font-medium mb-4 ${textClass}`}>{member.position}</p>
        {!isMember && !isAlumni && <p className={`text-[var(--text-secondary)] ${textClass} mb-2`}>{member.description}</p>}
        {orgLogosSection}
      </div>
  );

  return (
    <div id={memberAnchor(member.name)} className={`block w-full scroll-mt-24 ${cardClass}`}>
      {member.linkedin ? (
        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="block">{card}</a>
      ) : card}
      {currentProjects.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-3" aria-label={`${member.name} current projects`}>
          {currentProjects.map((project) => (
            <Link key={project.id} href={`/projects#${project.id}`} className="rounded-full bg-red-600/10 px-3 py-1 text-xs font-semibold text-red-600 hover:underline focus-visible:outline-2 focus-visible:outline-red-600">
              {project.abbreviation} · Fall 2026
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PeoplePage() {
  return (
    <div className="py-20 bg-[var(--bg-secondary)] min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-8">Our Team</h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-4xl mx-auto">
            Meet the dedicated individuals who make Rutgers Economics Labs possible.
          </p>
        </div>
        {/* Executive Board */}
        <div className="mb-20 text-center">
          <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-7 text-center">Executive Board</h4>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {team.executiveBoard.map((member: TeamMember) => (
              <TeamMemberCard key={member.name} member={member} section="executive" />
            ))}
          </div>
        </div>
        {/* Team Leads */}
        <div className="mb-20 text-center">
          <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-12 text-center">Team Leads</h4>
          <div className="flex flex-wrap justify-center gap-6 text-center">
            {team.teamLeads.map((member: TeamMember) => (
              <TeamMemberCard key={member.name} member={member} section="leads" />
            ))}
          </div>
        </div>
        {/* Members */}
        <div className="mb-20 text-center">
          <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-12 text-center">Members</h4>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {team.members.map((member: TeamMember) => (
              <TeamMemberCard key={member.name} member={member} section="members" />
            ))}
          </div>
        </div>
        {/* Alumni */}
        <div className="text-center">
          <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-12 text-center">Alumni</h4>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {team.alumni.map((member: TeamMember) => (
              <TeamMemberCard key={member.name} member={member} section="alumni" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
