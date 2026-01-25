// src/components/sections/FeaturedProjectsHome.jsx
import { useMemo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useFeaturedProjects } from '../../hooks/useAPI';
import defaultProjectImage from '../../assets/default-project.jpg';

const FeaturedProjectsHome = ({ projectsData }) => {
  // Fallback to hook if props not provided
  const { data: fetchedData, loading, error } = useFeaturedProjects(10);

  const projects = useMemo(() => {
    const data = projectsData || fetchedData;
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (data.results && Array.isArray(data.results)) return data.results;
    return [];
  }, [projectsData, fetchedData]);

  if (!projectsData && loading) {
    return <div className="text-[#8f8f8f] text-center py-8">Loading projects...</div>;
  }

  if (!projectsData && error) {
    return <div className="text-red-500 text-center py-8">Failed to load projects.</div>;
  }

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          totalProjects={projects.length}
        />
      ))}
    </div>
  );
};

const ProjectCard = ({ project, index, totalProjects }) => {
  const cardRef = useRef(null);

  // Individual card scroll progress
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Subtle scale and opacity effects
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.9, 1, 1, 0.9]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.4, 1, 1, 0.4]
  );

  const displayImage = project.image || defaultProjectImage;

  // Sticky positioning - clean stacking
  const stickyTop = 100 + (index * 20);

  return (
    <div
      ref={cardRef}
      className="h-[120vh] relative"
      style={{
        zIndex: totalProjects - index,
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
        }}
        className="sticky px-4 sm:px-6 lg:px-8"
      >
        <div
          className="w-full max-w-[1200px] mx-auto"
          style={{
            position: 'sticky',
            top: `${stickyTop}px`,
          }}
        >
          <div className="h-[70vh] w-full rounded-[20px] bg-white/5 border border-white/10 overflow-hidden backdrop-blur-sm hover:bg-white/[0.07] transition-all duration-500">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 h-20 flex items-center justify-between px-6 sm:px-8 z-20 bg-gradient-to-b from-black/90 to-transparent">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-[#8f8f8f]/50">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="text-xs text-[#8f8f8f] uppercase tracking-wider font-semibold">Project</p>
                  <p className="text-white font-semibold text-base sm:text-lg truncate max-w-[200px] sm:max-w-none">
                    {project.client || project.title}
                  </p>
                </div>
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 sm:px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium
                           hover:bg-white/10 hover:border-white/20 transition-all duration-300 hidden sm:block"
                >
                  View →
                </a>
              )}
            </div>

            {/* Image and Content */}
            <div className="relative w-full h-full">
              <motion.img
                src={displayImage}
                alt={project.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.05 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                onError={(e) => {
                  e.target.src = defaultProjectImage;
                }}
              />

              {/* Clean gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

              {/* Project Details */}
              <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-black/70 backdrop-blur-xl rounded-[20px] p-5 sm:p-6 border border-white/10 flex-1 w-full sm:w-auto sm:max-w-2xl"
                >
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-heading">
                    {project.title}
                  </h3>
                  <p className="text-[#8f8f8f] text-sm sm:text-base mb-4 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {project.tech_stack && project.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack.slice(0, 6).map((tech) => (
                        <span
                          key={tech.name}
                          className="px-3 py-1.5 text-xs sm:text-sm rounded-full
                                   bg-white/5 text-[#8f8f8f] border border-white/10
                                   hover:bg-white/10 hover:text-white transition-all duration-200"
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Stats */}
                {(project.github_stars || project.linkedin_likes || project.type) && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-black/60 backdrop-blur-xl rounded-2xl px-5 sm:px-6 py-4
                             flex gap-4 sm:gap-5 text-sm sm:text-base text-[#8f8f8f]
                             border border-white/10 w-full sm:w-auto justify-center sm:justify-start"
                  >
                    {project.type === 'github' && (
                      <>
                        <span className="flex items-center gap-2">
                          <span className="text-[#0bde66]">★</span>
                          <span className="font-semibold text-white">{project.github_stars ?? 0}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <span>🍴</span>
                          <span className="font-semibold text-white">{project.github_forks ?? 0}</span>
                        </span>
                      </>
                    )}
                    {project.type === 'linkedin' && (
                      <>
                        <span className="flex items-center gap-2">
                          <span>👍</span>
                          <span className="font-semibold text-white">{project.linkedin_likes ?? 0}</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <span>💬</span>
                          <span className="font-semibold text-white">{project.linkedin_comments ?? 0}</span>
                        </span>
                      </>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturedProjectsHome;