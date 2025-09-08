-- Seed initial providers
INSERT INTO public.providers (name, slug, logo_url, active) VALUES
('WhatsApp', 'whatsapp', '/images/providers/whatsapp.svg', true),
('Facebook', 'facebook', '/images/providers/facebook.svg', true),
('Telegram', 'telegram', '/images/providers/telegram.svg', true),
('Instagram', 'instagram', '/images/providers/instagram.svg', true),
('Twitter', 'twitter', '/images/providers/twitter.svg', true)
ON CONFLICT (slug) DO NOTHING;

-- Seed initial countries
INSERT INTO public.countries (name, iso2, flag_url, priority, active) VALUES
('Indonesia', 'ID', '/images/flags/id.svg', 1, true),
('United States', 'US', '/images/flags/us.svg', 2, true),
('India', 'IN', '/images/flags/in.svg', 3, true),
('United Kingdom', 'GB', '/images/flags/gb.svg', 4, true),
('Germany', 'DE', '/images/flags/de.svg', 5, true),
('France', 'FR', '/images/flags/fr.svg', 6, true),
('Canada', 'CA', '/images/flags/ca.svg', 7, true),
('Australia', 'AU', '/images/flags/au.svg', 8, true)
ON CONFLICT (iso2) DO NOTHING;

-- Seed initial Thanks To entries
INSERT INTO public.thanks_entries (name, role, photo_url, website_url, contact_url, position, active) VALUES
('Ibra Decode', 'Full Stack Engineering & Creator', '/images/team/ibra-decode.jpg', 'https://ibra.biz.id', 'mailto:contact@ibra.biz.id', 1, true),
('Hunter Of Methode', 'Provider', '/images/team/hunter.jpg', '#', '#', 2, true)
ON CONFLICT DO NOTHING;

-- Create some sample virtual numbers for testing
INSERT INTO public.numbers (provider_id, country_id, msisdn, status) 
SELECT 
  p.id,
  c.id,
  '+' || CASE c.iso2 
    WHEN 'ID' THEN '62' || (8000000000 + (random() * 999999999)::bigint)::text
    WHEN 'US' THEN '1' || (2000000000 + (random() * 999999999)::bigint)::text
    WHEN 'IN' THEN '91' || (7000000000 + (random() * 999999999)::bigint)::text
    ELSE '44' || (7000000000 + (random() * 999999999)::bigint)::text
  END,
  'available'
FROM public.providers p
CROSS JOIN public.countries c
WHERE p.active = true AND c.active = true
LIMIT 50;
