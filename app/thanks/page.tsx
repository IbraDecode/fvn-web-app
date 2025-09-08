import { createClient } from "@/lib/supabase/server"
import { ThanksHeader } from "@/components/thanks/thanks-header"
import { ThanksGrid } from "@/components/thanks/thanks-grid"
import { getUser } from "@/lib/auth"

export default async function ThanksPage() {
  const user = await getUser()
  const supabase = await createClient()

  // Get all active thanks entries
  const { data: thanksEntries } = await supabase.from("thanks_entries").select("*").eq("active", true).order("position")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <ThanksHeader user={user} />

      <main className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Thanks To</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Terima kasih untuk para kontributor & provider yang mendukung FVN
          </p>
        </div>

        <ThanksGrid thanksEntries={thanksEntries || []} />
      </main>
    </div>
  )
}
