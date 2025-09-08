"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Building, Loader2 } from "lucide-react"
import { toast } from "sonner"
import type { Provider } from "@/lib/types"

interface ProvidersManagerProps {
  providers: Provider[]
}

export function ProvidersManager({ providers: initialProviders }: ProvidersManagerProps) {
  const [providers, setProviders] = useState<Provider[]>(initialProviders)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProvider, setEditingProvider] = useState<Provider | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    logo_url: "",
    active: true,
  })

  const supabase = createClient()

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      logo_url: "",
      active: true,
    })
    setEditingProvider(null)
  }

  const openCreateDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const openEditDialog = (provider: Provider) => {
    setFormData({
      name: provider.name,
      slug: provider.slug,
      logo_url: provider.logo_url || "",
      active: provider.active,
    })
    setEditingProvider(provider)
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("User not authenticated")

      if (editingProvider) {
        // Update existing provider
        const { data, error } = await supabase
          .from("providers")
          .update(formData)
          .eq("id", editingProvider.id)
          .select()
          .single()

        if (error) throw error

        setProviders((prev) => prev.map((p) => (p.id === editingProvider.id ? data : p)))

        // Log audit
        await supabase.from("audit_logs").insert({
          actor_user_id: user.id,
          action: "update",
          target_table: "providers",
          target_id: editingProvider.id,
          metadata: { old: editingProvider, new: data },
        })

        toast.success("Provider berhasil diperbarui")
      } else {
        // Create new provider
        const { data, error } = await supabase.from("providers").insert(formData).select().single()

        if (error) throw error

        setProviders((prev) => [...prev, data])

        // Log audit
        await supabase.from("audit_logs").insert({
          actor_user_id: user.id,
          action: "create",
          target_table: "providers",
          target_id: data.id,
          metadata: { provider: data },
        })

        toast.success("Provider berhasil ditambahkan")
      }

      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error saving provider:", error)
      toast.error("Gagal menyimpan provider")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (provider: Provider) => {
    if (!confirm(`Yakin ingin menghapus provider ${provider.name}?`)) return

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("User not authenticated")

      const { error } = await supabase.from("providers").delete().eq("id", provider.id)

      if (error) throw error

      setProviders((prev) => prev.filter((p) => p.id !== provider.id))

      // Log audit
      await supabase.from("audit_logs").insert({
        actor_user_id: user.id,
        action: "delete",
        target_table: "providers",
        target_id: provider.id,
        metadata: { provider },
      })

      toast.success("Provider berhasil dihapus")
    } catch (error) {
      console.error("Error deleting provider:", error)
      toast.error("Gagal menghapus provider")
    }
  }

  const toggleActive = async (provider: Provider) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("User not authenticated")

      const newActive = !provider.active
      const { data, error } = await supabase
        .from("providers")
        .update({ active: newActive })
        .eq("id", provider.id)
        .select()
        .single()

      if (error) throw error

      setProviders((prev) => prev.map((p) => (p.id === provider.id ? data : p)))

      // Log audit
      await supabase.from("audit_logs").insert({
        actor_user_id: user.id,
        action: "update",
        target_table: "providers",
        target_id: provider.id,
        metadata: { field: "active", old: provider.active, new: newActive },
      })

      toast.success(`Provider ${newActive ? "diaktifkan" : "dinonaktifkan"}`)
    } catch (error) {
      console.error("Error toggling provider:", error)
      toast.error("Gagal mengubah status provider")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Providers ({providers.length})</h2>
          <p className="text-muted-foreground">Kelola provider yang tersedia</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="neon-glow">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Provider
            </Button>
          </DialogTrigger>
          <DialogContent className="glass border-border/50">
            <DialogHeader>
              <DialogTitle>{editingProvider ? "Edit Provider" : "Tambah Provider"}</DialogTitle>
              <DialogDescription>
                {editingProvider ? "Perbarui informasi provider" : "Tambahkan provider baru"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nama Provider</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="WhatsApp"
                    required
                    className="glass border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase() })}
                    placeholder="whatsapp"
                    required
                    className="glass border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo_url">Logo URL (Opsional)</Label>
                  <Input
                    id="logo_url"
                    value={formData.logo_url}
                    onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                    placeholder="/images/providers/whatsapp.svg"
                    className="glass border-border/50"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
                  />
                  <Label htmlFor="active">Aktif</Label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="glass border-border/50"
                >
                  Batal
                </Button>
                <Button type="submit" disabled={isLoading} className="neon-glow">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Menyimpan...
                    </>
                  ) : editingProvider ? (
                    "Perbarui"
                  ) : (
                    "Tambah"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {providers.map((provider) => (
          <Card key={provider.id} className="glass glass-hover border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    {provider.logo_url ? (
                      <img src={provider.logo_url || "/placeholder.svg"} alt={provider.name} className="w-8 h-8" />
                    ) : (
                      <Building className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{provider.name}</h3>
                      <Badge variant={provider.active ? "default" : "secondary"}>
                        {provider.active ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Slug: {provider.slug}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch checked={provider.active} onCheckedChange={() => toggleActive(provider)} />
                  <Button size="sm" variant="outline" onClick={() => openEditDialog(provider)} className="glass">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(provider)}
                    className="glass hover:bg-destructive/20 hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
