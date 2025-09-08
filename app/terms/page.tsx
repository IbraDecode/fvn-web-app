import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, AlertTriangle, Users, FileText } from "lucide-react"
import Link from "next/link"
import { APP_CONFIG, FOOTER_TEXT } from "@/lib/constants"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Beranda
              </Link>
            </Button>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold">Syarat & Ketentuan</h1>
              <p className="text-muted-foreground">Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  1. Penerimaan Ketentuan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Dengan menggunakan layanan {APP_CONFIG.fullName} ("FVN", "kami", "layanan"), Anda setuju untuk terikat
                  dengan syarat dan ketentuan ini. Jika Anda tidak setuju dengan ketentuan ini, mohon untuk tidak
                  menggunakan layanan kami.
                </p>
                <p>
                  FVN menyediakan nomor virtual gratis untuk menerima SMS OTP dari berbagai platform untuk keperluan
                  testing, development, dan verifikasi non-kritis.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  2. Penggunaan yang Diizinkan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  <strong>Penggunaan yang DIIZINKAN:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Testing dan development aplikasi</li>
                  <li>Verifikasi akun untuk keperluan non-komersial</li>
                  <li>Quality assurance dan pengujian sistem</li>
                  <li>Pembelajaran dan riset teknologi</li>
                </ul>

                <p>
                  <strong>Penggunaan yang DILARANG:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Aktivitas penipuan atau kriminal</li>
                  <li>Spam atau penyalahgunaan platform lain</li>
                  <li>Melanggar Terms of Service platform pihak ketiga</li>
                  <li>Automated scraping atau bot abuse</li>
                  <li>Menjual atau memperdagangkan nomor virtual</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  3. Batasan Layanan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Layanan FVN disediakan "sebagaimana adanya" tanpa jaminan ketersediaan 100%. Kami menerapkan rate
                  limiting untuk mencegah penyalahgunaan dan menjaga kualitas layanan.
                </p>
                <p>
                  Kami berhak untuk membatasi, menangguhkan, atau menghentikan akses pengguna yang melanggar ketentuan
                  ini tanpa pemberitahuan sebelumnya.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>4. Privasi & Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Kami menghormati privasi pengguna dan hanya mengumpulkan data yang diperlukan untuk operasional
                  layanan. Untuk informasi lengkap, silakan baca{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Kebijakan Privasi
                  </Link>{" "}
                  kami.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>5. Perubahan Ketentuan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Kami dapat memperbarui ketentuan ini sewaktu-waktu. Perubahan akan diberitahukan melalui website dan
                  mulai berlaku setelah dipublikasikan.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>6. Kontak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Jika Anda memiliki pertanyaan tentang ketentuan ini, silakan hubungi kami melalui halaman{" "}
                  <Link href="/faq" className="text-primary hover:underline">
                    FAQ
                  </Link>{" "}
                  atau sistem support kami.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            {FOOTER_TEXT}
          </div>
        </div>
      </div>
    </div>
  )
}
