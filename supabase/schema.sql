-- ============================================
-- WIBEN v2 — Supabase Database Schema
-- ============================================

-- MEMBERSHIP APPLICATIONS
CREATE TABLE IF NOT EXISTS membership_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL, last_name TEXT NOT NULL,
  email TEXT NOT NULL, phone TEXT NOT NULL, city TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- MEMBERSHIPS
CREATE TABLE IF NOT EXISTS memberships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  plan TEXT NOT NULL CHECK (plan IN ('yearly','monthly')),
  stripe_customer_id TEXT, stripe_subscription_id TEXT,
  status TEXT NOT NULL DEFAULT 'inactive' CHECK (status IN ('active','inactive','cancelled')),
  start_date TIMESTAMPTZ DEFAULT NOW(), end_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- EVENTS (with image + open_price support)
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_en TEXT NOT NULL, title_fr TEXT NOT NULL,
  description_en TEXT DEFAULT '', description_fr TEXT DEFAULT '',
  date TIMESTAMPTZ NOT NULL, location TEXT NOT NULL,
  price DECIMAL(10,2) DEFAULT 0,
  is_paid BOOLEAN DEFAULT FALSE,
  open_price BOOLEAN DEFAULT FALSE,  -- pay what you can
  capacity INTEGER,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- EVENT REGISTRATIONS
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT,
  payment_status TEXT DEFAULT 'free' CHECK (payment_status IN ('pending','paid','free')),
  amount_paid DECIMAL(10,2),  -- for open price events
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DONATIONS
CREATE TABLE IF NOT EXISTS donations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL, email TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  method TEXT NOT NULL CHECK (method IN ('stripe','paypal','zelle')),
  message TEXT,
  status TEXT DEFAULT 'received',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- POSTS / NEWS (with image)
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_en TEXT NOT NULL, title_fr TEXT NOT NULL,
  content_en TEXT DEFAULT '', content_fr TEXT DEFAULT '',
  excerpt_en TEXT, excerpt_fr TEXT,
  image_url TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- GALLERY FOLDERS (admin-managed)
CREATE TABLE IF NOT EXISTS gallery_folders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name_en TEXT NOT NULL,
  name_fr TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- MEDIA / GALLERY (linked to folders)
CREATE TABLE IF NOT EXISTS media (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  folder_id UUID REFERENCES gallery_folders(id) ON DELETE SET NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'image' CHECK (type IN ('image','video')),
  alt_en TEXT DEFAULT '', alt_fr TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- BOARD MEMBERS
CREATE TABLE IF NOT EXISTS board_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role_en TEXT NOT NULL, role_fr TEXT NOT NULL,
  bio_en TEXT, bio_fr TEXT,
  photo_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- NEWSLETTER SUBSCRIBERS
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SEED: default gallery folders
-- ============================================
INSERT INTO gallery_folders (name_en, name_fr, slug, order_index) VALUES
  ('Meetings', 'Réunions', 'meetings', 1),
  ('Celebrations', 'Célébrations', 'celebrations', 2),
  ('Cultural Food', 'Cuisine Culturelle', 'food', 3),
  ('Workshops', 'Ateliers', 'workshops', 4)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "events_public_read" ON events FOR SELECT USING (is_active = TRUE);
CREATE POLICY "events_admin" ON events FOR ALL USING (auth.role() = 'service_role');

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "posts_public_read" ON posts FOR SELECT USING (is_published = TRUE);
CREATE POLICY "posts_admin" ON posts FOR ALL USING (auth.role() = 'service_role');

ALTER TABLE media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "media_public_read" ON media FOR SELECT USING (TRUE);
CREATE POLICY "media_admin" ON media FOR ALL USING (auth.role() = 'service_role');

ALTER TABLE gallery_folders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "folders_public_read" ON gallery_folders FOR SELECT USING (TRUE);
CREATE POLICY "folders_admin" ON gallery_folders FOR ALL USING (auth.role() = 'service_role');

ALTER TABLE board_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "board_public_read" ON board_members FOR SELECT USING (is_active = TRUE);
CREATE POLICY "board_admin" ON board_members FOR ALL USING (auth.role() = 'service_role');

ALTER TABLE membership_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "apps_insert" ON membership_applications FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "apps_admin" ON membership_applications FOR SELECT USING (auth.role() = 'service_role');
CREATE POLICY "apps_admin_update" ON membership_applications FOR UPDATE USING (auth.role() = 'service_role');

ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "donations_insert" ON donations FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "donations_admin" ON donations FOR SELECT USING (auth.role() = 'service_role');

ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "registrations_insert" ON event_registrations FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "registrations_admin" ON event_registrations FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_media_folder ON media(folder_id);
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(is_published);
CREATE INDEX IF NOT EXISTS idx_apps_status ON membership_applications(status);
