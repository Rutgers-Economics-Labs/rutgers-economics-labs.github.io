import Image from 'next/image';
import team from "@/data/team.json"

export const metadata = {
  title: 'People - Rutgers Economics Labs',
  description: 'Meet the team behind Rutgers Economics Labs.',
};

const orgLogos: Record<string, string> = {
  NJEDA: '/images/logo/njeda.jpg',
  NJDCA: '/images/logo/njdca.png',
  USDA: '/images/logo/usda.png',
  NJDOL: '/images/logo/njdol.png',
  Virginia: '/images/logo/virginia.png',
  HUD: '/images/logo/hud.svg',
  NJDEP: '/images/logo/njdep.png',
  NJBPU: '/images/logo/njbpu.png',
};

async function getTeamData() {
  return team;
}

function TeamMemberCard({ member, section }: { member: any; section: string }) {
  const isMember = section === 'members';
  const isAlumni = section === 'alumni';
  const isBoard = section === 'board';

  // Card sizing: Executive/Team Leads (large), Board (medium), Members/Alumni (small)
  const cardClass = isBoard ? 'max-w-[280px]' : (isMember || isAlumni ? 'max-w-[200px]' : 'max-w-sm');
  const imageClass = isBoard ? 'w-40 h-40 mx-auto' : (isMember || isAlumni ? 'w-32 h-32 mx-auto' : 'w-full');
  const textClass = isBoard ? 'text-base' : (isMember || isAlumni ? 'text-sm' : 'text-base');
  const orgLogosSection = member.team && member.team.length > 0 ? (
    <div className="flex justify-center space-x-3 mt-2">
      {member.team.filter((org: string, idx: number, self: string[]) => self.indexOf(org) === idx).map((org: string) => (
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
  return (
    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={`block w-full ${cardClass}`} key={member.name}>
      <div className={`card-hover bg-[var(--card-bg)] border border-[var(--card-border)] p-6 rounded-xl shadow-lg text-center cursor-pointer transform transition-transform duration-300 hover:scale-105 ${isAlumni ? 'opacity-75' : ''}`}>
        <div className="aspect-w-1 aspect-h-1 mb-4">
          <Image src={`/${member.image}`} alt={member.name} width={128} height={128} className={`${imageClass} rounded-lg object-cover`} />
        </div>
        <h5 className={`text-xl font-semibold text-[var(--text-primary)] mb-2 ${textClass}`}>{member.name}</h5>
        <p className={`text-red-600 font-medium mb-4 ${textClass}`}>{member.position}</p>
        <p className={`text-[var(--text-secondary)] ${textClass} mb-2`}>{member.description}</p>
        {orgLogosSection}
      </div>
    </a>
  );
}

export default async function PeoplePage() {
  const team = await getTeamData();
  return (
    <div className="py-20 bg-[var(--bg-secondary)] min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-[var(--text-primary)] mb-8">Our Team</h3>
          <p className="text-xl text-[var(--text-secondary)] max-w-4xl mx-auto">
            Meet the dedicated individuals who make Rutgers Economics Labs possible.
          </p>
        </div>
        {/* Executive Board */}
        <div className="mb-20 text-center">
          <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-7 text-center">Executive Board</h4>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {team.executiveBoard.map((member: any) => (
              <TeamMemberCard key={member.name} member={member} section="executive" />
            ))}
          </div>
        </div>
        {/* Team Leads */}
        <div className="mb-20 text-center">
          <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-12 text-center">Team Leads</h4>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {team.teamLeads.map((member: any) => (
              <TeamMemberCard key={member.name} member={member} section="leads" />
            ))}
          </div>
        </div>
        {/* Board Members */}
        <div className="mb-20 text-center">
          <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-12 text-center">Board Members</h4>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {team.boardMembers.map((member: any) => (
              <TeamMemberCard key={member.name} member={member} section="board" />
            ))}
          </div>
        </div>
        {/* Members */}
        <div className="mb-20 text-center">
          <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-12 text-center">Members</h4>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {team.members.map((member: any) => (
              <TeamMemberCard key={member.name} member={member} section="members" />
            ))}
          </div>
        </div>
        {/* Alumni */}
        <div className="text-center">
          <h4 className="text-2xl font-bold text-[var(--text-primary)] mb-12 text-center">Alumni</h4>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {team.alumni.map((member: any) => (
              <TeamMemberCard key={member.name} member={member} section="alumni" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}