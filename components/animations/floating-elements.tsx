"use client"

import { motion } from "framer-motion"
import { Smartphone, MessageSquare, Shield, Zap } from "lucide-react"

const floatingVariants = {
  animate: {
    y: [0, -20, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

const icons = [
  { Icon: Smartphone, color: "text-[#00F0FF]", delay: 0 },
  { Icon: MessageSquare, color: "text-[#8A2BE2]", delay: 1.5 },
  { Icon: Shield, color: "text-green-400", delay: 3 },
  { Icon: Zap, color: "text-yellow-400", delay: 4.5 },
]

export default function FloatingElements() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map(({ Icon, color, delay }, index) => (
        <motion.div
          key={index}
          className={`absolute ${color} opacity-20`}
          style={{
            left: `${20 + index * 20}%`,
            top: `${30 + index * 15}%`,
          }}
          variants={floatingVariants}
          animate="animate"
          transition={{ delay }}
        >
          <Icon className="w-8 h-8" />
        </motion.div>
      ))}
    </div>
  )
}
