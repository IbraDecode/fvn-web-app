import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Shield, Database, Eye, Lock } from "lucide-react"
import Link from "next/link"
import { FOOTER_TEXT } from "@/lib/constants"

export default function PrivacyPage() {
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
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold">Kebijakan Privasi</h1>
              <p className="text-muted-foreground">Terakhir diperbarui: {new Date().toLocaleDateString("id-ID")}</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-primary" />
                  1. Data yang Kami Kumpulkan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  <strong>Informasi Akun:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Email address (untuk autentikasi)</li>
                  <li>Display name (opsional)</li>
                  <li>Avatar/foto profil (opsional)</li>
                  <li>Tanggal registrasi</li>
                </ul>

                <p>
                  <strong>Data Penggunaan:</strong>
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Riwayat nomor virtual yang diminta</li>
                  <li>Log aktivitas OTP (untuk analytics)</li>
                  <li>Preferensi provider dan negara</li>
                  <li>Statistik penggunaan (anonim)</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  2. Bagaimana Kami Menggunakan Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc list-inside space-y-2">
                  <li>Menyediakan dan memelihara layanan FVN</li>
                  <li>Autentikasi dan manajemen akun pengguna</li>
                  <li>Monitoring dan analytics untuk peningkatan layanan</li>
                  <li>Mencegah penyalahgunaan dan fraud</li>
                  <li>Komunikasi terkait layanan (jika diperlukan)</li>
                </ul>

                <p className="mt-4">
                  <strong>Kami TIDAK:</strong> Menjual, menyewakan, atau membagikan data pribadi Anda kepada pihak
                  ketiga untuk tujuan komersial.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-primary" />
                  3. Keamanan Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi data
                  pribadi Anda:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Enkripsi data in-transit dan at-rest</li>
                  <li>Row Level Security (RLS) pada database</li>
                  <li>Autentikasi multi-faktor untuk admin</li>
                  <li>Regular security audits dan monitoring</li>
                  <li>Akses data berdasarkan prinsip least privilege</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>4. Retensi Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Data pribadi akan disimpan selama akun Anda aktif. Setelah penghapusan akun, data akan dihapus dalam
                  waktu 30 hari, kecuali jika diperlukan untuk keperluan hukum.
                </p>
                <p>
                  Data OTP dan nomor virtual akan dihapus otomatis setelah periode tertentu untuk menjaga privasi dan
                  efisiensi sistem.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>5. Hak Pengguna</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Anda memiliki hak untuk:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Mengakses data pribadi yang kami simpan</li>
                  <li>Memperbarui atau mengoreksi informasi akun</li>
                  <li>Menghapus akun dan data pribadi</li>
                  <li>Membatasi pemrosesan data tertentu</li>
                  <li>Mengajukan keluhan terkait privasi</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>6. Cookies & Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>Kami menggunakan cookies dan teknologi serupa untuk:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Menjaga sesi login pengguna</li>
                  <li>Menyimpan preferensi UI (dark mode, dll)</li>
                  <li>Analytics penggunaan (anonim)</li>
                  <li>Keamanan dan pencegahan fraud</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>7. Perubahan Kebijakan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Kebijakan privasi ini dapat diperbarui sewaktu-waktu. Perubahan signifikan akan diberitahukan melalui
                  email atau notifikasi di platform.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle>8. Kontak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Untuk pertanyaan terkait privasi atau permintaan akses data, silakan hubungi kami melalui halaman
                  support atau email privacy@fvn.ibra.biz.id
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
