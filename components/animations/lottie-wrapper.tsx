"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface LottieWrapperProps {
  animationData?: any
  loop?: boolean
  autoplay?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function LottieWrapper({
  animationData,
  loop = true,
  autoplay = true,
  className = "",
  style = {},
}: LottieWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animation: any = null

    const loadLottie = async () => {
      try {
        const lottie = await import("lottie-web")

        if (containerRef.current && animationData) {
          animation = lottie.default.loadAnimation({
            container: containerRef.current,
            renderer: "svg",
            loop,
            autoplay,
            animationData,
          })
        }
      } catch (error) {
        console.error("Failed to load Lottie animation:", error)
      }
    }

    loadLottie()

    return () => {
      if (animation) {
        animation.destroy()
      }
    }
  }, [animationData, loop, autoplay])

  return <div ref={containerRef} className={className} style={style} />
}
