import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaBlog,
  FaInstagram,
  FaStar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

import Navbar from "../components/layout/Navbar";
import CustomCursor from "../components/ui/CustomCursor";
import FeaturedProjectsHome from "../components/sections/FeaturedProjectsHome";

import { useProfile, useFeaturedProjects, useTestimonials } from "../hooks/useAPI";

import "../App.css";

// Clean minimal background - Portavia style
const MinimalBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Clean dark background */}
      <div className="absolute inset-0 bg-[#0a0a0a]"></div>

      {/* Minimal grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #fff 1px, transparent 1px),
            linear-gradient(to bottom, #fff 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Subtle static accent - no animation */}
      <div
        className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(94, 103, 230, 0.05) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
    </div>
  );
};

function Home() {
  const navigate = useNavigate();

  const [showRest, setShowRest] = useState(false);

  const { data: profile } = useProfile();
  const { data: testimonials = [] } = useTestimonials?.() || { data: [] };
  const { data: featuredProjects } = useFeaturedProjects();

  /* ---------------- TYPEWRITER (UNCHANGED LOGIC) ---------------- */
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const taglineParts = useMemo(
    () =>
      profile?.tagline
        ? profile.tagline.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
    [profile?.tagline]
  );

  useEffect(() => {
    const timer = setTimeout(() => setShowRest(true), 480);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!taglineParts.length) return;

    const currentWord = taglineParts[currentWordIndex];
    const speed = isDeleting ? 60 : 110;

    let timeout;

    if (!isDeleting && displayedText.length < currentWord.length) {
      timeout = setTimeout(
        () => setDisplayedText(currentWord.slice(0, displayedText.length + 1)),
        speed
      );
    } else if (!isDeleting && displayedText.length === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), 900);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(
        () => setDisplayedText(currentWord.slice(0, displayedText.length - 1)),
        speed
      );
    } else {
      setIsDeleting(false);
      setCurrentWordIndex((i) => (i + 1) % taglineParts.length);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, taglineParts, currentWordIndex]);

  /* ---------------- SOCIAL MAP (UNCHANGED LOGIC) ---------------- */
  const socials = {};
  if (profile?.social_links) {
    profile.social_links.forEach((s) => (socials[s.platform] = s.url));
  }

  /* ---------------- SCROLL ANIMATION REFS ---------------- */
  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const testimonialsRef = useRef(null);
  const horizontalStripRef = useRef(null);

  // Hero scroll progress
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Subtle parallax
  const imageY = useTransform(heroProgress, [0, 1], [0, -100]);
  const imageOpacity = useTransform(heroProgress, [0, 0.8, 1], [1, 0.6, 0.3]);

  // Horizontal strip
  const { scrollYProgress: stripProgress } = useScroll({
    target: horizontalStripRef,
    offset: ["start end", "end start"],
  });
  const stripX = useTransform(stripProgress, [0, 1], ["-15%", "15%"]);

  // Testimonials - FASTER motion
  const { scrollYProgress: testimonialsProgress } = useScroll({
    target: testimonialsRef,
    offset: ["start end", "end start"],
  });

  const testimonialsPerRow = Math.ceil(testimonials.length / 2);
  const row1 = testimonials.slice(0, testimonialsPerRow);
  const row2 = testimonials.slice(testimonialsPerRow);

  const row1X = useTransform(testimonialsProgress, [0, 1], ["-35%", "30%"]);
  const row2X = useTransform(testimonialsProgress, [0, 1], ["30%", "-35%"]);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] overflow-x-hidden">
      <CustomCursor />
      <MinimalBackground />
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <section
        ref={heroRef}
        className="relative z-10 max-w-[1200px] mx-auto px-6 sm:px-8 pt-32 sm:pt-40 pb-20 sm:pb-32 min-h-screen flex items-center"
      >
        <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT - Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/5 border border-white/10"
            >
              <div className="w-2 h-2 rounded-full bg-[#0bde66] animate-pulse"></div>
              <span className="text-sm text-[#8f8f8f] font-medium">Available for work</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6 font-heading">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="block mb-4 text-[#8f8f8f] font-normal text-3xl sm:text-4xl"
              >
                Hi, I'm {profile?.name || "Pratik"}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="block text-white"
              >
                {displayedText}
                <span className="inline-block w-[3px] h-[1em] ml-2 bg-[#5e67e6] animate-pulse" />
              </motion.span>
            </h1>

            {showRest && (
              <>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-lg text-[#8f8f8f] leading-relaxed mb-8 max-w-xl"
                >
                  {profile?.bio}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="flex gap-5 mb-10 text-2xl"
                >
                  {socials.github && (
                    <motion.a
                      whileHover={{ y: -3 }}
                      href={socials.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#8f8f8f] hover:text-white transition-colors"
                    >
                      <FaGithub />
                    </motion.a>
                  )}
                  {socials.linkedin && (
                    <motion.a
                      whileHover={{ y: -3 }}
                      href={socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#8f8f8f] hover:text-[#5e67e6] transition-colors"
                    >
                      <FaLinkedin />
                    </motion.a>
                  )}
                  {socials.twitter && (
                    <motion.a
                      whileHover={{ y: -3 }}
                      href={socials.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#8f8f8f] hover:text-[#09f] transition-colors"
                    >
                      <FaTwitter />
                    </motion.a>
                  )}
                  {socials.blog && (
                    <motion.a
                      whileHover={{ y: -3 }}
                      href={socials.blog}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#8f8f8f] hover:text-[#5e67e6] transition-colors"
                    >
                      <FaBlog />
                    </motion.a>
                  )}
                  {socials.instagram && (
                    <motion.a
                      whileHover={{ y: -3 }}
                      href={socials.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#8f8f8f] hover:text-[#5e67e6] transition-colors"
                    >
                      <FaInstagram />
                    </motion.a>
                  )}
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/contact")}
                  className="px-8 py-3 rounded-full bg-[#5e67e6] text-white font-semibold
                           hover:bg-[#4d56d9] transition-colors duration-200"
                >
                  Get in touch
                </motion.button>
              </>
            )}
          </motion.div>

          {/* RIGHT - Image */}
          {showRest && profile?.profile_image_url && (
            <motion.div
              className="order-1 lg:order-2 flex justify-center lg:justify-end"
              style={{
                y: imageY,
                opacity: imageOpacity,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="relative">
                <img
                  src={profile.profile_image_url}
                  alt="profile"
                  className="relative w-[280px] sm:w-[350px] lg:w-[420px] rounded-[20px] border border-white/10"
                />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ================= SKILLS STRIP ================= */}
      {showRest && (
        <section ref={horizontalStripRef} className="relative py-20 overflow-hidden border-y border-white/5">
          <motion.div
            style={{ x: stripX }}
            className="flex gap-8 items-center whitespace-nowrap"
          >
            {[
              "Full-Stack Development",
              "UI/UX Design",
              "API Architecture",
              "Cloud Solutions",
              "Performance Optimization",
              "Problem Solving",
            ].map((text, i) => (
              <div
                key={i}
                className="text-4xl font-bold text-[#8f8f8f]/30 select-none"
              >
                {text}
              </div>
            ))}
          </motion.div>
        </section>
      )}

      {/* ================= PROJECTS SECTION ================= */}
      {showRest && (
        <section ref={projectsRef} className="relative py-32">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl sm:text-6xl font-bold text-white mb-4 font-heading">
                Featured Work
              </h2>
              <p className="text-lg text-[#8f8f8f]">
                Selected projects that showcase my expertise
              </p>
            </motion.div>
          </div>

          <FeaturedProjectsHome projectsData={featuredProjects} />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-20"
          >
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/work")}
              className="px-8 py-3 rounded-full border border-white/10 text-white font-semibold
                       hover:border-white/20 hover:bg-white/5 transition-all duration-200"
            >
              View all projects
            </motion.button>
          </motion.div>
        </section>
      )}

      {/* ================= TESTIMONIALS SECTION ================= */}
      {showRest && testimonials.length > 0 && (
        <section ref={testimonialsRef} className="relative py-32 overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8 mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl sm:text-6xl font-bold text-white font-heading"
            >
              Client Testimonials
            </motion.h2>
          </div>

          {/* ROW 1 */}
          <motion.div
            style={{ x: row1X }}
            className="flex gap-4 mb-4 will-change-transform"
          >
            {row1.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="w-[340px] flex-shrink-0 p-6 rounded-[20px] bg-white/5 border border-white/10
                         hover:bg-white/[0.07] transition-all duration-300 backdrop-blur-sm"
              >
                <p className="text-[#8f8f8f] text-sm leading-relaxed mb-6 line-clamp-4">
                  "{t.content}"
                </p>

                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">
                      {t.client_name}
                    </p>
                    <p className="text-xs text-[#8f8f8f] truncate">
                      {t.client_title}
                    </p>
                  </div>

                  <div className="flex text-[#0bde66] gap-1 flex-shrink-0">
                    {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                      <FaStar key={idx} size={12} />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ROW 2 */}
          {row2.length > 0 && (
            <motion.div
              style={{ x: row2X }}
              className="flex gap-4 will-change-transform"
            >
              {row2.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="w-[340px] flex-shrink-0 p-6 rounded-[20px] bg-white/5 border border-white/10
                           hover:bg-white/[0.07] transition-all duration-300 backdrop-blur-sm"
                >
                  <p className="text-[#8f8f8f] text-sm leading-relaxed mb-6 line-clamp-4">
                    "{t.content}"
                  </p>

                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold text-sm truncate">
                        {t.client_name}
                      </p>
                      <p className="text-xs text-[#8f8f8f] truncate">
                        {t.client_title}
                      </p>
                    </div>

                    <div className="flex text-[#0bde66] gap-1 flex-shrink-0">
                      {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                        <FaStar key={idx} size={12} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      )}

      {/* ================= CTA SECTION ================= */}
      {showRest && (
        <section className="relative py-32">
          <div className="max-w-[1200px] mx-auto px-6 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto"
            >
              <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6">
                Let's work together
              </h2>
              <p className="text-lg text-[#8f8f8f] mb-12 leading-relaxed">
                I'm always interested in hearing about new projects and opportunities.
                Let's create something great together.
              </p>
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/contact")}
                className="px-10 py-4 rounded-full bg-[#5e67e6] text-white text-lg font-semibold
                         hover:bg-[#4d56d9] transition-colors duration-200"
              >
                Start a conversation
              </motion.button>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
