import { motion } from "framer-motion"
import { useState } from "react"

// 3D Flip Text Component
// - as="a" (default) → renders anchor
// - as="span" → renders non-anchor (safe inside links)
export default function FlipText({
  children,
  href,
  as = "a",
  className = "",
}) {
  const [isHovered, setIsHovered] = useState(false)
  const Component = as

  return (
    <Component
      {...(href && as === "a" ? { href } : {})}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`nav-flip-text ${className}`}
    >
      <div className="relative flex flex-col h-full overflow-visible">
        {/* Primary Text */}
        <motion.span
          animate={{
            rotateX: isHovered ? -90 : 0,
            y: isHovered ? "-100%" : "0%",
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          className="text-base font-light text-white whitespace-nowrap h-[26px] flex items-center leading-none"
          style={{
            transformOrigin: "center bottom",
            backfaceVisibility: "hidden",
          }}
        >
          {children}
        </motion.span>

        {/* Hover Text */}
        <motion.span
          animate={{
            rotateX: isHovered ? 0 : 90,
            y: isHovered ? "-100%" : "0%",
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
          className="absolute top-full text-base font-light text-[#D0FF71] whitespace-nowrap h-[26px] flex items-center leading-none"
          style={{
            transformOrigin: "center top",
            backfaceVisibility: "hidden",
          }}
        >
          {children}
        </motion.span>
      </div>
    </Component>
  )
}
