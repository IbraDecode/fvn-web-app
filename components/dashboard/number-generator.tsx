"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Loader2, Smartphone, Copy, CheckCircle } from "lucide-react"
import { toast } from "sonner"
import type { Provider, Country, VirtualNumber } from "@/lib/types"

interface NumberGeneratorProps {
  providers: Provider[]
  countries: Country[]
}

export function NumberGenerator({ providers, countries }: NumberGeneratorProps) {
  const [selectedProvider, setSelectedProvider] = useState<string>("")
  const [selectedCountry, setSelectedCountry] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedNumber, setGeneratedNumber] = useState<VirtualNumber | null>(null)
  const supabase = createClient()

  const handleGenerateNumber = async () => {
    if (!selectedProvider || !selectedCountry) {
      toast.error("Pilih provider dan negara terlebih dahulu")
      return
    }

    setIsGenerating(true)

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("User not authenticated")

      // Find available number
      const { data: availableNumbers, error: fetchError } = await supabase
        .from("numbers")
        .select(`
          *,
          provider:providers(*),
          country:countries(*)
        `)
        .eq("provider_id", selectedProvider)
        .eq("country_id", selectedCountry)
        .eq("status", "available")
        .limit(1)

      if (fetchError) throw fetchError

      if (!availableNumbers || availableNumbers.length === 0) {
        toast.error("Tidak ada nomor tersedia untuk kombinasi ini")
        return
      }

      const number = availableNumbers[0]

      // Assign number to user
      const expiresAt = new Date()
      expiresAt.setHours(expiresAt.getHours() + 1) // 1 hour expiry

      const { data: updatedNumber, error: updateError } = await supabase
        .from("numbers")
        .update({
          status: "assigned",
          assigned_to_user: user.id,
          assigned_at: new Date().toISOString(),
          expires_at: expiresAt.toISOString(),
        })
        .eq("id", number.id)
        .select(`
          *,
          provider:providers(*),
          country:countries(*)
        `)
        .single()

      if (updateError) throw updateError

      // Log traffic
      await supabase.from("traffic_logs").insert({
        event: "number_generated",
        provider_id: selectedProvider,
        country_id: selectedCountry,
        user_id: user.id,
        metadata: { number_id: number.id },
      })

      setGeneratedNumber(updatedNumber)
      toast.success("Nomor berhasil dibuat!")
    } catch (error) {
      console.error("Error generating number:", error)
      toast.error("Gagal membuat nomor. Coba lagi.")
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success("Nomor disalin ke clipboard")
    } catch (error) {
      toast.error("Gagal menyalin nomor")
    }
  }

  return (
    <Card className="glass glass-hover neon-glow border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-primary" />
          Generator Nomor Virtual
        </CardTitle>
        <CardDescription>Pilih provider dan negara untuk mendapatkan nomor virtual gratis</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Provider</label>
            <Select value={selectedProvider} onValueChange={setSelectedProvider}>
              <SelectTrigger className="glass border-border/50">
                <SelectValue placeholder="Pilih provider" />
              </SelectTrigger>
              <SelectContent className="glass border-border/50">
                {providers.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    <div className="flex items-center gap-2">
                      {provider.logo_url && (
                        <img src={provider.logo_url || "/placeholder.svg"} alt={provider.name} className="w-4 h-4" />
                      )}
                      {provider.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Negara</label>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="glass border-border/50">
                <SelectValue placeholder="Pilih negara" />
              </SelectTrigger>
              <SelectContent className="glass border-border/50">
                {countries.map((country) => (
                  <SelectItem key={country.id} value={country.id}>
                    <div className="flex items-center gap-2">
                      {country.flag_url && (
                        <img src={country.flag_url || "/placeholder.svg"} alt={country.name} className="w-4 h-3" />
                      )}
                      {country.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={handleGenerateNumber}
          disabled={!selectedProvider || !selectedCountry || isGenerating}
          className="w-full neon-glow hover:neon-glow-secondary transition-all duration-300"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Mengambil nomor...
            </>
          ) : (
            "Dapatkan Nomor Gratis"
          )}
        </Button>

        {generatedNumber && (
          <div className="p-4 rounded-lg glass border border-primary/20 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-primary">Nomor Virtual Anda</h4>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                <CheckCircle className="w-3 h-3 mr-1" />
                Aktif
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {generatedNumber.provider?.logo_url && (
                    <img
                      src={generatedNumber.provider.logo_url || "/placeholder.svg"}
                      alt={generatedNumber.provider.name}
                      className="w-5 h-5"
                    />
                  )}
                  <span className="text-sm text-muted-foreground">{generatedNumber.provider?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {generatedNumber.country?.flag_url && (
                    <img
                      src={generatedNumber.country.flag_url || "/placeholder.svg"}
                      alt={generatedNumber.country.name}
                      className="w-4 h-3"
                    />
                  )}
                  <span className="text-sm text-muted-foreground">{generatedNumber.country?.name}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-primary/10 border border-primary/20">
              <span className="font-mono text-lg font-bold text-primary">{generatedNumber.msisdn}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(generatedNumber.msisdn)}
                className="glass border-primary/30 hover:bg-primary/20"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
              Nomor akan kedaluwarsa dalam 1 jam. Gunakan untuk menerima OTP sekarang.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
