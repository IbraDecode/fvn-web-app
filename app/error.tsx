"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, Home, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect } from "react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("[v0] Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass border-red-500/20 bg-red-500/5 text-center">
            <CardContent className="p-12">
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mb-6"
              >
                <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-8 h-8 text-red-400" />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4 mb-8"
              >
                <h1 className="text-2xl font-bold text-red-400">Terjadi Kesalahan</h1>
                <p className="text-muted-foreground">
                  Maaf, terjadi kesalahan yang tidak terduga. Tim kami telah diberitahu dan sedang menangani masalah
                  ini.
                </p>
                {process.env.NODE_ENV === "development" && (
                  <details className="text-left text-xs bg-muted/20 p-3 rounded border">
                    <summary className="cursor-pointer mb-2 font-medium">Detail Error (Development)</summary>
                    <pre className="whitespace-pre-wrap text-red-400">{error.message}</pre>
                    {error.digest && <p className="mt-2 text-muted-foreground">Digest: {error.digest}</p>}
                  </details>
                )}
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 justify-center"
              >
                <Button variant="outline" className="glass border-border/50 bg-transparent" onClick={reset}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Coba Lagi
                </Button>
                <Button className="neon-glow" asChild>
                  <Link href="/">
                    <Home className="w-4 h-4 mr-2" />
                    Beranda
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 pt-6 border-t border-border/50"
              >
                <p className="text-xs text-muted-foreground">Jika masalah berlanjut, silakan hubungi support kami</p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
