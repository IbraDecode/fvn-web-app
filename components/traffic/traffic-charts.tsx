"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"
import { BarChart3, PieChartIcon, TrendingUp } from "lucide-react"
import { useMemo } from "react"

interface TrafficChartsProps {
  hourlyData: any[]
  providerData: any[]
  countryData: any[]
}

export function TrafficCharts({ hourlyData, providerData, countryData }: TrafficChartsProps) {
  // Process hourly data for line chart
  const processedHourlyData = useMemo(() => {
    const hourlyMap = new Map()

    // Initialize last 24 hours
    for (let i = 23; i >= 0; i--) {
      const hour = new Date(Date.now() - i * 60 * 60 * 1000)
      const key = hour.getHours()
      hourlyMap.set(key, {
        hour: key.toString().padStart(2, "0") + ":00",
        otp: 0,
        numbers: 0,
      })
    }

    // Fill with actual data
    hourlyData.forEach((item) => {
      const hour = new Date(item.created_at).getHours()
      const existing = hourlyMap.get(hour) || { hour: hour.toString().padStart(2, "0") + ":00", otp: 0, numbers: 0 }

      if (item.event === "otp_received") {
        existing.otp += 1
      } else if (item.event === "number_generated") {
        existing.numbers += 1
      }

      hourlyMap.set(hour, existing)
    })

    return Array.from(hourlyMap.values()).sort(
      (a, b) => Number.parseInt(a.hour.split(":")[0]) - Number.parseInt(b.hour.split(":")[0]),
    )
  }, [hourlyData])

  // Process provider data for pie chart
  const processedProviderData = useMemo(() => {
    const providerMap = new Map()

    providerData.forEach((item) => {
      const name = item.providers?.name || "Unknown"
      providerMap.set(name, (providerMap.get(name) || 0) + 1)
    })

    return Array.from(providerMap.entries())
      .map(([name, value]) => ({
        name,
        value,
      }))
      .slice(0, 5) // Top 5 providers
  }, [providerData])

  // Process country data for bar chart
  const processedCountryData = useMemo(() => {
    const countryMap = new Map()

    countryData.forEach((item) => {
      const name = item.countries?.name || "Unknown"
      countryMap.set(name, (countryMap.get(name) || 0) + 1)
    })

    return Array.from(countryMap.entries())
      .map(([name, value]) => ({
        name,
        value,
      }))
      .slice(0, 8) // Top 8 countries
  }, [countryData])

  const COLORS = ["#00F0FF", "#8A2BE2", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#84CC16"]

  return (
    <div className="space-y-6">
      {/* Hourly Activity Chart */}
      <Card className="glass glass-hover neon-glow border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Aktivitas 24 Jam Terakhir
          </CardTitle>
          <CardDescription>OTP dan nomor virtual yang dibuat per jam</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              otp: {
                label: "OTP",
                color: "hsl(var(--chart-1))",
              },
              numbers: {
                label: "Numbers",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={processedHourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="otp"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-chart-1)", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "var(--color-chart-1)", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="numbers"
                  stroke="var(--color-chart-2)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-chart-2)", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "var(--color-chart-2)", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Provider Distribution */}
        <Card className="glass glass-hover neon-glow border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-secondary" />
              Distribusi Provider
            </CardTitle>
            <CardDescription>Provider paling populer minggu ini</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Requests",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={processedProviderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {processedProviderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
            <div className="mt-4 space-y-2">
              {processedProviderData.map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                    <span>{entry.name}</span>
                  </div>
                  <span className="font-medium">{entry.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Country Distribution */}
        <Card className="glass glass-hover neon-glow border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-green-400" />
              Negara Populer
            </CardTitle>
            <CardDescription>Negara dengan permintaan tertinggi</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Requests",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={processedCountryData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    width={80}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" fill="var(--color-chart-3)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
