"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Globe } from "lucide-react"
import { useMemo } from "react"

interface CountryHeatmapProps {
  countryData: any[]
}

export function CountryHeatmap({ countryData }: CountryHeatmapProps) {
  const processedCountryData = useMemo(() => {
    const countryMap = new Map()

    countryData.forEach((item) => {
      const country = item.countries
      if (country) {
        const key = country.iso2
        const existing = countryMap.get(key) || {
          name: country.name,
          iso2: country.iso2,
          count: 0,
        }
        existing.count += 1
        countryMap.set(key, existing)
      }
    })

    return Array.from(countryMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 10) // Top 10 countries
  }, [countryData])

  const maxCount = Math.max(...processedCountryData.map((c) => c.count), 1)

  const getIntensityColor = (count: number) => {
    const intensity = count / maxCount
    if (intensity > 0.8) return "bg-primary/80 text-primary-foreground"
    if (intensity > 0.6) return "bg-primary/60 text-primary-foreground"
    if (intensity > 0.4) return "bg-primary/40 text-foreground"
    if (intensity > 0.2) return "bg-primary/20 text-foreground"
    return "bg-primary/10 text-muted-foreground"
  }

  const getFlagEmoji = (iso2: string) => {
    const flagMap: { [key: string]: string } = {
      ID: "🇮🇩",
      US: "🇺🇸",
      IN: "🇮🇳",
      GB: "🇬🇧",
      DE: "🇩🇪",
      FR: "🇫🇷",
      CA: "🇨🇦",
      AU: "🇦🇺",
      JP: "🇯🇵",
      KR: "🇰🇷",
      SG: "🇸🇬",
      MY: "🇲🇾",
      TH: "🇹🇭",
      VN: "🇻🇳",
      PH: "🇵🇭",
    }
    return flagMap[iso2] || "🌍"
  }

  return (
    <Card className="glass glass-hover neon-glow border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-green-400" />
          Country Heatmap
        </CardTitle>
        <CardDescription>Distribusi geografis aktivitas</CardDescription>
      </CardHeader>
      <CardContent>
        {processedCountryData.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Globe className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Belum ada data negara</p>
            <p className="text-sm">Data akan muncul setelah ada aktivitas</p>
          </div>
        ) : (
          <div className="space-y-3">
            {processedCountryData.map((country) => (
              <div
                key={country.iso2}
                className="flex items-center justify-between p-3 rounded-lg glass border border-border/20"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getFlagEmoji(country.iso2)}</span>
                  <div>
                    <p className="font-medium text-sm">{country.name}</p>
                    <p className="text-xs text-muted-foreground">{country.iso2}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={`${getIntensityColor(country.count)} border-transparent`}>
                    {country.count}
                  </Badge>
                  <div className="w-16 h-2 bg-muted/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${(country.count / maxCount) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
