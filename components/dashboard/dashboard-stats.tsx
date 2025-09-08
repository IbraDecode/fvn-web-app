import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone, MessageSquare, Globe, TrendingUp } from "lucide-react"

interface DashboardStatsProps {
  activeNumbers: number
  todayOtpCount: number
  popularCountry: string
}

export function DashboardStats({ activeNumbers, todayOtpCount, popularCountry }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="glass glass-hover neon-glow border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Nomor Aktif</CardTitle>
          <Smartphone className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{activeNumbers}</div>
          <p className="text-xs text-muted-foreground">Nomor virtual yang sedang aktif</p>
        </CardContent>
      </Card>

      <Card className="glass glass-hover neon-glow border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">OTP Hari Ini</CardTitle>
          <MessageSquare className="h-4 w-4 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secondary">{todayOtpCount}</div>
          <p className="text-xs text-muted-foreground">Pesan OTP yang diterima hari ini</p>
        </CardContent>
      </Card>

      <Card className="glass glass-hover neon-glow border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Negara Populer</CardTitle>
          <Globe className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-400">{popularCountry}</div>
          <p className="text-xs text-muted-foreground">Negara dengan permintaan tertinggi</p>
        </CardContent>
      </Card>

      <Card className="glass glass-hover neon-glow border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Status</CardTitle>
          <TrendingUp className="h-4 w-4 text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-400">Online</div>
          <p className="text-xs text-muted-foreground">Semua layanan berjalan normal</p>
        </CardContent>
      </Card>
    </div>
  )
}
