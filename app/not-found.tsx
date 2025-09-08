"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, ArrowLeft, Search } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { APP_CONFIG } from "@/lib/constants"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass border-border/50 text-center">
            <CardContent className="p-12">
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="mb-6"
              >
                <div className="text-8xl font-bold text-primary/50 mb-4">404</div>
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-primary" />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4 mb-8"
              >
                <h1 className="text-2xl font-bold">Halaman Tidak Ditemukan</h1>
                <p className="text-muted-foreground">
                  Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman telah dipindahkan atau URL salah.
                </p>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-3 justify-center"
              >
                <Button variant="outline" className="glass border-border/50 bg-transparent" asChild>
                  <Link href="javascript:history.back()">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Kembali
                  </Link>
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
                <p className="text-xs text-muted-foreground">Kembali ke {APP_CONFIG.fullName}</p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
