import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Smartphone, TrendingUp, TrendingDown } from "lucide-react"

interface TrafficStatsProps {
  todayOtp: number
  weekOtp: number
  monthOtp: number
  todayNumbers: number
  weekNumbers: number
  monthNumbers: number
}

export function TrafficStats({
  todayOtp,
  weekOtp,
  monthOtp,
  todayNumbers,
  weekNumbers,
  monthNumbers,
}: TrafficStatsProps) {
  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0
    return ((current - previous) / previous) * 100
  }

  const weeklyOtpGrowth = calculateGrowth(weekOtp, monthOtp - weekOtp)
  const weeklyNumbersGrowth = calculateGrowth(weekNumbers, monthNumbers - weekNumbers)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
      <Card className="glass glass-hover neon-glow border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">OTP Hari Ini</CardTitle>
          <MessageSquare className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{todayOtp}</div>
          <p className="text-xs text-muted-foreground">Pesan OTP diterima</p>
        </CardContent>
      </Card>

      <Card className="glass glass-hover neon-glow border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">OTP Minggu Ini</CardTitle>
          <MessageSquare className="h-4 w-4 text-secondary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-secondary">{weekOtp}</div>
          <div className="flex items-center text-xs">
            {weeklyOtpGrowth >= 0 ? (
              <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 text-red-400 mr-1" />
            )}
            <span className={weeklyOtpGrowth >= 0 ? "text-green-400" : "text-red-400"}>
              {Math.abs(weeklyOtpGrowth).toFixed(1)}%
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="glass glass-hover neon-glow border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">OTP Bulan Ini</CardTitle>
          <MessageSquare className="h-4 w-4 text-green-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-400">{monthOtp}</div>
          <p className="text-xs text-muted-foreground">Total bulan ini</p>
        </CardContent>
      </Card>

      <Card className="glass glass-hover neon-glow border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Nomor Hari Ini</CardTitle>
          <Smartphone className="h-4 w-4 text-yellow-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-400">{todayNumbers}</div>
          <p className="text-xs text-muted-foreground">Nomor dibuat</p>
        </CardContent>
      </Card>

      <Card className="glass glass-hover neon-glow border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Nomor Minggu Ini</CardTitle>
          <Smartphone className="h-4 w-4 text-orange-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-400">{weekNumbers}</div>
          <div className="flex items-center text-xs">
            {weeklyNumbersGrowth >= 0 ? (
              <TrendingUp className="w-3 h-3 text-green-400 mr-1" />
            ) : (
              <TrendingDown className="w-3 h-3 text-red-400 mr-1" />
            )}
            <span className={weeklyNumbersGrowth >= 0 ? "text-green-400" : "text-red-400"}>
              {Math.abs(weeklyNumbersGrowth).toFixed(1)}%
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="glass glass-hover neon-glow border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Nomor Bulan Ini</CardTitle>
          <Smartphone className="h-4 w-4 text-pink-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-pink-400">{monthNumbers}</div>
          <p className="text-xs text-muted-foreground">Total bulan ini</p>
        </CardContent>
      </Card>
    </div>
  )
}
