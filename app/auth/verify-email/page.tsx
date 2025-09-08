import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { APP_CONFIG } from "@/lib/constants"

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass neon-glow mb-4">
            <Mail className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-balance">Periksa Email Anda</h1>
        </div>

        <Card className="glass glass-hover neon-glow border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Verifikasi Email</CardTitle>
            <CardDescription>Kami telah mengirim link verifikasi ke email Anda</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="p-4 rounded-lg glass">
              <p className="text-sm text-muted-foreground">
                Klik link verifikasi di email Anda untuk mengaktifkan akun dan mulai menggunakan {APP_CONFIG.name}.
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                Tidak menerima email? Periksa folder spam atau coba daftar ulang.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <Button asChild className="neon-glow">
                <Link href="/auth/login">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Kembali ke Login
                </Link>
              </Button>

              <Button variant="outline" asChild className="glass border-border/50 bg-transparent">
                <Link href="/auth/register">Daftar Ulang</Link>
              </Button>
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
