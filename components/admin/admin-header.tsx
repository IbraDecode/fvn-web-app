"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User, Home, Shield } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { APP_CONFIG } from "@/lib/constants"
import Link from "next/link"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface AdminHeaderProps {
  user: SupabaseUser
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      toast.success("Berhasil logout")
      router.push("/")
    } catch (error) {
      toast.error("Gagal logout")
    }
  }

  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase()
  }

  return (
    <header className="border-b border-border/50 glass backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">{APP_CONFIG.name}</span>
              </div>
              <span className="font-bold text-xl">{APP_CONFIG.name}</span>
            </Link>

            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-secondary/20 text-secondary">
              <Shield className="w-3 h-3" />
              <span className="text-xs font-medium">Admin</span>
            </div>

            <nav className="hidden md:flex items-center space-x-1">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin">
                  <Shield className="w-4 h-4 mr-2" />
                  Admin
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/providers">Providers</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/countries">Countries</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/thanks">Thanks To</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <Home className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
            </nav>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.user_metadata?.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback className="bg-secondary/20 text-secondary">
                    {getInitials(user.email || "")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 glass border-border/50" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.user_metadata?.display_name || user.email?.split("@")[0]}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Shield className="w-3 h-3 text-secondary" />
                    <span className="text-xs text-secondary">Administrator</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
