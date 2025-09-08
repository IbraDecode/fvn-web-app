import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Activity, User, Settings, Trash2, Plus } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"
import type { AuditLog } from "@/lib/types"

interface RecentLogsProps {
  logs: (AuditLog & {
    actor?: {
      display_name?: string
      email: string
    }
  })[]
}

export function RecentLogs({ logs }: RecentLogsProps) {
  const getActionIcon = (action: string) => {
    switch (action) {
      case "create":
      case "insert":
        return <Plus className="w-4 h-4 text-green-400" />
      case "update":
      case "edit":
        return <Settings className="w-4 h-4 text-yellow-400" />
      case "delete":
        return <Trash2 className="w-4 h-4 text-red-400" />
      case "login":
      case "register":
        return <User className="w-4 h-4 text-blue-400" />
      default:
        return <Activity className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "create":
      case "insert":
        return "bg-green-500/20 text-green-400"
      case "update":
      case "edit":
        return "bg-yellow-500/20 text-yellow-400"
      case "delete":
        return "bg-red-500/20 text-red-400"
      case "login":
      case "register":
        return "bg-blue-500/20 text-blue-400"
      default:
        return "bg-muted/20 text-muted-foreground"
    }
  }

  const formatAction = (action: string, targetTable?: string) => {
    const table = targetTable?.replace("public.", "") || "system"
    return `${action} ${table}`
  }

  return (
    <Card className="glass glass-hover neon-glow border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-orange-400" />
          Recent Activity
        </CardTitle>
        <CardDescription>Aktivitas terbaru dari admin dan sistem</CardDescription>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Belum ada aktivitas</p>
            <p className="text-sm">Log aktivitas akan muncul di sini</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg glass border border-border/20">
                  <div className="flex-shrink-0 mt-0.5">{getActionIcon(log.action)}</div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium truncate">{formatAction(log.action, log.target_table)}</p>
                      <Badge variant="outline" className={`text-xs ${getActionColor(log.action)}`}>
                        {log.action}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{log.actor?.display_name || log.actor?.email || "System"}</span>
                      <span>
                        {formatDistanceToNow(new Date(log.created_at), {
                          addSuffix: true,
                          locale: id,
                        })}
                      </span>
                    </div>

                    {log.metadata && (
                      <div className="mt-2 p-2 rounded bg-muted/20 text-xs">
                        <pre className="text-muted-foreground overflow-hidden">
                          {JSON.stringify(log.metadata, null, 2).substring(0, 100)}
                          {JSON.stringify(log.metadata).length > 100 && "..."}
                        </pre>
                      </div>
                    )}
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
