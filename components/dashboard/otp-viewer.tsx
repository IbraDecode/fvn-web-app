"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Copy, Eye, EyeOff, RefreshCw } from "lucide-react"
import { toast } from "sonner"
import type { VirtualNumber, OtpMessage } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"

interface OtpViewerProps {
  activeNumbers: VirtualNumber[]
}

export function OtpViewer({ activeNumbers }: OtpViewerProps) {
  const [otpMessages, setOtpMessages] = useState<OtpMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [privacyMode, setPrivacyMode] = useState(true)
  const supabase = createClient()

  const fetchOtpMessages = async () => {
    if (activeNumbers.length === 0) return

    setIsLoading(true)
    try {
      const { data, error } = await supabase
        .from("otp_messages")
        .select(`
          *,
          number:numbers(
            *,
            provider:providers(*),
            country:countries(*)
          )
        `)
        .in(
          "number_id",
          activeNumbers.map((n) => n.id),
        )
        .order("received_at", { ascending: false })
        .limit(20)

      if (error) throw error
      setOtpMessages(data || [])
    } catch (error) {
      console.error("Error fetching OTP messages:", error)
      toast.error("Gagal memuat pesan OTP")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchOtpMessages()

    // Set up realtime subscription
    const channel = supabase
      .channel("otp_messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "otp_messages",
          filter: `number_id=in.(${activeNumbers.map((n) => n.id).join(",")})`,
        },
        (payload) => {
          console.log("New OTP message:", payload)
          toast.success("📩 OTP baru diterima!")
          fetchOtpMessages() // Refresh the list
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [activeNumbers, supabase])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success("OTP disalin ke clipboard")
    } catch (error) {
      toast.error("Gagal menyalin OTP")
    }
  }

  const extractOtpCode = (content: string): string | null => {
    // Common OTP patterns
    const patterns = [
      /\b(\d{4,8})\b/g, // 4-8 digit codes
      /code[:\s]*(\d{4,8})/gi,
      /verification[:\s]*(\d{4,8})/gi,
      /otp[:\s]*(\d{4,8})/gi,
    ]

    for (const pattern of patterns) {
      const match = content.match(pattern)
      if (match) {
        return match[0].replace(/\D/g, "") // Extract only digits
      }
    }
    return null
  }

  const maskContent = (content: string): string => {
    if (!privacyMode) return content

    const otpCode = extractOtpCode(content)
    if (otpCode) {
      return `OTP: ${otpCode} (konten disembunyikan untuk privasi)`
    }
    return content.substring(0, 50) + "..."
  }

  return (
    <Card className="glass glass-hover neon-glow border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-secondary" />
              OTP Realtime
            </CardTitle>
            <CardDescription>Pesan OTP akan muncul secara realtime di sini</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPrivacyMode(!privacyMode)}
              className="glass border-border/50"
            >
              {privacyMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={fetchOtpMessages}
              disabled={isLoading}
              className="glass border-border/50 bg-transparent"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {activeNumbers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Belum ada nomor aktif</p>
            <p className="text-sm">Generate nomor virtual untuk menerima OTP</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {otpMessages.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Belum ada OTP masuk</p>
                  <p className="text-xs">Kirim kode ke nomor aktif Anda</p>
                </div>
              ) : (
                otpMessages.map((message) => {
                  const otpCode = extractOtpCode(message.content)
                  return (
                    <div key={message.id} className="p-4 rounded-lg glass border border-border/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {message.number?.provider?.logo_url && (
                            <img
                              src={message.number.provider.logo_url || "/placeholder.svg"}
                              alt={message.number.provider.name}
                              className="w-4 h-4"
                            />
                          )}
                          <span className="text-sm font-medium">{message.number?.provider?.name}</span>
                          {message.number?.country?.flag_url && (
                            <img
                              src={message.number.country.flag_url || "/placeholder.svg"}
                              alt={message.number.country.name}
                              className="w-3 h-2"
                            />
                          )}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {formatDistanceToNow(new Date(message.received_at), {
                            addSuffix: true,
                            locale: id,
                          })}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Dari: {message.sender || "Unknown"}</span>
                          <span className="text-xs text-muted-foreground font-mono">{message.number?.msisdn}</span>
                        </div>

                        <div className="p-3 rounded-lg bg-muted/20 border border-border/20">
                          <p className="text-sm">{maskContent(message.content)}</p>
                        </div>

                        {otpCode && (
                          <div className="flex items-center justify-between p-2 rounded-lg bg-primary/10 border border-primary/20">
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-primary font-medium">OTP:</span>
                              <span className="font-mono font-bold text-primary">{otpCode}</span>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(otpCode)}
                              className="h-6 px-2 glass border-primary/30 hover:bg-primary/20"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
