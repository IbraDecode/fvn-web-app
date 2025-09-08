-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.numbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.otp_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.traffic_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.thanks_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "users_select_own" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users_insert_own" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "users_update_own" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Providers policies (public read, admin write)
CREATE POLICY "providers_select_all" ON public.providers FOR SELECT USING (active = true);
CREATE POLICY "providers_admin_all" ON public.providers FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- Countries policies (public read, admin write)
CREATE POLICY "countries_select_all" ON public.countries FOR SELECT USING (active = true);
CREATE POLICY "countries_admin_all" ON public.countries FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- Numbers policies (users can see their own, admins see all)
CREATE POLICY "numbers_select_own" ON public.numbers FOR SELECT USING (
  assigned_to_user = auth.uid() OR 
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "numbers_insert_admin" ON public.numbers FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "numbers_update_admin" ON public.numbers FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- OTP messages policies (users can see messages for their numbers)
CREATE POLICY "otp_messages_select_own" ON public.otp_messages FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.numbers 
    WHERE id = otp_messages.number_id 
    AND assigned_to_user = auth.uid()
  ) OR
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "otp_messages_insert_system" ON public.otp_messages FOR INSERT WITH CHECK (true);

-- Traffic logs policies (admin only)
CREATE POLICY "traffic_logs_admin_all" ON public.traffic_logs FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- Thanks entries policies (public read, admin write)
CREATE POLICY "thanks_entries_select_all" ON public.thanks_entries FOR SELECT USING (active = true);
CREATE POLICY "thanks_entries_admin_all" ON public.thanks_entries FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- Announcements policies (public read, admin write)
CREATE POLICY "announcements_select_all" ON public.announcements FOR SELECT USING (active = true);
CREATE POLICY "announcements_admin_all" ON public.announcements FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- Rate limits policies (users see own, admin sees all)
CREATE POLICY "rate_limits_select_own" ON public.rate_limits FOR SELECT USING (
  user_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "rate_limits_insert_system" ON public.rate_limits FOR INSERT WITH CHECK (true);
CREATE POLICY "rate_limits_update_system" ON public.rate_limits FOR UPDATE USING (true);

-- Audit logs policies (admin only)
CREATE POLICY "audit_logs_admin_select" ON public.audit_logs FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "audit_logs_insert_system" ON public.audit_logs FOR INSERT WITH CHECK (true);
