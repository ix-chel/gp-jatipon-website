-- Phase 1: Supabase foundation hardening for GP Jatipon.
-- This migration keeps the existing public schema and tightens access boundaries.

-- Role helper functions are used by RLS policies only. They deliberately read
-- from user_roles rather than client-controlled auth user metadata.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = (SELECT auth.uid())
      AND role = 'admin'
  );
$$;

CREATE OR REPLACE FUNCTION public.is_editor()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = (SELECT auth.uid())
      AND role = 'editor'
  );
$$;

CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.is_admin() OR public.is_editor();
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_editor() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_staff() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_editor() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_staff() TO authenticated, service_role;

-- Be explicit about Data API reachability. RLS remains the security boundary
-- for row access after these grants.
GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT SELECT ON TABLE
  public.profiles,
  public.content,
  public.activities,
  public.archives,
  public.boosts,
  public.media_assets,
  public.content_media,
  public.activity_media,
  public.archive_media
TO anon, authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE
  public.user_roles,
  public.content,
  public.activities,
  public.archives,
  public.boosts,
  public.media_assets,
  public.content_media,
  public.activity_media,
  public.archive_media
TO authenticated;

GRANT INSERT, UPDATE ON TABLE public.profiles TO authenticated;

GRANT INSERT ON TABLE
  public.contact_submissions,
  public.community_submissions
TO anon, authenticated;

GRANT SELECT, UPDATE, DELETE ON TABLE
  public.contact_submissions,
  public.community_submissions
TO authenticated;

-- Keep editors from mutating already-published records. Editors may draft;
-- admins remain the publishing/deletion authority.
DROP POLICY IF EXISTS "Editors can update content" ON public.content;
CREATE POLICY "Editors can update draft content"
ON public.content
FOR UPDATE
TO authenticated
USING (
  public.is_admin()
  OR (public.is_editor() AND status = 'draft')
)
WITH CHECK (
  public.is_admin()
  OR (public.is_editor() AND status = 'draft')
);

DROP POLICY IF EXISTS "Editors can update activities" ON public.activities;
CREATE POLICY "Editors can update draft activities"
ON public.activities
FOR UPDATE
TO authenticated
USING (
  public.is_admin()
  OR (public.is_editor() AND status = 'draft')
)
WITH CHECK (
  public.is_admin()
  OR (public.is_editor() AND status = 'draft')
);

DROP POLICY IF EXISTS "Editors can update archives" ON public.archives;
CREATE POLICY "Editors can update draft archives"
ON public.archives
FOR UPDATE
TO authenticated
USING (
  public.is_admin()
  OR (public.is_editor() AND status = 'draft')
)
WITH CHECK (
  public.is_admin()
  OR (public.is_editor() AND status = 'draft')
);

-- BOOST is the next product phase. Editors can prepare drafts/scheduled items,
-- but cannot publish, archive, or change already-published BOOST entries.
DROP POLICY IF EXISTS "Staff can insert boosts" ON public.boosts;
CREATE POLICY "Staff can insert boosts"
ON public.boosts
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_admin()
  OR (public.is_editor() AND status IN ('draft', 'scheduled'))
);

DROP POLICY IF EXISTS "Staff can update boosts" ON public.boosts;
CREATE POLICY "Staff can update boosts"
ON public.boosts
FOR UPDATE
TO authenticated
USING (
  public.is_admin()
  OR (public.is_editor() AND status IN ('draft', 'scheduled'))
)
WITH CHECK (
  public.is_admin()
  OR (public.is_editor() AND status IN ('draft', 'scheduled'))
);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_boosts_updated_at ON public.boosts;
CREATE TRIGGER set_boosts_updated_at
BEFORE UPDATE ON public.boosts
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();
