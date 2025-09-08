import { requireAdmin } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { ProvidersManager } from "@/components/admin/providers-manager"

export default async function AdminProvidersPage() {
  const user = await requireAdmin()
  const supabase = await createClient()

  // Get all providers
  const { data: providers } = await supabase.from("providers").select("*").order("name")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <AdminHeader user={user} />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Manage Providers</h1>
          <p className="text-muted-foreground">Kelola provider yang tersedia untuk nomor virtual</p>
        </div>

        <ProvidersManager providers={providers || []} />
      </main>
    </div>
  )
}
