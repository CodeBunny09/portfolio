// src/components/layout/Navbar.jsx - Updated with new color palette
import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = ["Work", "About", "Blog", "Resume", "Contact"];

  return (
    <nav 
      className="sticky top-0 left-0 w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
        {/* Logo/Brand */}
        <div 
          className="text-2xl font-bold text-white"
          style={{
            textShadow: '0 0 15px rgba(255, 255, 255, 0.8)'
          }}
        >
          Pratik
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            <a
              key={link}
              href="#"
              className="font-medium text-white hover:text-accentYellow transition-all duration-300 relative group"
              style={{
                textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
              }}
            >
              {link}
              <span 
                className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                style={{ 
                  background: index % 2 === 0 ? '#FF2DD1' : '#4DFFBE' 
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
      {isOpen && (
        <div 
          className="md:hidden absolute top-20 left-0 w-full"
        >
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={link}
                href="#"
                className="block font-medium text-gray-100 hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
                style={{
                  textShadow: '0 0 8px rgba(255, 255, 255, 0.6)'
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;