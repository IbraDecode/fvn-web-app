import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Smartphone, MessageSquare, Globe, Building } from "lucide-react"

interface AdminStatsProps {
  totalUsers: number
  totalNumbers: number
  totalOtpMessages: number
  activeProviders: number
  activeCountries: number
}

export function AdminStats({
  totalUsers,
  totalNumbers,
  totalOtpMessages,
  activeProviders,
  activeCountries,
}: AdminStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      <Card className="glass glass-hover neon-glow border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{totalUsers}</div>
          <p className="text-xs text-muted-foreground">Pengguna terdaftar</p>
        </CardContent>
      </Card>

      <Card className="glass glass-hover neon-glow border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Numbers</CardTitle>
          <Smartphone className="h-4 w-4 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secondary">{totalNumbers}</div>
          <p className="text-xs text-muted-foreground">Nomor virtual tersedia</p>
        </CardContent>
      </Card>

      <Card className="glass glass-hover neon-glow border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total OTP</CardTitle>
          <MessageSquare className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-400">{totalOtpMessages}</div>
          <p className="text-xs text-muted-foreground">Pesan OTP diterima</p>
        </CardContent>
      </Card>

      <Card className="glass glass-hover neon-glow border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Providers</CardTitle>
          <Building className="h-4 w-4 text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-400">{activeProviders}</div>
          <p className="text-xs text-muted-foreground">Provider aktif</p>
        </CardContent>
      </Card>

      <Card className="glass glass-hover neon-glow border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Countries</CardTitle>
          <Globe className="h-4 w-4 text-orange-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-400">{activeCountries}</div>
          <p className="text-xs text-muted-foreground">Negara tersedia</p>
        </CardContent>
      </Card>
    </div>
  )
}
