"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Settings, Users, BarChart3, MessageSquare, Globe } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "Manage Providers",
      description: "Tambah, edit, atau hapus provider",
      icon: <Settings className="w-5 h-5" />,
      href: "/admin/providers",
      color: "text-primary",
    },
    {
      title: "Manage Countries",
      description: "Kelola negara yang tersedia",
      icon: <Globe className="w-5 h-5" />,
      href: "/admin/countries",
      color: "text-secondary",
    },
    {
      title: "Thanks To Entries",
      description: "Kelola halaman Thanks To",
      icon: <Users className="w-5 h-5" />,
      href: "/admin/thanks",
      color: "text-green-400",
    },
    {
      title: "View Analytics",
      description: "Lihat statistik dan analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      href: "/traffic",
      color: "text-yellow-400",
    },
    {
      title: "System Logs",
      description: "Monitor aktivitas sistem",
      icon: <MessageSquare className="w-5 h-5" />,
      href: "/admin/logs",
      color: "text-orange-400",
    },
    {
      title: "Add Numbers",
      description: "Tambah nomor virtual baru",
      icon: <Plus className="w-5 h-5" />,
      href: "/admin/numbers",
      color: "text-pink-400",
    },
  ]

  return (
    <Card className="glass glass-hover neon-glow border-border/50">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Aksi cepat untuk mengelola sistem</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 glass border-border/50 hover:bg-card/90 justify-start bg-transparent"
              asChild
            >
              <Link href={action.href}>
                <div className="flex items-start gap-3">
                  <div className={`${action.color} mt-0.5`}>{action.icon}</div>
                  <div className="text-left">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs text-muted-foreground">{action.description}</div>
                  </div>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
