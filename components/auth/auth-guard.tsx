"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireAdmin?: boolean
  redirectTo?: string
}

export function AuthGuard({
  children,
  requireAuth = true,
  requireAdmin = false,
  redirectTo = "/auth/login",
}: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)

        if (user && requireAdmin) {
          // Check user role from database
          const { data: userData } = await supabase.from("users").select("role").eq("id", user.id).single()

          setUserRole(userData?.role || "user")
        }
      } catch (error) {
        console.error("Auth check error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user || null)
      if (!session?.user) {
        setUserRole(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase, requireAdmin])

  useEffect(() => {
    if (!loading) {
      if (requireAuth && !user) {
        router.push(redirectTo)
      } else if (requireAdmin && userRole !== "admin") {
        router.push("/dashboard")
      }
    }
  }, [loading, user, userRole, requireAuth, requireAdmin, router, redirectTo])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Memuat...</p>
        </div>
      </div>
    )
  }

  if (requireAuth && !user) {
    return null
  }

  if (requireAdmin && userRole !== "admin") {
    return null
  }

  return <>{children}</>
}
