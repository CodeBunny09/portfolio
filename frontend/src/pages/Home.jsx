// src/pages/Home.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaBlog, FaInstagram } from 'react-icons/fa';
import ParticlesBackground from '../components/layout/ParticlesBackground';
import Navbar from '../components/layout/Navbar';
import CustomCursor from '../components/ui/CustomCursor';
import WorkCarousel from '../components/sections/WorkCarousel';
import { useProfile, useGalleryImages } from '../hooks/useAPI';
import { useNavigate } from "react-router-dom";
import '../App.css';

function Home() {
  const [showRest, setShowRest] = useState(false);
  const { data: profile, loading, error } = useProfile();
  const { data: galleryImages, loading: galleryLoading, error: galleryError } = useGalleryImages();

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
    const timer = setTimeout(() => setShowRest(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const ParticlesMemo = useMemo(() => <ParticlesBackground />, []);
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
        timeoutId = setTimeout(() => setIsDeleting(true), pauseAfterTyped);
      } else if (isDeleting && displayedText.length > 0) {
        setDisplayedText(currentWord.slice(0, displayedText.length - 1));
      } else if (isDeleting && displayedText.length === 0) {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % taglineParts.length);
      }
    };
    if (!timeoutId) timeoutId = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedText, isDeleting, currentWordIndex, taglineParts.length]);

  const socials = {};
  if (profile?.social_links) {
    profile.social_links.forEach(link => {
      socials[link.platform] = link.url;
    });
  }

  const navigate = useNavigate();

  return (
    <div className="w-screen min-h-screen cursor-none relative overflow-y-auto overflow-x-hidden hide-scrollbar bg-transparent">
      <CustomCursor />
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
                {profile?.bio || "I'm a developer and analyst who loves turning tricky problems into clever solutions—whether it's models, dashboards, or full-on experiments. I thrive on learning, building, and the occasional debugging adventure."}
              </p>
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
      {/* CTA Section */}
      {showRest && (
        <section className="w-full flex justify-center items-center mt-2 mb-8 fade-in" style={{ animationDelay: '2.3s' }}>
          <button
            className="
              px-10 py-4 rounded-full
              backdrop-blur-md
              border border-white/20
              shadow-lg
              text-white text-xl font-bold
              transition-all duration-400
              hover:scale-105
              hover:shadow-xl
              hover:backdrop-blur-xl
              hover:bg-transparent
              hover:border-white
              hover:text-white
            "
            style={{
              letterSpacing: '1px',
              boxShadow: "0 6px 40px 0 rgba(68,0,188,0.05)",
              textShadow: "0 0 10px #fff5",
              WebkitBackdropFilter: "blur(8px)",
              backdropFilter: "blur(8px)"
            }}
            onClick={() => navigate('/contact')}
          >
            Request a custom solution
          </button>
        </section>
      )}
      {/* --- Works Header --- */}
      {showRest && (
        <section className="relative z-10 flex flex-col lg:flex-row items-center justify-center px-4 py-8 max-w-6xl mx-auto overflow-visible" style={{ animationDelay: '2.4s' }}>
          <h2 className="text-3xl font-bold text-white text-left" style={{ marginBottom: 0 }}>My Works</h2>
        </section>
      )}

      {/* Work Carousel Section */}
      {showRest && (
        <section className="relative z-10 px-4 py-8 max-w-6xl mx-auto fade-in" style={{ animationDelay: '2.8s' }}>
          <WorkCarousel compact />
          <section className="w-full flex justify-center items-center mt-2 mb-8 fade-in" style={{ animationDelay: '2.9s' }}>
            <button
              className="
                px-10 py-4 rounded-full
                backdrop-blur-md
                border border-white/20
                shadow-lg
                text-white text-xl font-bold
                transition-all duration-400
                hover:scale-105
                hover:shadow-xl
                hover:backdrop-blur-xl
                hover:bg-transparent
                hover:border-white
                hover:text-white
              "
              style={{
                letterSpacing: '1px',
                boxShadow: "0 6px 40px 0 rgba(68,0,188,0.05)",
                textShadow: "0 0 10px #fff5",
                WebkitBackdropFilter: "blur(8px)",
                backdropFilter: "blur(8px)",
              }}
              onClick={() => navigate('/work')}
              >
              Explore All My Work
            </button>
          </section>
        </section>
      )}

      {/* --- Gallery Header --- */}
         {showRest && (
           <section className="relative z-10 flex flex-col lg:flex-row items-center justify-center px-4 py-8 max-w-6xl mx-auto overflow-visible" style={{ animationDelay: '2.4s' }}>
             <h2 className="text-3xl font-bold text-white text-left" style={{ marginBottom: 0 }}>My Gallery</h2>
           </section>
         )}

      {/* --- Gallery Preview Section (from API) --- */}
      {showRest && (
        <section className="w-full flex justify-center items-center overflow-hidden py-4 mb-2 fade-in" style={{ animationDelay: '2.5s' }}>
          {galleryLoading ? (
            <div className="w-full text-center text-gray-400">Loading gallery...</div>
          ) : galleryError ? (
            <div className="w-full text-center text-red-400">Gallery failed to load</div>
          ) : (
            <div className="flex w-full gap-3" style={{ height: 176, overflow: 'hidden' }}>
              {galleryImages.slice(0, 5).map((img, i) => (
                <img
                key={img.id || i}
                src={img.image || img.url || img.image_url}
                alt={img.title || `preview-${i}`}
                className="object-cover rounded-lg shadow-md"
                style={{ height: 176, width: "100%", flex: 1 }}
                />
              ))}
            </div>
          )}
        </section>
      )}
      {/* --- CTA to View Gallery --- */}
      {showRest && (
        <section className="w-full flex justify-center items-center mb-6 fade-in" style={{ animationDelay: '2.6s' }}>
          <button
            className="px-7 py-3 rounded-full bg-white/10 border border-white/25 text-white font-medium text-lg shadow-md hover:scale-105 transition"
            onClick={() => navigate('/gallery')}
            >
            View Full Gallery
          </button>
        </section>
      )}
      
      {/* ---- Contact Mail Form ---- */}
      {showRest && (
        <section className="w-full flex flex-col items-center my-8 fade-in" style={{ animationDelay: '3s' }}>
          <h2 className="text-3xl font-bold text-white text-left" style={{ marginBottom: 0 }}>Contact Me</h2>
          <form
            className="w-full max-w-lg bg-black/20 p-6 rounded-lg shadow"
            onSubmit={e => {
              e.preventDefault();
              const name = e.target.name.value;
              const email = e.target.email.value;
              const message = e.target.message.value;
              window.location = `mailto:pratikisawesom3@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + "\n\nEmail: " + email)}`;
            }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Contact Me</h3>
            <input name="name" type="text" required placeholder="Your name" className="w-full px-4 py-2 rounded mb-3 bg-black/15 text-white border border-white/20 focus:outline-none" />
            <input name="email" type="email" required placeholder="Your email" className="w-full px-4 py-2 rounded mb-3 bg-black/15 text-white border border-white/20 focus:outline-none" />
            <textarea name="message" required placeholder="Your message" rows={4} className="w-full px-4 py-2 rounded mb-3 bg-black/15 text-white border border-white/20 focus:outline-none" />
            <button type="submit" className="w-full px-6 py-2 rounded-full bg-primary text-white font-semibold shadow hover:scale-105 transition duration-150">
              Send via Email
            </button>
          </form>
        </section>
      )}
      {/* ---- Contact Me CTA ---- */}
      {showRest && (
        <section className="w-full flex justify-center items-center mt-4 mb-12 fade-in" style={{ animationDelay: '3.1s' }}>
          <button
            className="px-10 py-4 rounded-full bg-gradient-to-r from-[#FF2DD1] to-[#63C8FF] text-white text-xl font-bold shadow-lg hover:scale-105 transition"
            onClick={() => navigate('/contact')}
          >
            Contact Me Directly
          </button>
        </section>
      )}
      {/* Styles */}
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

export default Home;
