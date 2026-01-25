import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useState } from "react"
import { useProfile } from "../hooks/useAPI"

// Components
import FlipText from "./FlipText"
import AvailableIndicator from "./AvailableIndicator"
import HamburgerIcon from "./HamburgerIcon"


// Navigation links configuration
const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Resume", href: "/#resume" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Blogs", href: "/#blogs" },
]


export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { scrollY } = useScroll()

  // Fetch data using custom hooks
  const { data: profileData } = useProfile()

  // Scroll direction detection
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious()
    if (latest > previous && latest > 100) {
      setIsCollapsed(true)
      setIsMobileOpen(false) // Close mobile menu on scroll
    } else if (latest < previous) {
      setIsCollapsed(false)
    }
  })

  // Extract first letter for avatar fallback
  const avatarLetter = profileData?.name?.charAt(0).toUpperCase() || 'P'

  // Get availability status
  const isAvailable = profileData?.is_available || true

  return (
    <>
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden lg:block"
      >
        <motion.div
          animate={{ 
            gap: isCollapsed ? "12px" : "40px"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="navbar-container-desktop"
        >
          {/* Avatar with availability indicator */}
          <a href="/#home" className="avatar-link">
            {profileData?.profile_image_url ? (
              <img 
                src={profileData.profile_image_url} 
                alt={profileData.name}
                className="w-10 h-10 rounded-full object-cover "
              />
            ) : (
              <div className="avatar-fallback">
                {avatarLetter}
              </div>
            )}
            {isAvailable && (
              <div className="avatar-availability-indicator" />
            )}
          </a>

          {/* Navigation Links - Hidden when collapsed */}
          <motion.div
            animate={{ 
              opacity: isCollapsed ? 0 : 1,
              width: isCollapsed ? 0 : "auto",
              marginLeft: isCollapsed ? 0 : 0,
              marginRight: isCollapsed ? 0 : 0
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex items-center gap-10 overflow-hidden"
          >
            {NAV_LINKS.map((link) => (
              <FlipText key={link.label} href={link.href}>
                {link.label}
              </FlipText>
            ))}
          </motion.div>

          {/* Dynamic Right Section */}
          <motion.div
            className="flex items-center flex-shrink-0 overflow-hidden"
            animate={{
              marginLeft: isCollapsed ? "8px" : 0
            }}
            transition={{ duration: 0.5 }}
          >
            {isAvailable && (
              <AvailableIndicator variant={isCollapsed ? "link" : "pill"} />
            )}
          </motion.div>
        </motion.div>
      </motion.nav>

      {/* Mobile & Tablet Navbar */}
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50 lg:hidden"
        >
          {/* Top Mobile Navbar */}
          <div className="navbar-container-mobile flex items-center gap-3 relative">
            {/* Avatar */}
            <a href="/#home" className="avatar-link">
              {profileData?.profile_image_url ? (
                <img
                  src={profileData.profile_image_url}
                  alt={profileData.name}
                  className="w-10 h-10 rounded-full object-cover "
                />
              ) : (
                <div className="avatar-fallback">{avatarLetter}</div>
              )}
              {isAvailable && <div className="avatar-availability-indicator" />}
            </a>

            {/* Animated Availability */}
            {isAvailable && (
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                className={`flex ${
                  isMobileOpen ? "ml-auto pr-2" : "mx-auto"
                }`}
              >
                <AvailableIndicator
                  variant={isMobileOpen ? "pill" : "link"}
                  flip={false}
                />
              </motion.div>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="mobile-menu-button"
              aria-label="Toggle menu"
            >
              <HamburgerIcon isOpen={isMobileOpen} />
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <motion.div
            initial={false}
            animate={{
              opacity: isMobileOpen ? 1 : 0,
              scale: isMobileOpen ? 1 : 0.95,
              pointerEvents: isMobileOpen ? "auto" : "none",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="mobile-menu-overlay"
          >
            <div className="flex flex-col gap-6 text-center">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={false}
                  animate={{
                    opacity: isMobileOpen ? 1 : 0,
                    x: isMobileOpen ? 0 : -20,
                  }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-2xl font-light text-white hover:text-[#D0FF71] transition-colors duration-300"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="/#contact"
                initial={false}
                animate={{
                  opacity: isMobileOpen ? 1 : 0,
                  x: isMobileOpen ? 0 : -20,
                }}
                transition={{ delay: NAV_LINKS.length * 0.05 }}
                onClick={() => setIsMobileOpen(false)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-white text-black text-base font-medium hover:bg-[#D0FF71] transition-colors duration-300"
              >
                Contact
              </motion.a>
            </div>
          </motion.div>
        </motion.nav>
    </>
  )
}