import { motion, AnimatePresence } from "framer-motion"
import FlipText from "./FlipText"

export default function AvailableIndicator({ variant = "pill", flip = true }) {
  const isPill = variant === "pill"

  return (
    <motion.a
      href="/#contact"
      layout
      whileHover={isPill ? { scale: 1.03 } : {}}
      whileTap={isPill ? { scale: 0.98 } : {}}
      transition={{ type: "spring", stiffness: 500, damping: 35 }}
      className={
        isPill
          ? flip
            ? "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white text-black text-base font-medium hover:bg-[#D0FF71] transition-colors"
            : "flex items-center gap-2 text-base font-light text-white"
          : "flex items-center gap-2 text-base font-light text-white hover:text-[#D0FF71] transition-colors"
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        {isPill ? flip ? (
          <motion.span
            key="contact"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="whitespace-nowrap align-middle"
          >
            Contact
          </motion.span>
        ) : (
          <motion.span
            key="contact"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="whitespace-nowrap align-middle"
          >
            ------ Menu ------
          </motion.span>
        )
        : flip ? (
          <motion.span
            key="available-flip"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="whitespace-nowrap align-middle"
          >
            <FlipText as="span">Available for work</FlipText>
          </motion.span>
        ) : (
          <motion.span
            key="available"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="whitespace-nowrap align-middle overflow-hidden"
          >
            Available for work
          </motion.span>
        )}
      </AnimatePresence>

      {!isPill && (
        <span className="availability-dot-container">
          <span className="availability-dot-glow" />
          <span className="availability-dot" />
        </span>
      )}
    </motion.a>
  )
}
