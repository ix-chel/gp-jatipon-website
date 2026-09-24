-- Migration: Create boosts table for Daily Devotional feature
-- Migration ID: 20260924100000_create_boosts_table.sql

-- 1. Create enum for boost status
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'boost_status') THEN
        CREATE TYPE boost_status AS ENUM ('draft', 'scheduled', 'published', 'archived');
    END IF;
END $$;

-- 2. Create boosts table
CREATE TABLE IF NOT EXISTS public.boosts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    slug text UNIQUE NOT NULL,
    title text NOT NULL,
    scripture_reference text NOT NULL,
    scripture_text text NOT NULL,
    reflection text NOT NULL,
    prayer text,
    author text DEFAULT 'Tim Pelayanan GP Jatipon',
    publish_date date NOT NULL,
    status boost_status DEFAULT 'draft' NOT NULL,
    cover_image text,
    created_by uuid REFERENCES auth.users (id) ON DELETE SET NULL,
    updated_by uuid REFERENCES auth.users (id) ON DELETE SET NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

-- 3. Constraints and Indexes
-- Only one active (published or scheduled) BOOST allowed per publish_date
CREATE UNIQUE INDEX IF NOT EXISTS unique_active_boost_publish_date 
ON public.boosts (publish_date) 
WHERE (status IN ('published', 'scheduled'));

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_boosts_publish_date_status 
ON public.boosts (publish_date DESC, status);

CREATE INDEX IF NOT EXISTS idx_boosts_slug 
ON public.boosts (slug);

CREATE INDEX IF NOT EXISTS idx_boosts_status 
ON public.boosts (status);

-- 4. Enable RLS
ALTER TABLE public.boosts ENABLE ROW LEVEL SECURITY;

-- Ensure helper functions exist & grant permissions
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_editor() TO anon, authenticated;

-- 5. RLS Policies
-- Drop existing policies if any
DROP POLICY IF EXISTS "Public boosts are viewable by everyone" ON public.boosts;
DROP POLICY IF EXISTS "Staff can view all boosts" ON public.boosts;
DROP POLICY IF EXISTS "Staff can insert boosts" ON public.boosts;
DROP POLICY IF EXISTS "Staff can update boosts" ON public.boosts;
DROP POLICY IF EXISTS "Admins can delete boosts" ON public.boosts;

-- Public can view:
-- - Published BOOST whose publish_date has arrived in Asia/Jakarta timezone
-- - Archived BOOST
CREATE POLICY "Public boosts are viewable by everyone" 
ON public.boosts FOR SELECT 
USING (
    (status = 'published' AND publish_date <= (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Jakarta')::date)
    OR status = 'archived'
);

-- Authenticated admins and editors can view all boosts (including drafts and future scheduled)
CREATE POLICY "Staff can view all boosts" 
ON public.boosts FOR SELECT 
TO authenticated 
USING (
    is_admin() OR is_editor()
);

-- Admins and editors can create boosts
CREATE POLICY "Staff can insert boosts" 
ON public.boosts FOR INSERT 
TO authenticated 
WITH CHECK (
    is_admin() OR is_editor()
);

-- Admins and editors can update boosts
CREATE POLICY "Staff can update boosts" 
ON public.boosts FOR UPDATE 
TO authenticated 
USING (
    is_admin() OR is_editor()
)
WITH CHECK (
    is_admin() OR is_editor()
);

-- Only admins can delete boosts
CREATE POLICY "Admins can delete boosts" 
ON public.boosts FOR DELETE 
TO authenticated 
USING (
    is_admin()
);
