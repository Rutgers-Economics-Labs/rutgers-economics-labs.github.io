import projects from '@/data/projects.json';

export function memberAnchor(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function currentProjectsFor(name: string) {
  return projects.filter((project) => project.current && project.members?.includes(name));
}
