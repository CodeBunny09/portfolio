// src/components/layout/Navbar.jsx
import React, { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Remove "Blog" from navLinks
  const navLinks = ["Work", "Gallery", "Resume", "Contact"];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-lg shadow-lg">
        <div className="max-w-7xl mx-auto px-8 flex justify-between items-center h-20 border-b border-white/15">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="text-2xl font-extrabold text-white tracking-tight"
            style={{
              textShadow: "0 0 14px rgba(255, 255, 255, 0.8)",
              letterSpacing: "1px",
              cursor: "pointer"
            }}
          >
            Pratik C
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10">
            {navLinks.map((link, index) => {
              if (link === "Contact") {
                return (
                  <Link
                    key={link}
                    to="/contact"
                    className="font-semibold text-white px-3 py-1 rounded-lg hover:text-accentYellow hover:bg-white/10 transition-all duration-300 relative group"
                    style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.4)" }}
                  >
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-1 transition-all duration-300 group-hover:w-full rounded"
                      style={{ background: "#4DFFBE" }}
                    ></span>
                  </Link>
                );
              } else if (link === "Gallery") {
                return (
                  <Link
                    key={link}
                    to="/gallery"
                    className="font-semibold text-white px-3 py-1 rounded-lg hover:text-accentYellow hover:bg-white/10 transition-all duration-300 relative group"
                    style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.4)" }}
                  >
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-1 transition-all duration-300 group-hover:w-full rounded"
                      style={{ background: "#FF2DD1" }}
                    ></span>
                  </Link>
                );
              } else if (link === "Work") {
                return (
                  <Link
                    key={link}
                    to="/work"
                    className="font-semibold text-white px-3 py-1 rounded-lg hover:text-accentYellow hover:bg-white/10 transition-all duration-300 relative group"
                    style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.4)" }}
                  >
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-1 transition-all duration-300 group-hover:w-full rounded"
                      style={{ background: "#00B2FF" }}
                    ></span>
                  </Link>
                );
              } else if (link === "Resume") {
                return (
                  <Link
                    key={link}
                    to="/resume"
                    className="font-semibold text-white px-3 py-1 rounded-lg hover:text-accentYellow hover:bg-white/10 transition-all duration-300 relative group"
                    style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.4)" }}
                  >
                    {link}
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-1 transition-all duration-300 group-hover:w-full rounded"
                      style={{ background: "#FFD600" }}
                    ></span>
                  </Link>
                );
              } else {
                return (
                  <a
                    key={link}
                    href="#"
                    className="font-semibold text-white px-3 py-1 rounded-lg hover:text-accentYellow hover:bg-white/10 transition-all duration-300 relative group"
                    style={{ textShadow: "0 0 8px rgba(255, 255, 255, 0.4)" }}
                  >
                    {link}
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-1 transition-all duration-300 group-hover:w-full rounded"
                      style={{
                        background: index % 2 === 0 ? "#FF2DD1" : "#4DFFBE",
                      }}
                    ></span>
                  </a>
                );
              }
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white hover:text-accentYellow transition-colors"
            >
              {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-8 py-6 space-y-3 bg-black/75 backdrop-blur-3xl rounded-b-xl shadow-xl">
            {navLinks.map((link, index) => {
              if (link === "Contact") {
                return (
                  <Link
                    key={link}
                    to="/contact"
                    className="block font-medium text-gray-100 px-2 py-2 rounded hover:bg-white/10 hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                    style={{ textShadow: "0 0 6px rgba(255, 255, 255, 0.5)" }}
                  >
                    {link}
                  </Link>
                );
              } else if (link === "Gallery") {
                return (
                  <Link
                    key={link}
                    to="/gallery"
                    className="block font-medium text-gray-100 px-2 py-2 rounded hover:bg-white/10 hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                    style={{ textShadow: "0 0 6px rgba(255, 255, 255, 0.5)" }}
                  >
                    {link}
                  </Link>
                );
              } else if (link === "Work") {
                return (
                  <Link
                    key={link}
                    to="/work"
                    className="block font-medium text-gray-100 px-2 py-2 rounded hover:bg-white/10 hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                    style={{ textShadow: "0 0 6px rgba(255, 255, 255, 0.5)" }}
                  >
                    {link}
                  </Link>
                );
              } else if (link === "Resume") {
                return (
                  <Link
                    key={link}
                    to="/resume"
                    className="block font-medium text-gray-100 px-2 py-2 rounded hover:bg-white/10 hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                    style={{ textShadow: "0 0 6px rgba(255, 255, 255, 0.5)" }}
                  >
                    {link}
                  </Link>
                );
              } else {
                return (
                  <a
                    key={link}
                    href="#"
                    className="block font-medium text-gray-100 px-2 py-2 rounded hover:bg-white/10 hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                    style={{ textShadow: "0 0 6px rgba(255, 255, 255, 0.5)" }}
                  >
                    {link}
                  </a>
                );
              }
            })}
          </div>
        </div>
      </nav>
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;
