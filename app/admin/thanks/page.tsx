import { requireAdmin } from "@/lib/auth"
import { createClient } from "@/lib/supabase/server"
import { AdminHeader } from "@/components/admin/admin-header"
import { ThanksManager } from "@/components/admin/thanks-manager"

export default async function AdminThanksPage() {
  const user = await requireAdmin()
  const supabase = await createClient()

  // Get all thanks entries
  const { data: thanksEntries } = await supabase.from("thanks_entries").select("*").order("position")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <AdminHeader user={user} />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Manage Thanks To</h1>
          <p className="text-muted-foreground">Kelola entri halaman Thanks To</p>
        </div>

        <ThanksManager thanksEntries={thanksEntries || []} />
      </main>
    </div>
  )
}
