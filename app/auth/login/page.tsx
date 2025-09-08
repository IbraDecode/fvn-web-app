"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Shield, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { APP_CONFIG } from "@/lib/constants"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      toast.success("Login berhasil! Mengarahkan ke dashboard...")
      router.push("/dashboard")
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Terjadi kesalahan saat login"
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass neon-glow mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-balance">
            Masuk ke <span className="text-primary">{APP_CONFIG.name}</span>
          </h1>
          <p className="text-muted-foreground mt-2">Akses dashboard dan kelola nomor virtual Anda</p>
        </div>

        <Card className="glass glass-hover neon-glow border-border/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Masuk</CardTitle>
            <CardDescription>Masukkan email dan password untuk mengakses akun Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nama@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass border-border/50 focus:border-primary/50 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass border-border/50 focus:border-primary/50 focus:ring-primary/20"
                />
              </div>

              <Button
                type="submit"
                className="w-full neon-glow hover:neon-glow-secondary transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Masuk...
                  </>
                ) : (
                  <>
                    Masuk
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Belum punya akun?{" "}
                <Link
                  href="/auth/register"
                  className="text-primary hover:text-primary/80 font-medium underline underline-offset-4 transition-colors"
                >
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Kembali ke beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
