// src/components/layout/Navbar.jsx
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ["Work", "Gallery", "Blog", "Resume", "Contact"];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6 md:px-8 h-20 flex items-center justify-between">
          {/* Brand */}
          <Link
            to="/"
            className="text-xl font-semibold tracking-tight text-white"
          >
            Pratik C
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              if (link === "Contact") {
                return (
                  <Link
                    key={link}
                    to="/contact"
                    className="px-6 py-2 rounded-full bg-[#5e67e6] text-white text-sm font-semibold
                             hover:bg-[#4d56d9] transition-colors duration-200"
                  >
                    Let's Talk
                  </Link>
                );
              }

              const path =
                link === "Work"
                  ? "/work"
                  : link === "Gallery"
                  ? "/gallery"
                  : link === "Resume"
                  ? "/resume"
                  : link === "Blog"
                  ? "/blog"
                  : "#";

              return (
                <Link
                  key={link}
                  to={path}
                  className="text-sm font-medium text-[#8f8f8f] hover:text-white
                           transition-colors duration-200 capitalize"
                >
                  {link}
                </Link>
              );
            })}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-500 overflow-hidden ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-[#0a0a0a]/95 backdrop-blur-xl px-6 py-6 space-y-4 border-t border-white/10">
            {navLinks.map((link) => {
              if (link === "Contact") {
                return (
                  <Link
                    key={link}
                    to="/contact"
                    className="inline-block w-full text-center mt-4 px-6 py-2 rounded-full
                             bg-[#5e67e6] text-white hover:bg-[#4d56d9]
                             transition-colors duration-200 font-semibold text-sm"
                    onClick={() => setIsOpen(false)}
                  >
                    Let's Talk
                  </Link>
                );
              }

              const path =
                link === "Work"
                  ? "/work"
                  : link === "Gallery"
                  ? "/gallery"
                  : link === "Resume"
                  ? "/resume"
                  : link === "Blog"
                  ? "/blog"
                  : "#";

              return (
                <Link
                  key={link}
                  to={path}
                  className="block text-sm capitalize text-[#8f8f8f] hover:text-white
                           transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;
