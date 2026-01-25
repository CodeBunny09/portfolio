// src/components/ui/ProjectCard.jsx
import React from 'react';
import { FaGithub, FaLinkedin, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project, index }) => {
  const isGithub = project.type === 'github';

  return (
    <div
      className="group relative rounded-xl p-6 transition-all duration-500 hover:scale-105"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 45, 209, 0.08), rgba(77, 255, 190, 0.08))',
        backdropFilter: 'blur(15px)',
        border: '1px solid rgba(255, 45, 209, 0.15)',
        animation: `slideIn 0.8s ease-out ${index * 0.3}s both`
      }}
    >
      {/* Header with Icon and Link */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {isGithub ? (
            <FaGithub className="text-white text-2xl" />
          ) : (
            <FaLinkedin className="text-quaternary text-2xl" />
          )}
          <span className="text-gray-400 text-sm uppercase tracking-wider font-medium">
            {project.type} Project
          </span>
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-primary transition-colors duration-300 p-2 rounded-full hover:bg-white/10"
        >
          <FaExternalLinkAlt size={16} />
        </a>
      </div>

      {/* Project Image/Preview */}
      <div className="mb-5 rounded-lg overflow-hidden relative">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div 
          className="w-full h-52 bg-gradient-to-br from-primary/15 to-tertiary/15 hidden items-center justify-center rounded-lg"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-primary/30 to-tertiary/30 flex items-center justify-center">
              {isGithub ? <FaGithub size={24} /> : <FaLinkedin size={24} />}
            </div>
            <span className="text-gray-400 text-sm">Project Preview</span>
          </div>
        </div>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white text-sm font-medium">View Project →</span>
        </div>
      </div>

      {/* Project Title */}
      <h3 
        className="text-xl font-bold mb-3"
        style={{
          background: 'linear-gradient(135deg, #FFFFFF, #FDFFB8)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        {project.title}
      </h3>
      
      {/* Description */}
      <p className="text-gray-300 text-sm mb-5 leading-relaxed line-clamp-3">
        {project.description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.techStack.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 text-xs font-medium rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: isGithub 
                ? 'linear-gradient(135deg, rgba(255, 45, 209, 0.2), rgba(99, 200, 255, 0.2))'
                : 'linear-gradient(135deg, rgba(77, 255, 190, 0.2), rgba(253, 255, 184, 0.2))',
              color: '#FFFFFF',
              border: `1px solid ${isGithub ? 'rgba(255, 45, 209, 0.3)' : 'rgba(77, 255, 190, 0.3)'}`
            }}
          >
            {tech}
          </span>
        ))}
        {project.techStack.length > 4 && (
          <span className="text-gray-500 text-xs px-2">
            +{project.techStack.length - 4} more
          </span>
        )}
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4 text-gray-400">
          {isGithub ? (
            <>
              <span className="flex items-center space-x-1">
                <span>⭐</span>
                <span>{project.stats.stars}</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>🍴</span>
                <span>{project.stats.forks}</span>
              </span>
            </>
          ) : (
            <>
              <span className="flex items-center space-x-1">
                <span>👍</span>
                <span>{project.stats.likes}</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>💬</span>
                <span>{project.stats.comments}</span>
              </span>
            </>
          )}
        </div>
        
        <span 
          className="text-xs px-2 py-1 rounded-full"
          style={{
            background: isGithub ? 'rgba(255, 45, 209, 0.2)' : 'rgba(77, 255, 190, 0.2)',
            color: isGithub ? '#FF2DD1' : '#4DFFBE'
          }}
        >
          {isGithub ? 'Open Source' : 'Professional'}
        </span>
      </div>
    </div>
  );
};

export default ProjectCard;