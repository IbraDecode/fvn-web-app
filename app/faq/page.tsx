import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, HelpCircle, MessageSquare, Shield, Zap, Globe } from "lucide-react"
import Link from "next/link"
import { FOOTER_TEXT } from "@/lib/constants"

export default function FAQPage() {
  const faqs = [
    {
      category: "Umum",
      icon: <HelpCircle className="w-5 h-5" />,
      questions: [
        {
          q: "Apa itu FVN (Free Virtual Number)?",
          a: "FVN adalah layanan yang menyediakan nomor virtual gratis untuk menerima SMS OTP dari berbagai platform seperti WhatsApp, Facebook, Telegram, dll. Layanan ini ditujukan untuk keperluan testing, development, dan verifikasi non-kritis.",
        },
        {
          q: "Apakah FVN benar-benar gratis?",
          a: "Ya, FVN sepenuhnya gratis untuk digunakan. Tidak ada biaya tersembunyi atau pembayaran yang diperlukan. Kami menyediakan layanan ini untuk membantu developer dan tester.",
        },
        {
          q: "Apakah perlu registrasi untuk menggunakan FVN?",
          a: "Ya, Anda perlu membuat akun untuk menggunakan layanan FVN. Registrasi gratis dan hanya memerlukan email address. Ini membantu kami mencegah penyalahgunaan dan memberikan pengalaman yang lebih baik.",
        },
      ],
    },
    {
      category: "Penggunaan",
      icon: <Zap className="w-5 h-5" />,
      questions: [
        {
          q: "Bagaimana cara mendapatkan nomor virtual?",
          a: "Setelah login ke dashboard, pilih provider (WhatsApp, Facebook, dll) dan negara yang diinginkan, lalu klik 'Dapatkan Nomor Gratis'. Nomor akan muncul dalam beberapa detik.",
        },
        {
          q: "Berapa lama nomor virtual dapat digunakan?",
          a: "Nomor virtual biasanya aktif selama 10-15 menit setelah dibuat. Setelah itu, nomor akan kembali ke pool untuk digunakan pengguna lain.",
        },
        {
          q: "Apakah OTP muncul secara realtime?",
          a: "Ya, OTP akan muncul secara realtime di dashboard Anda tanpa perlu refresh halaman. Anda juga akan mendapat notifikasi toast ketika OTP baru diterima.",
        },
        {
          q: "Bisakah saya menggunakan nomor yang sama berkali-kali?",
          a: "Tidak, setiap nomor virtual bersifat sekali pakai. Setelah digunakan atau expired, Anda perlu request nomor baru.",
        },
      ],
    },
    {
      category: "Keamanan",
      icon: <Shield className="w-5 h-5" />,
      questions: [
        {
          q: "Apakah data saya aman?",
          a: "Ya, kami menerapkan enkripsi end-to-end dan Row Level Security (RLS) pada database. Data pribadi Anda tidak akan dibagikan kepada pihak ketiga.",
        },
        {
          q: "Bisakah orang lain melihat OTP saya?",
          a: "Tidak, setiap pengguna hanya dapat melihat OTP untuk nomor yang mereka request sendiri. Sistem kami memiliki isolasi data yang ketat.",
        },
        {
          q: "Apakah ada privacy mode?",
          a: "Ya, dashboard memiliki privacy mode yang akan menyembunyikan sebagian konten OTP setelah beberapa menit untuk keamanan tambahan.",
        },
      ],
    },
    {
      category: "Platform & Negara",
      icon: <Globe className="w-5 h-5" />,
      questions: [
        {
          q: "Platform apa saja yang didukung?",
          a: "Saat ini kami mendukung WhatsApp, Facebook, Telegram, Instagram, dan beberapa platform lainnya. Daftar provider akan terus ditambah sesuai kebutuhan.",
        },
        {
          q: "Negara mana saja yang tersedia?",
          a: "Kami menyediakan nomor dari Indonesia, Amerika Serikat, India, Inggris, dan beberapa negara lainnya. Admin dapat menambah negara baru melalui panel admin.",
        },
        {
          q: "Mengapa nomor dari negara tertentu tidak tersedia?",
          a: "Ketersediaan nomor tergantung pada provider dan regulasi masing-masing negara. Kami terus berusaha menambah coverage negara baru.",
        },
      ],
    },
    {
      category: "Troubleshooting",
      icon: <MessageSquare className="w-5 h-5" />,
      questions: [
        {
          q: "OTP tidak muncul, apa yang harus dilakukan?",
          a: "Tunggu beberapa menit karena terkadang ada delay. Jika masih tidak muncul, coba request nomor baru. Pastikan juga platform yang Anda gunakan tidak memblokir nomor virtual.",
        },
        {
          q: "Mendapat error 'Rate limit exceeded'?",
          a: "Ini berarti Anda telah mencapai batas maksimal request per jam. Tunggu beberapa saat sebelum mencoba lagi. Rate limit diterapkan untuk mencegah spam.",
        },
        {
          q: "Nomor virtual tidak bisa digunakan di platform tertentu?",
          a: "Beberapa platform memiliki sistem deteksi nomor virtual yang canggih. Ini adalah keterbatasan teknis yang tidak dapat kami kontrol sepenuhnya.",
        },
        {
          q: "Dashboard tidak loading atau error?",
          a: "Coba refresh halaman atau clear cache browser. Jika masih bermasalah, kemungkinan ada maintenance server. Cek status di halaman utama.",
        },
      ],
    },
  ]

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
                <HelpCircle className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
              <p className="text-muted-foreground">Temukan jawaban untuk pertanyaan yang sering diajukan tentang FVN</p>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="space-y-8">
            {faqs.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="glass border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    {category.icon}
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, faqIndex) => (
                      <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                        <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Section */}
          <Card className="glass border-border/50 mt-8">
            <CardHeader>
              <CardTitle className="text-center">Masih Ada Pertanyaan?</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Jika Anda tidak menemukan jawaban yang dicari, jangan ragu untuk menghubungi kami
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="glass border-border/50 bg-transparent" asChild>
                  <Link href="/dashboard">
                    Buka Dashboard
                    <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                  </Link>
                </Button>
                <Button className="neon-glow" asChild>
                  <Link href="mailto:support@fvn.ibra.biz.id">
                    Hubungi Support
                    <MessageSquare className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            {FOOTER_TEXT}
          </div>
        </div>
      </div>
    </div>
  )
}
