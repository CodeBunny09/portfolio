// src/App.jsx - Compact, animated layout with hero intro + WorkCarousel
import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaBlog } from 'react-icons/fa';
import ParticlesBackground from './components/layout/ParticlesBackground';
import Navbar from './components/layout/Navbar';
import CustomCursor from './components/ui/CustomCursor';
import WorkCarousel from './components/sections/WorkCarousel';

function App() {
  const [showRest, setShowRest] = useState(false);

  // ✅ Social links (later replace with backend values)
  const githubLink = "https://github.com/CodeBunny09";
  const linkedinLink = "https://linkedin.com/in/pratik-c";
  const twitterLink = "https://twitter.com/your-handle";
  const blogLink = "https://yourblog.com";

  useEffect(() => {
    // Delay showing rest until hero lines animate
    const timer = setTimeout(() => setShowRest(true), 480);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-screen min-h-screen cursor-none relative overflow-y-auto overflow-x-hidden hide-scrollbar bg-transparent">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Particle Background */}
      <ParticlesBackground />
      
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col lg:flex-row items-center justify-center px-4 py-8 max-w-6xl mx-auto">
        {/* Left Column - Text + Socials */}
        <div className="flex-1 text-left flex flex-col items-start">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight space-y-2">
            <div className="fade-line" style={{ animationDelay: '0.2s' }}>
              Hi, I'm Pratik
            </div>
            <div className="fade-line" style={{ animationDelay: '0.8s' }}>
              dev, analyst, designer,
            </div>
            <div className="fade-line" style={{ animationDelay: '1.4s' }}>
              creator
            </div>
          </h1>
          
          {showRest && (
            <>
              <p 
                className="text-sm lg:text-base text-gray-300 leading-relaxed max-w-md mt-4 mb-4 fade-in"
                style={{ animationDelay: '2s' }}
              >
                I'm a developer and analyst who loves turning tricky problems into clever solutions—
                whether it's models, dashboards, or full-on experiments. I thrive on learning,
                building, and the occasional debugging adventure.
              </p>

              {/* ✅ Social Icons */}
              <div 
                className="flex space-x-5 mt-2 fade-in"
                style={{ animationDelay: '2.2s' }}
              >
                <a href={githubLink} target="_blank" rel="noopener noreferrer" 
                   className="text-2xl text-gray-300 hover:text-primary transition-transform transform hover:scale-110">
                  <FaGithub />
                </a>
                <a href={linkedinLink} target="_blank" rel="noopener noreferrer" 
                   className="text-2xl text-gray-300 hover:text-[#0A66C2] transition-transform transform hover:scale-110">
                  <FaLinkedin />
                </a>
                <a href={twitterLink} target="_blank" rel="noopener noreferrer" 
                   className="text-2xl text-gray-300 hover:text-[#1DA1F2] transition-transform transform hover:scale-110">
                  <FaTwitter />
                </a>
                <a href={blogLink} target="_blank" rel="noopener noreferrer" 
                   className="text-2xl text-gray-300 hover:text-tertiary transition-transform transform hover:scale-110">
                  <FaBlog />
                </a>
              </div>
            </>
          )}
        </div>

        {/* Right Column - Floating Image */}
        {showRest && (
          <div className="flex-1 flex justify-center lg:justify-end mt-6 lg:mt-0 fade-in" style={{ animationDelay: '2.4s' }}>
            <img 
              src="./src/assets/mypic.png" 
              alt="Pratik" 
              className="w-64 h-64 lg:w-[340px] lg:h-[340px] object-contain animate-float"
              style={{
                filter: 'drop-shadow(0 0 28px rgba(255, 45, 209, 0.5))'
              }}
            />
          </div>
        )}
      </section>

      {/* Work Carousel Section */}
      {showRest && (
        <section className="relative z-10 px-4 py-8 max-w-6xl mx-auto fade-in" style={{ animationDelay: '2.8s' }}>
          <WorkCarousel compact />
        </section>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-line {
          opacity: 0;
          background: linear-gradient(135deg, #FF2DD1, #63C8FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: fadeInUp 0.6s forwards;
        }
        .fade-in {
          opacity: 0;
          animation: fadeInUp 0.8s forwards;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default App;
