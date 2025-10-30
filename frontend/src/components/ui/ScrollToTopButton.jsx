// src/components/ui/ScrollToTopButton.jsx
import React from "react";

function ScrollToTopButton({ visible }) {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`
        fixed bottom-6 right-5 z-50
        px-4 py-3
        bg-white/80 hover:bg-white transition
        rounded-full shadow-lg
        backdrop-blur
        text-black text-xl
        flex items-center justify-center
        ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        transition-opacity duration-400
      `}
      aria-label="Scroll to top"
      style={{
        boxShadow: "0 2px 12px 0 #0003",
        fontSize: 24,
        fontWeight: 700,
      }}
    >
      ↑
    </button>
  );
}

export default ScrollToTopButton;
