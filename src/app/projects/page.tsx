import projects from '../../data/projects.json';
import Image from 'next/image';

export const metadata = {
  title: 'Projects - Rutgers Economics Labs',
  description: 'Projects by Rutgers Economics Labs.',
};

export default function ProjectsPage() {

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-8">Projects</h3>
        </div>
        <div className="space-y-8">
          {projects.map((project, idx) => (
            <div key={idx} className="project-card card-hover p-8 rounded-2xl">
              <div className="flex flex-col lg:flex-row items-start lg:items-center lg:space-x-6">
                <div className="w-full lg:w-16 lg:h-16 h-20 flex items-center justify-center flex-shrink-0 overflow-hidden mb-4 lg:mb-0">
                  <Image 
                    src={project.logo}
                    alt={project.logoAlt}
                    width={48}
                    height={48}
                    className={project.logo.endsWith('.jpg') ? 'h-full object-contain' : 'h-full object-contain'} 
                  />
                </div>
                <div className="flex-1 w-full">
                  <h4 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h4>
                  <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                  <div className={project.isPublic ? 'flex flex-wrap items-center gap-2 mb-4' : 'flex items-center space-x-4 mb-2'}>
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className={
                          tag.color === 'green'
                            ? 'bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium'
                            : tag.color === 'blue'
                            ? 'bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'
                            : 'bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold'
                        }
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                </div>
                {project.isPublic && project.pdfLink && (
                  <div className="w-full lg:w-auto flex lg:block justify-center lg:justify-end mt-2 lg:mt-0">
                    <a
                      href={project.pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full lg:w-auto text-center px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition shadow-md"
                    >
                      View Paper (PDF)
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 