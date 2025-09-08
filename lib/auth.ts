import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import type { User } from "@supabase/supabase-js"

export async function getUser(): Promise<User | null> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  return user
}

export async function requireAuth(): Promise<User> {
  const user = await getUser()
  if (!user) {
    redirect("/auth/login")
  }
  return user
}

export async function requireAdmin(): Promise<User> {
  const user = await requireAuth()
  const supabase = await createClient()

  const { data: userData } = await supabase.from("users").select("role").eq("id", user.id).single()

  if (userData?.role !== "admin") {
    redirect("/dashboard")
  }

  return user
}

export async function getUserRole(userId: string): Promise<string> {
  const supabase = await createClient()

  const { data: userData } = await supabase.from("users").select("role").eq("id", userId).single()

  return userData?.role || "user"
}
