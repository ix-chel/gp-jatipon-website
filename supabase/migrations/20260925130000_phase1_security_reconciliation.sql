-- Phase 1.1: reconcile live RLS and grants with the tracked security model.
-- This migration is intentionally non-destructive for data: it only adjusts
-- helper functions, grants, RLS policy definitions, and the BOOST updated_at
-- trigger expected by Phase 1.

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
SET row_security = off
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
SET row_security = off
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

REVOKE ALL ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.set_updated_at() TO service_role;

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.archives ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boosts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.archive_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_submissions ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON TABLE
  public.profiles,
  public.user_roles,
  public.content,
  public.activities,
  public.archives,
  public.boosts,
  public.media_assets,
  public.content_media,
  public.activity_media,
  public.archive_media,
  public.contact_submissions,
  public.community_submissions
FROM anon, authenticated;

REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM anon, authenticated;

GRANT USAGE ON SCHEMA public TO anon, authenticated;

GRANT SELECT ON TABLE
  public.content,
  public.activities,
  public.archives,
  public.boosts,
  public.media_assets,
  public.content_media,
  public.activity_media,
  public.archive_media
TO anon, authenticated;

GRANT SELECT, INSERT, UPDATE ON TABLE public.profiles TO authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE
  public.user_roles,
  public.content,
  public.activities,
  public.archives,
  public.boosts,
  public.media_assets,
  public.content_media,
  public.activity_media,
  public.archive_media,
  public.contact_submissions,
  public.community_submissions
TO authenticated;

GRANT INSERT ON TABLE
  public.contact_submissions,
  public.community_submissions
TO anon;

-- Remove historical and live policy names so permissive policies do not stack.
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "profiles_self_insert" ON public.profiles;
DROP POLICY IF EXISTS "profiles_self_or_admin_select" ON public.profiles;
DROP POLICY IF EXISTS "profiles_self_or_admin_update" ON public.profiles;

DROP POLICY IF EXISTS "user_roles viewable by admins" ON public.user_roles;
DROP POLICY IF EXISTS "user_roles manageable by admins only" ON public.user_roles;
DROP POLICY IF EXISTS "roles_staff_select" ON public.user_roles;
DROP POLICY IF EXISTS "roles_admin_insert" ON public.user_roles;
DROP POLICY IF EXISTS "roles_admin_update" ON public.user_roles;
DROP POLICY IF EXISTS "roles_admin_delete" ON public.user_roles;

DROP POLICY IF EXISTS "Public content viewable by everyone" ON public.content;
DROP POLICY IF EXISTS "Authenticated users view all content" ON public.content;
DROP POLICY IF EXISTS "Editors can insert draft content" ON public.content;
DROP POLICY IF EXISTS "Editors can update content" ON public.content;
DROP POLICY IF EXISTS "Editors can update draft content" ON public.content;
DROP POLICY IF EXISTS "Admins can delete content" ON public.content;
DROP POLICY IF EXISTS "content_public_or_staff_select" ON public.content;
DROP POLICY IF EXISTS "content_staff_insert" ON public.content;
DROP POLICY IF EXISTS "content_staff_update" ON public.content;
DROP POLICY IF EXISTS "content_admin_delete" ON public.content;

DROP POLICY IF EXISTS "Public activities viewable by everyone" ON public.activities;
DROP POLICY IF EXISTS "Authenticated users view all activities" ON public.activities;
DROP POLICY IF EXISTS "Editors can insert activities" ON public.activities;
DROP POLICY IF EXISTS "Editors can update activities" ON public.activities;
DROP POLICY IF EXISTS "Editors can update draft activities" ON public.activities;
DROP POLICY IF EXISTS "Admins can delete activities" ON public.activities;
DROP POLICY IF EXISTS "activities_public_or_staff_select" ON public.activities;
DROP POLICY IF EXISTS "activities_staff_insert" ON public.activities;
DROP POLICY IF EXISTS "activities_staff_update" ON public.activities;
DROP POLICY IF EXISTS "activities_admin_delete" ON public.activities;

DROP POLICY IF EXISTS "Public archives viewable by everyone" ON public.archives;
DROP POLICY IF EXISTS "Authenticated users view all archives" ON public.archives;
DROP POLICY IF EXISTS "Editors can insert archives" ON public.archives;
DROP POLICY IF EXISTS "Editors can update archives" ON public.archives;
DROP POLICY IF EXISTS "Editors can update draft archives" ON public.archives;
DROP POLICY IF EXISTS "Admins can delete archives" ON public.archives;
DROP POLICY IF EXISTS "archives_public_or_staff_select" ON public.archives;
DROP POLICY IF EXISTS "archives_staff_insert" ON public.archives;
DROP POLICY IF EXISTS "archives_staff_update" ON public.archives;
DROP POLICY IF EXISTS "archives_admin_delete" ON public.archives;

DROP POLICY IF EXISTS "Public boosts are viewable by everyone" ON public.boosts;
DROP POLICY IF EXISTS "Staff can view all boosts" ON public.boosts;
DROP POLICY IF EXISTS "Staff can insert boosts" ON public.boosts;
DROP POLICY IF EXISTS "Staff can update boosts" ON public.boosts;
DROP POLICY IF EXISTS "Admins can delete boosts" ON public.boosts;

DROP POLICY IF EXISTS "Media viewable by everyone" ON public.media_assets;
DROP POLICY IF EXISTS "Media manageable by admins and editors" ON public.media_assets;
DROP POLICY IF EXISTS "media_staff_select" ON public.media_assets;
DROP POLICY IF EXISTS "media_staff_insert" ON public.media_assets;
DROP POLICY IF EXISTS "media_staff_update" ON public.media_assets;
DROP POLICY IF EXISTS "media_admin_delete" ON public.media_assets;

DROP POLICY IF EXISTS "Media junctions viewable by everyone" ON public.content_media;
DROP POLICY IF EXISTS "Media junctions manageable by admins and editors" ON public.content_media;
DROP POLICY IF EXISTS "content_media_staff_all" ON public.content_media;

DROP POLICY IF EXISTS "Activity media viewable by everyone" ON public.activity_media;
DROP POLICY IF EXISTS "Activity media manageable by admins and editors" ON public.activity_media;
DROP POLICY IF EXISTS "activity_media_staff_all" ON public.activity_media;

DROP POLICY IF EXISTS "Archive media viewable by everyone" ON public.archive_media;
DROP POLICY IF EXISTS "Archive media manageable by admins and editors" ON public.archive_media;
DROP POLICY IF EXISTS "archive_media_staff_all" ON public.archive_media;

DROP POLICY IF EXISTS "Anyone can insert contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Only admins can view contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Only admins can manage contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "contact_public_insert" ON public.contact_submissions;
DROP POLICY IF EXISTS "contact_staff_select" ON public.contact_submissions;
DROP POLICY IF EXISTS "contact_staff_update" ON public.contact_submissions;
DROP POLICY IF EXISTS "contact_admin_delete" ON public.contact_submissions;

DROP POLICY IF EXISTS "Anyone can insert community submissions" ON public.community_submissions;
DROP POLICY IF EXISTS "Only admins can view community submissions" ON public.community_submissions;
DROP POLICY IF EXISTS "Only admins can manage community submissions" ON public.community_submissions;
DROP POLICY IF EXISTS "community_public_insert" ON public.community_submissions;
DROP POLICY IF EXISTS "community_staff_select" ON public.community_submissions;
DROP POLICY IF EXISTS "community_staff_update" ON public.community_submissions;
DROP POLICY IF EXISTS "community_admin_delete" ON public.community_submissions;

CREATE POLICY "profiles_self_insert"
ON public.profiles
FOR INSERT
TO authenticated
WITH CHECK ((SELECT auth.uid()) = id);

CREATE POLICY "profiles_self_or_admin_select"
ON public.profiles
FOR SELECT
TO authenticated
USING ((SELECT auth.uid()) = id OR public.is_admin());

CREATE POLICY "profiles_self_or_admin_update"
ON public.profiles
FOR UPDATE
TO authenticated
USING ((SELECT auth.uid()) = id OR public.is_admin())
WITH CHECK ((SELECT auth.uid()) = id OR public.is_admin());

CREATE POLICY "roles_staff_select"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.is_staff());

CREATE POLICY "roles_admin_insert"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "roles_admin_update"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "roles_admin_delete"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.is_admin());

CREATE POLICY "content_public_select"
ON public.content
FOR SELECT
TO anon, authenticated
USING (status = 'published'::public.publish_status);

CREATE POLICY "content_staff_select"
ON public.content
FOR SELECT
TO authenticated
USING (public.is_staff());

CREATE POLICY "content_staff_insert"
ON public.content
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_admin()
  OR (public.is_editor() AND status = 'draft'::public.publish_status)
);

CREATE POLICY "content_staff_update"
ON public.content
FOR UPDATE
TO authenticated
USING (
  public.is_admin()
  OR (public.is_editor() AND status = 'draft'::public.publish_status)
)
WITH CHECK (
  public.is_admin()
  OR (public.is_editor() AND status = 'draft'::public.publish_status)
);

CREATE POLICY "content_admin_delete"
ON public.content
FOR DELETE
TO authenticated
USING (public.is_admin());

CREATE POLICY "activities_public_select"
ON public.activities
FOR SELECT
TO anon, authenticated
USING (status = 'published'::public.publish_status);

CREATE POLICY "activities_staff_select"
ON public.activities
FOR SELECT
TO authenticated
USING (public.is_staff());

CREATE POLICY "activities_staff_insert"
ON public.activities
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_admin()
  OR (public.is_editor() AND status = 'draft'::public.publish_status)
);

CREATE POLICY "activities_staff_update"
ON public.activities
FOR UPDATE
TO authenticated
USING (
  public.is_admin()
  OR (public.is_editor() AND status = 'draft'::public.publish_status)
)
WITH CHECK (
  public.is_admin()
  OR (public.is_editor() AND status = 'draft'::public.publish_status)
);

CREATE POLICY "activities_admin_delete"
ON public.activities
FOR DELETE
TO authenticated
USING (public.is_admin());

CREATE POLICY "archives_public_select"
ON public.archives
FOR SELECT
TO anon, authenticated
USING (status = 'published'::public.publish_status);

CREATE POLICY "archives_staff_select"
ON public.archives
FOR SELECT
TO authenticated
USING (public.is_staff());

CREATE POLICY "archives_staff_insert"
ON public.archives
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_admin()
  OR (public.is_editor() AND status = 'draft'::public.publish_status)
);

CREATE POLICY "archives_staff_update"
ON public.archives
FOR UPDATE
TO authenticated
USING (
  public.is_admin()
  OR (public.is_editor() AND status = 'draft'::public.publish_status)
)
WITH CHECK (
  public.is_admin()
  OR (public.is_editor() AND status = 'draft'::public.publish_status)
);

CREATE POLICY "archives_admin_delete"
ON public.archives
FOR DELETE
TO authenticated
USING (public.is_admin());

CREATE POLICY "boosts_public_select"
ON public.boosts
FOR SELECT
TO anon, authenticated
USING (
  status = 'published'::public.boost_status
  AND publish_date <= (CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Jakarta')::date
);

CREATE POLICY "boosts_staff_select"
ON public.boosts
FOR SELECT
TO authenticated
USING (public.is_staff());

CREATE POLICY "boosts_staff_insert"
ON public.boosts
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_admin()
  OR (public.is_editor() AND status IN ('draft'::public.boost_status, 'scheduled'::public.boost_status))
);

CREATE POLICY "boosts_staff_update"
ON public.boosts
FOR UPDATE
TO authenticated
USING (
  public.is_admin()
  OR (public.is_editor() AND status IN ('draft'::public.boost_status, 'scheduled'::public.boost_status))
)
WITH CHECK (
  public.is_admin()
  OR (public.is_editor() AND status IN ('draft'::public.boost_status, 'scheduled'::public.boost_status))
);

CREATE POLICY "boosts_admin_delete"
ON public.boosts
FOR DELETE
TO authenticated
USING (public.is_admin());

CREATE POLICY "media_public_select"
ON public.media_assets
FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.content_media cm
    JOIN public.content c ON c.id = cm.content_id
    WHERE cm.media_id = media_assets.id
      AND c.status = 'published'::public.publish_status
  )
  OR EXISTS (
    SELECT 1
    FROM public.activity_media am
    JOIN public.activities a ON a.id = am.activity_id
    WHERE am.media_id = media_assets.id
      AND a.status = 'published'::public.publish_status
  )
  OR EXISTS (
    SELECT 1
    FROM public.archive_media arm
    JOIN public.archives ar ON ar.id = arm.archive_id
    WHERE arm.media_id = media_assets.id
      AND ar.status = 'published'::public.publish_status
  )
);

CREATE POLICY "media_staff_insert"
ON public.media_assets
FOR INSERT
TO authenticated
WITH CHECK (
  public.is_admin()
  OR (public.is_editor() AND uploaded_by = (SELECT auth.uid()))
);

CREATE POLICY "media_staff_update"
ON public.media_assets
FOR UPDATE
TO authenticated
USING (public.is_staff())
WITH CHECK (public.is_staff());

CREATE POLICY "media_admin_delete"
ON public.media_assets
FOR DELETE
TO authenticated
USING (public.is_admin());

CREATE POLICY "content_media_public_select"
ON public.content_media
FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.content c
    WHERE c.id = content_media.content_id
      AND c.status = 'published'::public.publish_status
  )
);

CREATE POLICY "content_media_staff_all"
ON public.content_media
FOR ALL
TO authenticated
USING (public.is_staff())
WITH CHECK (public.is_staff());

CREATE POLICY "activity_media_public_select"
ON public.activity_media
FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.activities a
    WHERE a.id = activity_media.activity_id
      AND a.status = 'published'::public.publish_status
  )
);

CREATE POLICY "activity_media_staff_all"
ON public.activity_media
FOR ALL
TO authenticated
USING (public.is_staff())
WITH CHECK (public.is_staff());

CREATE POLICY "archive_media_public_select"
ON public.archive_media
FOR SELECT
TO anon, authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.archives ar
    WHERE ar.id = archive_media.archive_id
      AND ar.status = 'published'::public.publish_status
  )
);

CREATE POLICY "archive_media_staff_all"
ON public.archive_media
FOR ALL
TO authenticated
USING (public.is_staff())
WITH CHECK (public.is_staff());

CREATE POLICY "contact_public_insert"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "contact_admin_select"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "contact_admin_update"
ON public.contact_submissions
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "contact_admin_delete"
ON public.contact_submissions
FOR DELETE
TO authenticated
USING (public.is_admin());

CREATE POLICY "community_public_insert"
ON public.community_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (privacy_consent = true);

CREATE POLICY "community_admin_select"
ON public.community_submissions
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "community_admin_update"
ON public.community_submissions
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "community_admin_delete"
ON public.community_submissions
FOR DELETE
TO authenticated
USING (public.is_admin());

DROP TRIGGER IF EXISTS set_boosts_updated_at ON public.boosts;
CREATE TRIGGER set_boosts_updated_at
BEFORE UPDATE ON public.boosts
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();
