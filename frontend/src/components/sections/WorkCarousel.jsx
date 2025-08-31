// src/components/sections/WorkCarousel.jsx — compact mode + tighter spacing + faster animations
import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const WorkCarousel = ({ compact = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      id: 1,
      type: 'github',
      title: 'AI Data Dashboard',
      description: 'Interactive dashboard for analyzing ML model performance with real-time metrics.',
      techStack: ['React', 'Python', 'TensorFlow', 'D3.js'],
      link: 'https://github.com/yourusername/project1',
      image: '/assets/project1.png',
      stats: { stars: 45, forks: 12 }
    },
    {
      id: 2,
      type: 'linkedin',
      title: 'Market Analysis Report',
      description: 'Emerging market trends using advanced statistical modeling and predictive analytics.',
      techStack: ['Python', 'Pandas', 'Matplotlib', 'SQL'],
      link: 'https://linkedin.com/posts/yourprofile/post1',
      image: '/assets/project2.png',
      stats: { likes: 156, comments: 23 }
    },
    {
      id: 3,
      type: 'github',
      title: 'Full-Stack E-commerce',
      description: 'E-commerce app with payments, inventory management, and analytics.',
      techStack: ['Node.js', 'React', 'MongoDB', 'Stripe'],
      link: 'https://github.com/yourusername/project3',
      image: '/assets/project3.png',
      stats: { stars: 78, forks: 21 }
    },
    {
      id: 4,
      type: 'linkedin',
      title: 'UX Design Case Study',
      description: 'Mobile banking app redesign focused on accessibility and UX.',
      techStack: ['Figma', 'Research', 'Prototyping', 'Testing'],
      link: 'https://linkedin.com/posts/yourprofile/post2',
      image: '/assets/project4.png',
      stats: { likes: 89, comments: 15 }
    }
  ];

  const pages = Math.ceil(projects.length / 2);
  const nextSlide = () => setCurrentIndex((p) => (p + 1) % pages);
  const prevSlide = () => setCurrentIndex((p) => (p - 1 + pages) % pages);

  const getVisibleProjects = () => {
    const start = currentIndex * 2;
    return projects.slice(start, start + 2);
  };

  return (
    <section className={`relative z-10 ${compact ? 'py-4' : 'py-12'}`}>
      <div className="max-w-6xl mx-auto px-0 lg:px-2">
        {/* Header */}
        <div className="text-center mb-6 lg:mb-8">
          <h2
            className="text-3xl lg:text-4xl font-bold mb-1"
            style={{
              background: 'linear-gradient(135deg, #FF2DD1, #4DFFBE)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Featured Work
          </h2>
          <p className="text-gray-400 text-sm lg:text-base">A quick peek at recent projects</p>
        </div>

        <div className="relative">
          {/* Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            aria-label="Previous"
          >
            <FaChevronLeft size={16} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
            aria-label="Next"
          >
            <FaChevronRight size={16} />
          </button>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {getVisibleProjects().map((project, index) => (
              <div
                key={project.id}
                className={`group relative rounded-xl p-4 transition-transform duration-200 hover:scale-[1.02] ${
                  compact ? 'text-sm' : 'text-base'
                }`}
                style={{
                  background: 'linear-gradient(135deg, rgba(255,45,209,0.08), rgba(77,255,190,0.08))',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 45, 209, 0.18)',
                  animation: `slideIn 0.22s ease-out ${index * 0.06}s both`
                }}
              >
                {/* Top Row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {project.type === 'github' ? (
                      <FaGithub className="text-white text-lg" />
                    ) : (
                      <FaLinkedin className="text-quaternary text-lg" />
                    )}
                    <span className="text-gray-400 text-xs uppercase tracking-wide">
                      {project.type}
                    </span>
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors p-1 rounded"
                    aria-label="Open project"
                  >
                    <FaExternalLinkAlt size={14} />
                  </a>
                </div>

                {/* Image */}
                <div className="mb-3 rounded-md overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className={`w-full ${compact ? 'h-36' : 'h-44'} object-cover group-hover:scale-105 transition-transform duration-200`}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      if (e.currentTarget.nextSibling) e.currentTarget.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className={`${compact ? 'h-36' : 'h-44'} hidden items-center justify-center bg-gradient-to-br from-primary/15 to-tertiary/15`}>
                    <span className="text-gray-400 text-xs">Project Preview</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className={`font-bold mb-2 ${compact ? 'text-lg' : 'text-xl'}`}
                    style={{
                      background: 'linear-gradient(135deg, #FFFFFF, #FDFFB8)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-xs lg:text-sm mb-3 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Tech */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 text-[11px] font-medium rounded-full"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,45,209,0.18), rgba(77,255,190,0.18))',
                        color: '#FFFFFF',
                        border: '1px solid rgba(255, 45, 209, 0.26)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-[12px] text-gray-400">
                  {project.type === 'github' ? (
                    <>
                      <span>⭐ {project.stats.stars}</span>
                      <span>🍴 {project.stats.forks}</span>
                    </>
                  ) : (
                    <>
                      <span>👍 {project.stats.likes}</span>
                      <span>💬 {project.stats.comments}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-5 gap-1.5">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex ? 'bg-primary scale-125' : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default WorkCarousel;
