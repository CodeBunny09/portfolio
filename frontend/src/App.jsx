// src/App.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaBlog, FaInstagram } from 'react-icons/fa';
import ParticlesBackground from './components/layout/ParticlesBackground';
import Navbar from './components/layout/Navbar';
import CustomCursor from './components/ui/CustomCursor';
import WorkCarousel from './components/sections/WorkCarousel';
import { useProfile } from './hooks/useAPI';
import './App.css';

function App() {
  const [showRest, setShowRest] = useState(false);
  const { data: profile, loading, error } = useProfile();

  // ---- Typewriter state ----
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // ensure taglineParts is stable; trim spaces
  const taglineParts = useMemo(
    () => (profile?.tagline ? profile.tagline.split(',').map(p => p.trim()).filter(Boolean) : []),
    [profile?.tagline]
  );

  useEffect(() => {
    const timer = setTimeout(() => setShowRest(true), 480);
    return () => clearTimeout(timer);
  }, []);

  // ---- Memoize Particles so it doesn't remount on every render/state change ----
  const ParticlesMemo = useMemo(() => <ParticlesBackground />, []);

  // ---- Typewriter effect (loops forever) ----
  useEffect(() => {
    if (taglineParts.length === 0) return;

    const currentWord = taglineParts[currentWordIndex];
    const typingSpeed = isDeleting ? 60 : 110;
    const pauseAfterTyped = 900;

    let timeoutId;

    const tick = () => {
      if (!isDeleting && displayedText.length < currentWord.length) {
        setDisplayedText(currentWord.slice(0, displayedText.length + 1));
      } else if (!isDeleting && displayedText.length === currentWord.length) {
        // pause then start deleting
        timeoutId = setTimeout(() => setIsDeleting(true), pauseAfterTyped);
      } else if (isDeleting && displayedText.length > 0) {
        setDisplayedText(currentWord.slice(0, displayedText.length - 1));
      } else if (isDeleting && displayedText.length === 0) {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % taglineParts.length);
      }
    };

    // if we scheduled a delayed delete pause, leave it; otherwise schedule normal tick
    if (!timeoutId) timeoutId = setTimeout(tick, typingSpeed);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedText, isDeleting, currentWordIndex, taglineParts.length]);

  // collect socials
  const socials = {};
  if (profile?.social_links) {
    profile.social_links.forEach(link => {
      socials[link.platform] = link.url;
    });
  }

  return (
    <div className="w-screen min-h-screen cursor-none relative overflow-y-auto overflow-x-hidden hide-scrollbar bg-transparent">
      <CustomCursor />
      {/* Memoized Particles — won't remount when typewriter updates */}
      {ParticlesMemo}
      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col lg:flex-row items-center justify-center px-4 py-8 max-w-6xl mx-auto overflow-visible">
        {/* Left Column */}
        <div className="flex-1 text-left flex flex-col items-start">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight space-y-2" style={{ overflow: 'visible' }}>
            <div className="fade-line" style={{ animationDelay: '0.2s' }}>
              Hi, I'm {profile?.name || 'Pratik'}
            </div>

            {/* Typewriter tagline — larger than the hi text */}
            {taglineParts.length > 0 && (
              <div
                className="fade-line tagline text-[2.6rem] lg:text-[3.2rem] font-extrabold"
                style={{ animationDelay: '0.8s', display: 'block', overflow: 'visible', lineHeight: 1.05, paddingBottom: '6px' }}
              >
                {displayedText}
                <span style={{ display: 'inline-block', width: 1, background: '#fff', marginLeft: 6, height: '1.05em', verticalAlign: 'bottom', animation: 'blink 1s step-start infinite' }} />
              </div>
            )}
          </h1>

          {showRest && (
            <>
              <p
                className="text-sm lg:text-base text-gray-300 leading-relaxed max-w-md mt-4 mb-4 fade-in"
                style={{ animationDelay: '2s' }}
              >
                {profile?.bio ||
                  "I'm a developer and analyst who loves turning tricky problems into clever solutions—whether it's models, dashboards, or full-on experiments. I thrive on learning, building, and the occasional debugging adventure."}
              </p>

              {/* Social Icons */}
              <div className="flex space-x-5 mt-2 fade-in" style={{ animationDelay: '2.2s' }}>
                {socials.github && (
                  <a href={socials.github} target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-300 hover:text-primary transition-transform transform hover:scale-110">
                    <FaGithub />
                  </a>
                )}
                {socials.linkedin && (
                  <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-300 hover:text-[#0A66C2] transition-transform transform hover:scale-110">
                    <FaLinkedin />
                  </a>
                )}
                {socials.twitter && (
                  <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-300 hover:text-[#1DA1F2] transition-transform transform hover:scale-110">
                    <FaTwitter />
                  </a>
                )}
                {socials.blog && (
                  <a href={socials.blog} target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-300 hover:text-tertiary transition-transform transform hover:scale-110">
                    <FaBlog />
                  </a>
                )}
                {socials.instagram && (
                  <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="text-2xl text-gray-300 hover:text-tertiary transition-transform transform hover:scale-110">
                    <FaInstagram />
                  </a>
                )}
              </div>
            </>
          )}
        </div>

        {/* Right Column - Floating Image */}
        {showRest && profile?.profile_image_url && (
          <div className="flex-1 flex justify-center lg:justify-end mt-6 lg:mt-0 fade-in" style={{ animationDelay: '2.4s' }}>
            <img
              src={profile.profile_image_url}
              alt={profile?.name || 'Profile'}
              className="w-64 h-64 lg:w-[340px] lg:h-[340px] object-contain animate-float"
              style={{ filter: 'drop-shadow(0 0 28px rgba(255, 45, 209, 0.5))' }}
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
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 4s ease-in-out infinite; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-line { opacity: 0; background: linear-gradient(135deg, #FF2DD1, #63C8FF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; animation: fadeInUp 0.6s forwards; display: block; overflow: visible; }
        .fade-in { opacity: 0; animation: fadeInUp 0.8s forwards; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes blink { 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}

export default App;
