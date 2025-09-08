// FVN Application Constants

export const APP_CONFIG = {
  name: "FVN",
  fullName: "Free Virtual Number",
  description: "Get free virtual numbers for SMS OTP verification",
  url: "https://fvn.ibra.biz.id",
  creator: "Ibra Decode",
  creatorUrl: "https://ibra.biz.id",
  version: "1.0.0",
}

export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  DASHBOARD: "/dashboard",
  ADMIN: "/admin",
  TRAFFIC: "/traffic",
  THANKS: "/thanks",
  FAQ: "/faq",
  SUPPORT: "/support",
  TERMS: "/terms",
  PRIVACY: "/privacy",
  DISCLAIMER: "/disclaimer",
}

export const RATE_LIMITS = {
  NUMBER_GENERATION: {
    requests: 5,
    windowMs: 60 * 1000, // 1 minute
  },
  OTP_POLLING: {
    requests: 30,
    windowMs: 60 * 1000, // 1 minute
  },
}

export const OTP_CONFIG = {
  AUTO_HIDE_MINUTES: 10,
  POLLING_INTERVAL_MS: 2000,
  MAX_OTP_AGE_HOURS: 24,
}

export const FOOTER_TEXT = "© FVN – Free Virtual Number || Thank you to the provider. Built by Ibra Decode."
