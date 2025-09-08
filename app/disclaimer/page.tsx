import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, AlertTriangle, Shield, Info, ExternalLink } from "lucide-react"
import Link from "next/link"
import { FOOTER_TEXT } from "@/lib/constants"

export default function DisclaimerPage() {
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
              <div className="w-16 h-16 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-8 h-8 text-orange-400" />
              </div>
              <h1 className="text-4xl font-bold">Disclaimer</h1>
              <p className="text-muted-foreground">Penting untuk dibaca sebelum menggunakan layanan FVN</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <Card className="glass border-orange-500/20 bg-orange-500/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <AlertTriangle className="w-5 h-5" />
                  Peringatan Penting
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-orange-200">
                  <strong>
                    FVN (Free Virtual Number) adalah layanan untuk keperluan testing, development, dan verifikasi
                    non-kritis.
                  </strong>{" "}
                  Layanan ini TIDAK dimaksudkan untuk digunakan dalam aktivitas yang melanggar hukum atau Terms of
                  Service platform lain.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  1. Penggunaan yang Bertanggung Jawab
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Dengan menggunakan FVN, Anda setuju untuk:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Menggunakan layanan hanya untuk tujuan yang sah dan etis</li>
                  <li>Mematuhi semua hukum dan regulasi yang berlaku</li>
                  <li>Menghormati Terms of Service platform pihak ketiga</li>
                  <li>Tidak menggunakan layanan untuk penipuan atau kejahatan</li>
                  <li>Tidak menyalahgunakan sistem atau melakukan spam</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  2. Batasan Layanan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  <strong>Ketersediaan:</strong>
                </p>
                <p>
                  Layanan FVN disediakan "sebagaimana adanya" tanpa jaminan ketersediaan 100%. Kami tidak bertanggung
                  jawab atas downtime, kehilangan data, atau gangguan layanan.
                </p>

                <p>
                  <strong>Akurasi Data:</strong>
                </p>
                <p>
                  Meskipun kami berusaha menyediakan layanan yang akurat dan reliable, kami tidak menjamin bahwa semua
                  nomor virtual akan berfungsi dengan sempurna untuk semua platform.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5 text-primary" />
                  3. Platform Pihak Ketiga
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  FVN menyediakan nomor virtual untuk menerima SMS dari berbagai platform seperti WhatsApp, Facebook,
                  Telegram, dll. Kami:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>TIDAK berafiliasi dengan platform-platform tersebut</li>
                  <li>TIDAK bertanggung jawab atas perubahan kebijakan mereka</li>
                  <li>TIDAK menjamin kompatibilitas berkelanjutan</li>
                  <li>Mendorong pengguna untuk mematuhi ToS platform tersebut</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>4. Pembatasan Tanggung Jawab</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Dalam batas maksimal yang diizinkan hukum, FVN dan pengembangnya tidak bertanggung jawab atas:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Kerugian langsung atau tidak langsung dari penggunaan layanan</li>
                  <li>Penyalahgunaan layanan oleh pengguna lain</li>
                  <li>Tindakan yang melanggar hukum yang dilakukan pengguna</li>
                  <li>Kehilangan data atau informasi</li>
                  <li>Gangguan bisnis atau operasional</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>5. Privasi & Keamanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Meskipun kami menerapkan langkah-langkah keamanan yang wajar, pengguna bertanggung jawab untuk:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Menjaga kerahasiaan akun dan password</li>
                  <li>Tidak membagikan informasi sensitif melalui SMS</li>
                  <li>Memahami bahwa SMS dapat dibaca oleh pihak lain</li>
                  <li>Menggunakan layanan dengan risiko sendiri</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>6. Perubahan Layanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Kami berhak untuk mengubah, menangguhkan, atau menghentikan layanan sewaktu-waktu tanpa pemberitahuan
                  sebelumnya. Pengguna disarankan untuk tidak bergantung sepenuhnya pada layanan ini untuk kebutuhan
                  kritis.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>7. Hukum yang Berlaku</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Disclaimer ini tunduk pada hukum Republik Indonesia. Setiap sengketa akan diselesaikan melalui
                  pengadilan yang berwenang di Indonesia.
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
