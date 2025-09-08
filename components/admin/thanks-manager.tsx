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
import { Plus, Edit, Trash2, Heart, Loader2, ExternalLink, Mail } from "lucide-react"
import { toast } from "sonner"
import type { ThanksEntry } from "@/lib/types"

interface ThanksManagerProps {
  thanksEntries: ThanksEntry[]
}

export function ThanksManager({ thanksEntries: initialEntries }: ThanksManagerProps) {
  const [entries, setEntries] = useState<ThanksEntry[]>(initialEntries)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<ThanksEntry | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    photo_url: "",
    website_url: "",
    contact_url: "",
    position: 0,
    active: true,
  })

  const supabase = createClient()

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      photo_url: "",
      website_url: "",
      contact_url: "",
      position: entries.length + 1,
      active: true,
    })
    setEditingEntry(null)
  }

  const openCreateDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const openEditDialog = (entry: ThanksEntry) => {
    setFormData({
      name: entry.name,
      role: entry.role,
      photo_url: entry.photo_url || "",
      website_url: entry.website_url || "",
      contact_url: entry.contact_url || "",
      position: entry.position,
      active: entry.active,
    })
    setEditingEntry(entry)
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

      if (editingEntry) {
        // Update existing entry
        const { data, error } = await supabase
          .from("thanks_entries")
          .update(formData)
          .eq("id", editingEntry.id)
          .select()
          .single()

        if (error) throw error

        setEntries((prev) => prev.map((e) => (e.id === editingEntry.id ? data : e)))

        // Log audit
        await supabase.from("audit_logs").insert({
          actor_user_id: user.id,
          action: "update",
          target_table: "thanks_entries",
          target_id: editingEntry.id,
          metadata: { old: editingEntry, new: data },
        })

        toast.success("Entry berhasil diperbarui")
      } else {
        // Create new entry
        const { data, error } = await supabase.from("thanks_entries").insert(formData).select().single()

        if (error) throw error

        setEntries((prev) => [...prev, data].sort((a, b) => a.position - b.position))

        // Log audit
        await supabase.from("audit_logs").insert({
          actor_user_id: user.id,
          action: "create",
          target_table: "thanks_entries",
          target_id: data.id,
          metadata: { entry: data },
        })

        toast.success("Entry berhasil ditambahkan")
      }

      setIsDialogOpen(false)
      resetForm()
    } catch (error) {
      console.error("Error saving entry:", error)
      toast.error("Gagal menyimpan entry")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (entry: ThanksEntry) => {
    if (!confirm(`Yakin ingin menghapus entry ${entry.name}?`)) return

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("User not authenticated")

      const { error } = await supabase.from("thanks_entries").delete().eq("id", entry.id)

      if (error) throw error

      setEntries((prev) => prev.filter((e) => e.id !== entry.id))

      // Log audit
      await supabase.from("audit_logs").insert({
        actor_user_id: user.id,
        action: "delete",
        target_table: "thanks_entries",
        target_id: entry.id,
        metadata: { entry },
      })

      toast.success("Entry berhasil dihapus")
    } catch (error) {
      console.error("Error deleting entry:", error)
      toast.error("Gagal menghapus entry")
    }
  }

  const toggleActive = async (entry: ThanksEntry) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("User not authenticated")

      const newActive = !entry.active
      const { data, error } = await supabase
        .from("thanks_entries")
        .update({ active: newActive })
        .eq("id", entry.id)
        .select()
        .single()

      if (error) throw error

      setEntries((prev) => prev.map((e) => (e.id === entry.id ? data : e)))

      // Log audit
      await supabase.from("audit_logs").insert({
        actor_user_id: user.id,
        action: "update",
        target_table: "thanks_entries",
        target_id: entry.id,
        metadata: { field: "active", old: entry.active, new: newActive },
      })

      toast.success(`Entry ${newActive ? "diaktifkan" : "dinonaktifkan"}`)
    } catch (error) {
      console.error("Error toggling entry:", error)
      toast.error("Gagal mengubah status entry")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Thanks To Entries ({entries.length})</h2>
          <p className="text-muted-foreground">Kelola entri halaman Thanks To</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreateDialog} className="neon-glow">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="glass border-border/50 max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingEntry ? "Edit Entry" : "Tambah Entry"}</DialogTitle>
              <DialogDescription>
                {editingEntry ? "Perbarui informasi entry" : "Tambahkan entry baru ke halaman Thanks To"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nama</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ibra Decode"
                      required
                      className="glass border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Posisi</Label>
                    <Input
                      id="position"
                      type="number"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: Number.parseInt(e.target.value) || 0 })}
                      min="1"
                      className="glass border-border/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Full Stack Engineering & Creator"
                    required
                    className="glass border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="photo_url">Photo URL</Label>
                  <Input
                    id="photo_url"
                    value={formData.photo_url}
                    onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                    placeholder="/images/team/ibra-decode.jpg"
                    className="glass border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website_url">Website URL</Label>
                  <Input
                    id="website_url"
                    value={formData.website_url}
                    onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                    placeholder="https://ibra.biz.id"
                    className="glass border-border/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_url">Contact URL</Label>
                  <Input
                    id="contact_url"
                    value={formData.contact_url}
                    onChange={(e) => setFormData({ ...formData, contact_url: e.target.value })}
                    placeholder="mailto:contact@ibra.biz.id"
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
                  ) : editingEntry ? (
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
        {entries
          .sort((a, b) => a.position - b.position)
          .map((entry) => (
            <Card key={entry.id} className="glass glass-hover border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                      {entry.photo_url ? (
                        <img
                          src={entry.photo_url || "/placeholder.svg"}
                          alt={entry.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Heart className="w-8 h-8 text-primary" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{entry.name}</h3>
                        <Badge variant={entry.active ? "default" : "secondary"}>
                          {entry.active ? "Aktif" : "Nonaktif"}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          #{entry.position}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{entry.role}</p>
                      <div className="flex items-center gap-2">
                        {entry.website_url && (
                          <Button size="sm" variant="outline" className="h-6 px-2 glass bg-transparent" asChild>
                            <a href={entry.website_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-3 h-3 mr-1" />
                              Website
                            </a>
                          </Button>
                        )}
                        {entry.contact_url && (
                          <Button size="sm" variant="outline" className="h-6 px-2 glass bg-transparent" asChild>
                            <a href={entry.contact_url} target="_blank" rel="noopener noreferrer">
                              <Mail className="w-3 h-3 mr-1" />
                              Contact
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch checked={entry.active} onCheckedChange={() => toggleActive(entry)} />
                    <Button size="sm" variant="outline" onClick={() => openEditDialog(entry)} className="glass">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(entry)}
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
