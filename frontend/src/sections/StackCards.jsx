import { motion, useScroll, useTransform } from "framer-motion"

const cards = [
  { id: 1, color: "bg-red-500", label: "Card One" },
  { id: 2, color: "bg-blue-500", label: "Card Two" },
  { id: 3, color: "bg-green-500", label: "Card Three" },
  { id: 4, color: "bg-purple-500", label: "Card Four" },
]

export default function StackCards() {
  const { scrollYProgress } = useScroll()

  return (
    <div className="relative h-[400vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="relative w-80 h-96">
          {cards.map((card, index) => {
            const start = index / cards.length
            const end = (index + 1) / cards.length

            const y = useTransform(scrollYProgress, [start, end], [120, 0])
            const opacity = useTransform(scrollYProgress, [start, end], [0, 1])
            const scale = useTransform(scrollYProgress, [start, end], [0.96, 1])

            return (
              <motion.div
                key={card.id}
                style={{
                  y,
                  opacity,
                  scale,
                  top: index * 15,
                  zIndex: index + 1,
                }}
                className={`absolute inset-0 rounded-2xl shadow-2xl ${card.color}
                  flex items-center justify-center text-2xl font-bold`}
              >
                {card.label}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
