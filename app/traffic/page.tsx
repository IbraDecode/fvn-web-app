import { getUser } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"
import { TrafficHeader } from "@/components/traffic/traffic-header"
import { TrafficStats } from "@/components/traffic/traffic-stats"
import { TrafficCharts } from "@/components/traffic/traffic-charts"
import { RealtimeFeed } from "@/components/traffic/realtime-feed"
import { CountryHeatmap } from "@/components/traffic/country-heatmap"

export default async function TrafficPage() {
  const user = await getUser()
  const supabase = await createClient()

  // Get traffic statistics
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1)

  const [
    { count: todayOtp },
    { count: weekOtp },
    { count: monthOtp },
    { count: todayNumbers },
    { count: weekNumbers },
    { count: monthNumbers },
  ] = await Promise.all([
    supabase.from("otp_messages").select("*", { count: "exact", head: true }).gte("created_at", today.toISOString()),
    supabase.from("otp_messages").select("*", { count: "exact", head: true }).gte("created_at", thisWeek.toISOString()),
    supabase
      .from("otp_messages")
      .select("*", { count: "exact", head: true })
      .gte("created_at", thisMonth.toISOString()),
    supabase
      .from("traffic_logs")
      .select("*", { count: "exact", head: true })
      .eq("event", "number_generated")
      .gte("created_at", today.toISOString()),
    supabase
      .from("traffic_logs")
      .select("*", { count: "exact", head: true })
      .eq("event", "number_generated")
      .gte("created_at", thisWeek.toISOString()),
    supabase
      .from("traffic_logs")
      .select("*", { count: "exact", head: true })
      .eq("event", "number_generated")
      .gte("created_at", thisMonth.toISOString()),
  ])

  // Get chart data for the last 24 hours
  const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const { data: hourlyData } = await supabase
    .from("traffic_logs")
    .select("created_at, event, provider_id, country_id")
    .gte("created_at", last24Hours.toISOString())
    .order("created_at", { ascending: true })

  // Get provider and country data for charts
  const { data: providerData } = await supabase
    .from("traffic_logs")
    .select(`
      provider_id,
      providers(name)
    `)
    .not("provider_id", "is", null)
    .gte("created_at", thisWeek.toISOString())

  const { data: countryData } = await supabase
    .from("traffic_logs")
    .select(`
      country_id,
      countries(name, iso2)
    `)
    .not("country_id", "is", null)
    .gte("created_at", thisWeek.toISOString())

  // Get recent activity
  const { data: recentActivity } = await supabase
    .from("traffic_logs")
    .select(`
      *,
      provider:providers(name),
      country:countries(name, iso2)
    `)
    .order("created_at", { ascending: false })
    .limit(20)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <TrafficHeader user={user} />

      <main className="container mx-auto px-6 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Traffic & Analytics</h1>
            <p className="text-muted-foreground">Monitor aktivitas dan statistik sistem FVN</p>
          </div>
        </div>

        <TrafficStats
          todayOtp={todayOtp || 0}
          weekOtp={weekOtp || 0}
          monthOtp={monthOtp || 0}
          todayNumbers={todayNumbers || 0}
          weekNumbers={weekNumbers || 0}
          monthNumbers={monthNumbers || 0}
        />

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TrafficCharts
              hourlyData={hourlyData || []}
              providerData={providerData || []}
              countryData={countryData || []}
            />
          </div>

          <div className="space-y-6">
            <RealtimeFeed recentActivity={recentActivity || []} />
            <CountryHeatmap countryData={countryData || []} />
          </div>
        </div>
      </main>
    </div>
  )
}
