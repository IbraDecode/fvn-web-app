"use client"

import { useEffect, useRef } from "react"
import lottie from "lottie-web"

interface LottieAnimationProps {
  animationData?: any
  animationUrl?: string
  className?: string
  loop?: boolean
  autoplay?: boolean
  speed?: number
}

export default function LottieAnimation({
  animationData,
  animationUrl,
  className = "w-full h-full",
  loop = true,
  autoplay = true,
  speed = 1,
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<any>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Default animation data untuk smartphone/phone icon
    const defaultAnimationData = {
      v: "5.7.4",
      fr: 30,
      ip: 0,
      op: 60,
      w: 200,
      h: 200,
      nm: "Phone Animation",
      ddd: 0,
      assets: [],
      layers: [
        {
          ddd: 0,
          ind: 1,
          ty: 4,
          nm: "Phone",
          sr: 1,
          ks: {
            o: { a: 0, k: 100 },
            r: {
              a: 1,
              k: [
                { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [0] },
                { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 30, s: [5] },
                { t: 60, s: [0] }
              ]
            },
            p: { a: 0, k: [100, 100, 0] },
            a: { a: 0, k: [0, 0, 0] },
            s: {
              a: 1,
              k: [
                { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 0, s: [100, 100, 100] },
                { i: { x: [0.833], y: [0.833] }, o: { x: [0.167], y: [0.167] }, t: 30, s: [110, 110, 100] },
                { t: 60, s: [100, 100, 100] }
              ]
            }
          },
          ao: 0,
          shapes: [
            {
              ty: "gr",
              it: [
                {
                  ty: "rc",
                  d: 1,
                  s: { a: 0, k: [60, 100] },
                  p: { a: 0, k: [0, 0] },
                  r: { a: 0, k: 10 }
                },
                {
                  ty: "fl",
                  c: { a: 0, k: [0, 0.941, 1, 1] },
                  o: { a: 0, k: 100 }
                },
                {
                  ty: "tr",
                  p: { a: 0, k: [0, 0] },
                  a: { a: 0, k: [0, 0] },
                  s: { a: 0, k: [100, 100] },
                  r: { a: 0, k: 0 },
                  o: { a: 0, k: 100 }
                }
              ]
            }
          ],
          ip: 0,
          op: 60,
          st: 0,
          bm: 0
        }
      ]
    }

    const loadAnimation = async () => {
      try {
        let data = animationData || defaultAnimationData

        if (animationUrl && !animationData) {
          const response = await fetch(animationUrl)
          data = await response.json()
        }

        animationRef.current = lottie.loadAnimation({
          container: containerRef.current!,
          renderer: "svg",
          loop,
          autoplay,
          animationData: data,
        })

        animationRef.current.setSpeed(speed)
      } catch (error) {
        console.error("Error loading Lottie animation:", error)
      }
    }

    loadAnimation()

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy()
      }
    }
  }, [animationData, animationUrl, loop, autoplay, speed])

  return <div ref={containerRef} className={className} />
}

