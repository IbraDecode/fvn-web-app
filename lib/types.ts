// FVN Application Types

export interface User {
  id: string
  firebase_uid?: string
  email: string
  display_name?: string
  avatar_url?: string
  role: "user" | "admin"
  created_at: string
  updated_at: string
}

export interface Provider {
  id: string
  name: string
  slug: string
  logo_url?: string
  active: boolean
  created_at: string
}

export interface Country {
  id: string
  name: string
  iso2: string
  flag_url?: string
  priority: number
  active: boolean
  created_at: string
}

export interface VirtualNumber {
  id: string
  provider_id: string
  country_id: string
  msisdn: string
  status: "available" | "assigned" | "expired"
  assigned_to_user?: string
  assigned_at?: string
  expires_at?: string
  created_at: string
  provider?: Provider
  country?: Country
}

export interface OtpMessage {
  id: string
  number_id: string
  received_at: string
  sender?: string
  content: string
  otp_code?: string
  raw_json?: any
  created_at: string
  number?: VirtualNumber
}

export interface TrafficLog {
  id: string
  event: string
  provider_id?: string
  country_id?: string
  user_id?: string
  metadata?: any
  created_at: string
}

export interface ThanksEntry {
  id: string
  name: string
  role: string
  photo_url?: string
  website_url?: string
  contact_url?: string
  position: number
  active: boolean
  created_at: string
}

export interface Announcement {
  id: string
  title: string
  body: string
  level: "info" | "warning" | "success"
  active: boolean
  created_at: string
}

export interface RateLimit {
  id: string
  user_id: string
  window_start: string
  window_end: string
  requests: number
  created_at: string
}

export interface AuditLog {
  id: string
  actor_user_id?: string
  action: string
  target_table?: string
  target_id?: string
  metadata?: any
  created_at: string
}
