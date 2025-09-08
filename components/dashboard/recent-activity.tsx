"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity, Clock, Smartphone, MessageSquare } from "lucide-react"
import type { VirtualNumber, TrafficLog } from "@/lib/types"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"

interface RecentActivityProps {
  activeNumbers: VirtualNumber[]
}

export function RecentActivity({ activeNumbers }: RecentActivityProps) {
  const [activities, setActivities] = useState<TrafficLog[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const fetchActivities = async () => {
      setIsLoading(true)
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) return

        const { data, error } = await supabase
          .from("traffic_logs")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(10)

        if (error) throw error
        setActivities(data || [])
      } catch (error) {
        console.error("Error fetching activities:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchActivities()
  }, [supabase])

  const getActivityIcon = (event: string) => {
    switch (event) {
      case "number_generated":
        return <Smartphone className="w-4 h-4 text-primary" />
      case "otp_received":
        return <MessageSquare className="w-4 h-4 text-secondary" />
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getActivityDescription = (event: string, metadata?: any) => {
    switch (event) {
      case "number_generated":
        return "Nomor virtual baru dibuat"
      case "otp_received":
        return "OTP diterima"
      default:
        return event.replace("_", " ")
    }
  }

  const getActivityColor = (event: string) => {
    switch (event) {
      case "number_generated":
        return "bg-primary/20 text-primary"
      case "otp_received":
        return "bg-secondary/20 text-secondary"
      default:
        return "bg-muted/20 text-muted-foreground"
    }
  }

  return (
    <Card className="glass glass-hover neon-glow border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-green-400" />
          Aktivitas Terbaru
        </CardTitle>
        <CardDescription>Riwayat aktivitas akun Anda</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg glass animate-pulse">
                <div className="w-8 h-8 rounded-full bg-muted/20" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted/20 rounded w-3/4" />
                  <div className="h-3 bg-muted/20 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Belum ada aktivitas</p>
            <p className="text-sm">Mulai gunakan FVN untuk melihat riwayat aktivitas</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-3">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg glass border border-border/20">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-muted/20 flex items-center justify-center">
                      {getActivityIcon(activity.event)}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium truncate">
                        {getActivityDescription(activity.event, activity.metadata)}
                      </p>
                      <Badge variant="outline" className={`text-xs ${getActivityColor(activity.event)}`}>
                        {activity.event.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(activity.created_at), {
                        addSuffix: true,
                        locale: id,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
