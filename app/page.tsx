"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Smartphone, Shield, Zap, Globe, MessageSquare, CheckCircle } from "lucide-react"
import Link from "next/link"
import { APP_CONFIG, FOOTER_TEXT } from "@/lib/constants"
import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import FloatingElements from "@/components/animations/floating-elements"
import FloatingParticles from "@/components/animations/floating-particles"

const EnhancedSmartphoneCanvas = dynamic(() => import("@/components/3d/enhanced-smartphone"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] md:h-[600px] flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-[#00F0FF] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

export default function HomePage() {
  const providers = [
    { name: "WhatsApp", icon: "💬", color: "bg-green-500/20 text-green-400" },
    { name: "Facebook", icon: "📘", color: "bg-blue-500/20 text-blue-400" },
    { name: "Telegram", icon: "✈️", color: "bg-sky-500/20 text-sky-400" },
    { name: "Instagram", icon: "📷", color: "bg-pink-500/20 text-pink-400" },
  ]

  const countries = [
    { name: "Indonesia", flag: "🇮🇩", code: "+62" },
    { name: "United States", flag: "🇺🇸", code: "+1" },
    { name: "India", flag: "🇮🇳", code: "+91" },
    { name: "United Kingdom", flag: "🇬🇧", code: "+44" },
  ]

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant & Fast",
      description: "Dapatkan nomor virtual dalam hitungan detik",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Data Anda aman dengan enkripsi end-to-end",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Coverage",
      description: "Nomor dari berbagai negara di seluruh dunia",
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Realtime OTP",
      description: "Terima OTP secara realtime tanpa delay",
    },
  ]

  const steps = [
    {
      step: "1",
      title: "Pilih Provider",
      description: "Pilih platform yang ingin Anda verifikasi",
    },
    {
      step: "2",
      title: "Pilih Negara",
      description: "Tentukan negara asal nomor virtual",
    },
    {
      step: "3",
      title: "Dapatkan Nomor",
      description: "Nomor virtual siap digunakan",
    },
    {
      step: "4",
      title: "Terima OTP",
      description: "OTP akan muncul secara realtime",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <FloatingParticles />
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="border-b border-border/50 glass backdrop-blur-md sticky top-0 z-50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">{APP_CONFIG.name}</span>
              </div>
              <span className="font-bold text-xl">{APP_CONFIG.name}</span>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#features" className="text-sm hover:text-primary transition-colors">
                Fitur
              </Link>
              <Link href="#how-it-works" className="text-sm hover:text-primary transition-colors">
                Cara Kerja
              </Link>
              <Link href="/thanks" className="text-sm hover:text-primary transition-colors">
                Thanks To
              </Link>
            </nav>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Masuk</Link>
              </Button>
              <Button size="sm" className="neon-glow" asChild>
                <Link href="/auth/register">
                  Daftar Gratis
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <FloatingElements />

        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: "spring" }}>
                  <Badge variant="outline" className="glass border-primary/30 text-primary">
                    <Smartphone className="w-3 h-3 mr-1" />
                    Free Virtual Numbers
                  </Badge>
                </motion.div>

                <motion.h1
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-4xl md:text-6xl font-bold text-balance"
                >
                  Free Virtual Numbers. <span className="text-primary">Instant.</span>{" "}
                  <span className="text-secondary">Anywhere.</span>
                </motion.h1>

                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-xl text-muted-foreground text-balance"
                >
                  {APP_CONFIG.description} untuk keperluan testing & verifikasi non-kritis
                </motion.p>
              </div>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button size="lg" className="neon-glow hover:neon-glow-secondary" asChild>
                  <Link href="/auth/register">
                    Mulai Gratis
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="glass border-border/50 bg-transparent" asChild>
                  <Link href="/auth/login">Masuk</Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex items-center justify-start gap-8 text-sm text-muted-foreground"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Gratis selamanya
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Tanpa registrasi kartu kredit
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Realtime OTP
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <EnhancedSmartphoneCanvas />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5, type: "spring" }}
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-center"
              >
                <p className="text-xs text-muted-foreground">Drag to rotate • Scroll to zoom</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Provider Section */}
      <motion.section
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4"
            >
              Provider Tersedia
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-muted-foreground"
            >
              Dapatkan nomor virtual untuk berbagai platform populer
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {providers.map((provider, index) => (
              <motion.div
                key={provider.name}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="glass glass-hover neon-glow border-border/50 text-center">
                  <CardContent className="p-6">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-12 h-12 rounded-xl ${provider.color} flex items-center justify-center mx-auto mb-3 text-2xl`}
                    >
                      {provider.icon}
                    </motion.div>
                    <h3 className="font-medium">{provider.name}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Countries Section */}
      <motion.section
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4"
            >
              Negara Tersedia
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-muted-foreground"
            >
              Pilih nomor virtual dari berbagai negara
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            {countries.map((country) => (
              <motion.div
                key={country.name}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="glass glass-hover neon-glow border-border/50">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{country.flag}</div>
                    <h3 className="font-medium text-sm">{country.name}</h3>
                    <p className="text-xs text-muted-foreground">{country.code}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="features"
        className="py-16"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4"
            >
              Mengapa Pilih FVN?
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-muted-foreground"
            >
              Solusi terbaik untuk kebutuhan nomor virtual Anda
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl mx-auto mb-4 neon-glow"
                >
                  {feature.icon}
                </motion.div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        id="how-it-works"
        className="py-16"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4"
            >
              Cara Kerja
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="text-muted-foreground"
            >
              Dapatkan nomor virtual dalam 4 langkah mudah
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl mx-auto mb-4 neon-glow"
                >
                  {step.step}
                </motion.div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16"
      >
        <div className="container mx-auto px-6">
          <Card className="glass glass-hover neon-glow border-border/50 text-center">
            <CardContent className="p-12">
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-3xl font-bold mb-4"
              >
                Siap Memulai?
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="text-muted-foreground mb-8 max-w-2xl mx-auto"
              >
                Bergabunglah dengan ribuan pengguna yang sudah mempercayai FVN untuk kebutuhan nomor virtual mereka
              </motion.p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="neon-glow hover:neon-glow-secondary" asChild>
                  <Link href="/auth/register">
                    Daftar Gratis Sekarang
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="glass border-border/50 bg-transparent" asChild>
                  <Link href="/dashboard">Lihat Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-xs">{APP_CONFIG.name}</span>
              </div>
              <span className="font-medium">{APP_CONFIG.fullName}</span>
            </div>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/disclaimer" className="hover:text-foreground transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-border/50 text-center text-sm text-muted-foreground">
            {FOOTER_TEXT}
          </div>
        </div>
      </footer>
    </div>
  )
}
