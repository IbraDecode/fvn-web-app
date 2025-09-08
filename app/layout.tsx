import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "FVN - Free Virtual Number",
  description:
    "Get free virtual numbers for SMS OTP verification. WhatsApp, Facebook, Telegram - fast, ethical, and easy.",
  keywords: "virtual number, SMS, OTP, verification, WhatsApp, Facebook, Telegram, free",
  authors: [{ name: "Ibra Decode", url: "https://ibra.biz.id" }],
  creator: "Ibra Decode",
  publisher: "FVN",
  robots: "index, follow",
  openGraph: {
    title: "FVN - Free Virtual Number",
    description: "Get free virtual numbers for SMS OTP verification",
    url: "https://fvn.ibra.biz.id",
    siteName: "FVN",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FVN - Free Virtual Number",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FVN - Free Virtual Number",
    description: "Get free virtual numbers for SMS OTP verification",
    images: ["/og-image.png"],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Toaster theme="dark" position="top-right" richColors closeButton />
        <Analytics />
      </body>
    </html>
  )
}
