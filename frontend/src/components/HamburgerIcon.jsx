import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useState } from "react"

// Custom 2-line hamburger menu icon
export default function HamburgerIcon({ isOpen }) {
  return (
    <div className="relative w-5 h-4 flex items-center justify-center">
      <motion.div
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 0 : -3,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="absolute w-full h-0.5 bg-black rounded-full"
        style={{ transformOrigin: "center center" }}
      />
      <motion.div
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? 0 : 3,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="absolute w-full h-0.5 bg-black rounded-full"
        style={{ transformOrigin: "center center" }}
      />
    </div>
  )
}
