import { requireAdmin } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminStats } from "@/components/admin/admin-stats"
import { QuickActions } from "@/components/admin/quick-actions"
import { RecentLogs } from "@/components/admin/recent-logs"

export default async function AdminPage() {
  const user = await requireAdmin()
  const supabase = await createClient()

  // Get admin statistics
  const [
    { count: totalUsers },
    { count: totalNumbers },
    { count: totalOtpMessages },
    { count: activeProviders },
    { count: activeCountries },
  ] = await Promise.all([
    supabase.from("users").select("*", { count: "exact", head: true }),
    supabase.from("numbers").select("*", { count: "exact", head: true }),
    supabase.from("otp_messages").select("*", { count: "exact", head: true }),
    supabase.from("providers").select("*", { count: "exact", head: true }).eq("active", true),
    supabase.from("countries").select("*", { count: "exact", head: true }).eq("active", true),
  ])

  // Get recent audit logs
  const { data: recentLogs } = await supabase
    .from("audit_logs")
    .select(`
      *,
      actor:users(display_name, email)
    `)
    .order("created_at", { ascending: false })
    .limit(10)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <AdminHeader user={user} />

      <main className="container mx-auto px-6 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Kelola sistem FVN dan monitor aktivitas</p>
          </div>
        </div>

        <AdminStats
          totalUsers={totalUsers || 0}
          totalNumbers={totalNumbers || 0}
          totalOtpMessages={totalOtpMessages || 0}
          activeProviders={activeProviders || 0}
          activeCountries={activeCountries || 0}
        />

        <div className="grid lg:grid-cols-2 gap-8">
          <QuickActions />
          <RecentLogs logs={recentLogs || []} />
        </div>
      </main>
    </div>
  )
}
