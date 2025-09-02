// src/components/layout/Navbar.jsx
import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = ["Work", "Gallery", "Blog", "Resume", "Contact"];

  return (
    <>
      {/* Fixed Transparent Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div
            className="text-xl font-bold text-white"
            style={{
              textShadow: "0 0 12px rgba(255, 255, 255, 0.7)",
            }}
          >
            Pratik C
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link, index) => (
              <a
                key={link}
                href="#"
                className="font-medium text-white hover:text-accentYellow transition-all duration-300 relative group"
                style={{
                  textShadow: "0 0 8px rgba(255, 255, 255, 0.4)",
                }}
              >
                {link}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                  style={{
                    background: index % 2 === 0 ? "#FF2DD1" : "#4DFFBE",
                  }}
                ></span>
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white hover:text-accentYellow transition-colors"
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-4 space-y-3 bg-black/60 backdrop-blur-sm">
            {navLinks.map((link, index) => (
              <a
                key={link}
                href="#"
                className="block font-medium text-gray-100 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
                style={{
                  textShadow: "0 0 6px rgba(255, 255, 255, 0.5)",
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
