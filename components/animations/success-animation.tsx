"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface SuccessAnimationProps {
  message?: string
  onComplete?: () => void
}

export default function SuccessAnimation({ message = "Success!", onComplete }: SuccessAnimationProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      onAnimationComplete={onComplete}
      className="flex flex-col items-center justify-center space-y-2"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <CheckCircle className="w-12 h-12 text-green-400" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-sm text-center"
      >
        {message}
      </motion.p>
    </motion.div>
  )
}
