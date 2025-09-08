"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Activity, RefreshCw, Smartphone, MessageSquare, User } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"

interface RealtimeFeedProps {
  recentActivity: any[]
}

export function RealtimeFeed({ recentActivity: initialActivity }: RealtimeFeedProps) {
  const [activities, setActivities] = useState(initialActivity)
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const fetchLatestActivity = async () => {
    setIsLoading(true)
    try {
      const { data } = await supabase
        .from("traffic_logs")
        .select(`
          *,
          provider:providers(name),
          country:countries(name, iso2)
        `)
        .order("created_at", { ascending: false })
        .limit(20)

      if (data) {
        setActivities(data)
      }
    } catch (error) {
      console.error("Error fetching activity:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Set up realtime subscription
    const channel = supabase
      .channel("traffic_logs")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "traffic_logs",
        },
        (payload) => {
          console.log("New traffic log:", payload)
          fetchLatestActivity()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const getEventIcon = (event: string) => {
    switch (event) {
      case "number_generated":
        return <Smartphone className="w-4 h-4 text-primary" />
      case "otp_received":
        return <MessageSquare className="w-4 h-4 text-secondary" />
      case "user_registered":
        return <User className="w-4 h-4 text-green-400" />
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getEventColor = (event: string) => {
    switch (event) {
      case "number_generated":
        return "bg-primary/20 text-primary"
      case "otp_received":
        return "bg-secondary/20 text-secondary"
      case "user_registered":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-muted/20 text-muted-foreground"
    }
  }

  const getEventDescription = (event: string, provider?: any, country?: any) => {
    switch (event) {
      case "number_generated":
        return `Nomor ${provider?.name || "Unknown"} (${country?.name || "Unknown"}) dibuat`
      case "otp_received":
        return `OTP diterima untuk ${provider?.name || "Unknown"}`
      case "user_registered":
        return "User baru mendaftar"
      default:
        return event.replace("_", " ")
    }
  }

  return (
    <Card className="glass glass-hover neon-glow border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-orange-400" />
              Aktivitas Realtime
            </CardTitle>
            <CardDescription>Feed aktivitas terbaru sistem</CardDescription>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={fetchLatestActivity}
            disabled={isLoading}
            className="glass border-border/50 bg-transparent"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Belum ada aktivitas</p>
            <p className="text-sm">Aktivitas akan muncul di sini secara realtime</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg glass border border-border/20">
                  <div className="flex-shrink-0 mt-0.5">{getEventIcon(activity.event)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium truncate">
                        {getEventDescription(activity.event, activity.provider, activity.country)}
                      </p>
                      <Badge variant="outline" className={`text-xs ${getEventColor(activity.event)}`}>
                        {activity.event.replace("_", " ")}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        {activity.country?.iso2 && <span className="text-xs">{activity.country.iso2}</span>}
                        {activity.provider?.name && <span className="text-xs">{activity.provider.name}</span>}
                      </div>
                      <span>
                        {formatDistanceToNow(new Date(activity.created_at), {
                          addSuffix: true,
                          locale: id,
                        })}
                      </span>
                    </div>
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
