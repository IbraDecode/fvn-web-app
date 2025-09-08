import { requireAuth } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { NumberGenerator } from "@/components/dashboard/number-generator"
import { OtpViewer } from "@/components/dashboard/otp-viewer"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default async function DashboardPage() {
  const user = await requireAuth()
  const supabase = await createClient()

  // Get user's active numbers
  const { data: activeNumbers } = await supabase
    .from("numbers")
    .select(`
      *,
      provider:providers(*),
      country:countries(*)
    `)
    .eq("assigned_to_user", user.id)
    .eq("status", "assigned")
    .order("assigned_at", { ascending: false })

  // Get today's OTP count
  const today = new Date().toISOString().split("T")[0]
  const { count: todayOtpCount } = await supabase
    .from("otp_messages")
    .select("*", { count: "exact", head: true })
    .gte("created_at", `${today}T00:00:00.000Z`)
    .lt("created_at", `${today}T23:59:59.999Z`)
    .in("number_id", activeNumbers?.map((n) => n.id) || [])

  // Get providers and countries for the generator
  const { data: providers } = await supabase.from("providers").select("*").eq("active", true).order("name")

  const { data: countries } = await supabase
    .from("countries")
    .select("*")
    .eq("active", true)
    .order("priority", { ascending: false })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <DashboardHeader user={user} />

      <main className="container mx-auto px-6 py-8 space-y-8">
        <DashboardStats
          activeNumbers={activeNumbers?.length || 0}
          todayOtpCount={todayOtpCount || 0}
          popularCountry={countries?.[0]?.name || "Indonesia"}
        />

        <div className="grid lg:grid-cols-2 gap-8">
          <NumberGenerator providers={providers || []} countries={countries || []} />

          <OtpViewer activeNumbers={activeNumbers || []} />
        </div>

        <RecentActivity activeNumbers={activeNumbers || []} />
      </main>
    </div>
  )
}
