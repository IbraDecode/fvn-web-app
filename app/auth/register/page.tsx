"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserPlus, ArrowRight, Loader2, Check } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { APP_CONFIG } from "@/lib/constants"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Password minimal 8 karakter"
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return "Password harus mengandung huruf besar, huruf kecil, dan angka"
    }
    return null
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)

    // Validation
    if (password !== confirmPassword) {
      toast.error("Password tidak cocok")
      setIsLoading(false)
      return
    }

    const passwordError = validatePassword(password)
    if (passwordError) {
      toast.error(passwordError)
      setIsLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            display_name: displayName || email.split("@")[0],
          },
        },
      })

      if (error) throw error

      toast.success("Registrasi berhasil! Periksa email untuk verifikasi.")
      router.push("/auth/verify-email")
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Terjadi kesalahan saat registrasi"
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass neon-glow mb-4">
            <UserPlus className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-balance">
            Bergabung dengan <span className="text-primary">{APP_CONFIG.name}</span>
          </h1>
          <p className="text-muted-foreground mt-2">Buat akun gratis dan mulai gunakan nomor virtual</p>
        </div>

        <Card className="glass glass-hover neon-glow border-border/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Daftar</CardTitle>
            <CardDescription>Buat akun baru untuk mengakses layanan FVN</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Nama Tampilan (Opsional)</Label>
                <Input
                  id="displayName"
                  type="text"
                  placeholder="Nama Anda"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="glass border-border/50 focus:border-primary/50 focus:ring-primary/20"
                />
              </div>

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
                  placeholder="Minimal 8 karakter"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass border-border/50 focus:border-primary/50 focus:ring-primary/20"
                />
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className={`flex items-center gap-2 ${password.length >= 8 ? "text-green-400" : ""}`}>
                    <Check className={`w-3 h-3 ${password.length >= 8 ? "opacity-100" : "opacity-30"}`} />
                    Minimal 8 karakter
                  </div>
                  <div
                    className={`flex items-center gap-2 ${/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password) ? "text-green-400" : ""}`}
                  >
                    <Check
                      className={`w-3 h-3 ${/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password) ? "opacity-100" : "opacity-30"}`}
                    />
                    Huruf besar, kecil, dan angka
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Ulangi password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                    Mendaftar...
                  </>
                ) : (
                  <>
                    Daftar Sekarang
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Sudah punya akun?{" "}
                <Link
                  href="/auth/login"
                  className="text-primary hover:text-primary/80 font-medium underline underline-offset-4 transition-colors"
                >
                  Masuk di sini
                </Link>
              </p>
            </div>

            <div className="mt-4 text-xs text-muted-foreground text-center">
              Dengan mendaftar, Anda menyetujui{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Syarat & Ketentuan
              </Link>{" "}
              dan{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Kebijakan Privasi
              </Link>{" "}
              kami.
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
