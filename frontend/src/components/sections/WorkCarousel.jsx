import React, { useMemo } from 'react';
import { useFeaturedProjects } from '../../hooks/useAPI';
import defaultProjectImage from '../../assets/default-project.jpg';

const WorkCarousel = ({ compact = false }) => {
  const { data: projectsData, loading, error } = useFeaturedProjects(10);

  const projects = useMemo(() => {
    if (!projectsData) return [];
    if (Array.isArray(projectsData)) return projectsData;
    if (projectsData.results && Array.isArray(projectsData.results)) return projectsData.results;
    return [];
  }, [projectsData]);

  if (loading) return <div className="text-gray-400 text-center py-8">Loading projects...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Failed to load projects.</div>;

  return (
    <section className={`relative z-10 ${compact ? 'py-4' : 'py-12'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="text-3xl lg:text-4xl text-white font-bold mb-1">Featured Work</h2>
          <p className="text-gray-400 text-sm lg:text-base">
            A showcase of innovative projects with key details
          </p>
        </div>

        <div
          className="flex overflow-x-auto space-x-6 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent pb-4"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex-none w-80 md:w-96 rounded-2xl bg-white/5 backdrop-blur border border-white/10 shadow-xl hover:scale-103 transition-transform duration-300"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Banner Image */}
              <div
                className="h-48 opacity-70 hover:opacity-100 transition-opacity duration-300 ease-in-out rounded-t-2xl bg-cover bg-center"
                style={{
                  backgroundImage: `url(${project.image || defaultProjectImage})`,
                }}
              >
                <div className="w-full h-full bg-black/40 rounded-t-2xl"></div>
              </div>

              {/* Card Content */}
              <div className="p-4 space-y-3">
                <h3 className="text-lg font-bold text-white">{project.title}</h3>
                <p className="text-gray-300 text-sm">{project.description}</p>

                <div className="text-xs text-gray-400">
                  <p><span className="text-gray-200">Type:</span> {project.type || 'N/A'}</p>
                </div>

                {/* Tech Stack */}
                {project.tech_stack?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack.slice(0, 5).map((tech) => (
                      <span
                        key={tech.name}
                        className="px-2 py-1 text-xs rounded bg-white/10 text-gray-200 border border-white/20"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Corrected Stats */}
                <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                  {project.type === 'github' && (
                    <>
                      <span>★ {project.github_stars ?? 0}</span>
                      <span>🍴 {project.github_forks ?? 0}</span>
                    </>
                  )}
                  {project.type === 'linkedin' && (
                    <>
                      <span>👍 {project.linkedin_likes ?? 0}</span>
                      <span>💬 {project.linkedin_comments ?? 0}</span>
                    </>
                  )}
                </div>

                {/* View Button */}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full text-center bg-purple-600 hover:bg-purple-500 text-white py-2 rounded-lg transition-colors duration-300"
                  >
                    View Project
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkCarousel;
