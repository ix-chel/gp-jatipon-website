-- ENUM types
CREATE TYPE user_role AS ENUM ('admin', 'editor');

CREATE TYPE content_category AS ENUM ('boost', 'podcast', 'article');

CREATE TYPE publish_status AS ENUM ('draft', 'published', 'archived');

CREATE TYPE media_type_enum AS ENUM ('image', 'audio', 'video', 'document');

CREATE TYPE contact_status AS ENUM ('new', 'in_progress', 'resolved', 'spam');

CREATE TYPE community_sub_type AS ENUM ('join', 'volunteer', 'prayer');

CREATE TYPE community_sub_status AS ENUM ('new', 'reviewed', 'resolved', 'archived');

-- PROFILES
CREATE TABLE profiles (
    id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
    display_name text NOT NULL,
    avatar_url text,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

-- USER ROLES
CREATE TABLE user_roles (
    user_id uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
    role user_role NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL,
    created_by uuid REFERENCES auth.users (id)
);

-- CONTENT
CREATE TABLE content (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    slug text UNIQUE NOT NULL,
    title text NOT NULL,
    category content_category NOT NULL,
    excerpt text,
    body text,
    author_name text,
    status publish_status DEFAULT 'draft' NOT NULL,
    published_at timestamptz,
    created_by uuid REFERENCES auth.users (id),
    updated_by uuid REFERENCES auth.users (id),
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

-- ACTIVITIES
CREATE TABLE activities (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    slug text UNIQUE NOT NULL,
    title text NOT NULL,
    summary text,
    description text,
    starts_at timestamptz NOT NULL,
    ends_at timestamptz,
    location text,
    status publish_status DEFAULT 'draft' NOT NULL,
    created_by uuid REFERENCES auth.users (id),
    updated_by uuid REFERENCES auth.users (id),
    published_at timestamptz,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

-- ARCHIVES
CREATE TABLE archives (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    slug text UNIQUE NOT NULL,
    title text NOT NULL,
    description text,
    archive_year smallint NOT NULL,
    status publish_status DEFAULT 'draft' NOT NULL,
    created_by uuid REFERENCES auth.users (id),
    updated_by uuid REFERENCES auth.users (id),
    published_at timestamptz,
    created_at timestamptz DEFAULT now() NOT NULL,
    updated_at timestamptz DEFAULT now() NOT NULL
);

-- MEDIA ASSETS
CREATE TABLE media_assets (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    storage_path text NOT NULL,
    public_url text,
    media_type media_type_enum NOT NULL,
    mime_type text NOT NULL,
    file_size bigint,
    alt_text text,
    uploaded_by uuid REFERENCES auth.users (id),
    created_at timestamptz DEFAULT now() NOT NULL
);

-- JUNCTION TABLES
CREATE TABLE content_media (
    content_id uuid REFERENCES content (id) ON DELETE CASCADE,
    media_id uuid REFERENCES media_assets (id) ON DELETE CASCADE,
    PRIMARY KEY (content_id, media_id)
);

CREATE TABLE activity_media (
    activity_id uuid REFERENCES activities (id) ON DELETE CASCADE,
    media_id uuid REFERENCES media_assets (id) ON DELETE CASCADE,
    PRIMARY KEY (activity_id, media_id)
);

CREATE TABLE archive_media (
    archive_id uuid REFERENCES archives (id) ON DELETE CASCADE,
    media_id uuid REFERENCES media_assets (id) ON DELETE CASCADE,
    PRIMARY KEY (archive_id, media_id)
);

-- SUBMISSIONS
CREATE TABLE contact_submissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    name text NOT NULL,
    email text NOT NULL,
    message text NOT NULL,
    status contact_status DEFAULT 'new' NOT NULL,
    assigned_to uuid REFERENCES auth.users (id),
    created_at timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE community_submissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid (),
    submission_type community_sub_type NOT NULL,
    name text NOT NULL,
    contact text NOT NULL,
    message text,
    privacy_consent boolean NOT NULL,
    status community_sub_status DEFAULT 'new' NOT NULL,
    created_at timestamptz DEFAULT now() NOT NULL
);

-- ENABLE RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

ALTER TABLE content ENABLE ROW LEVEL SECURITY;

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;

ALTER TABLE archives ENABLE ROW LEVEL SECURITY;

ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;

ALTER TABLE content_media ENABLE ROW LEVEL SECURITY;

ALTER TABLE activity_media ENABLE ROW LEVEL SECURITY;

ALTER TABLE archive_media ENABLE ROW LEVEL SECURITY;

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

ALTER TABLE community_submissions ENABLE ROW LEVEL SECURITY;

-- HELPER FUNCTIONS
CREATE OR REPLACE FUNCTION is_admin() RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_editor() RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_roles
    WHERE user_id = auth.uid() AND role = 'editor'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS POLICIES

-- profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR
SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles FOR
INSERT
WITH
    CHECK (auth.uid () = id);

CREATE POLICY "Users can update own profile" ON profiles FOR
UPDATE USING (auth.uid () = id);

-- user_roles
CREATE POLICY "user_roles viewable by admins" ON user_roles FOR
SELECT USING (
        is_admin ()
        OR auth.uid () = user_id
    );

CREATE POLICY "user_roles manageable by admins only" ON user_roles FOR ALL USING (is_admin ());

-- content
CREATE POLICY "Public content viewable by everyone" ON content FOR
SELECT USING (status = 'published');

CREATE POLICY "Authenticated users view all content" ON content FOR
SELECT TO authenticated USING (
        is_admin ()
        OR is_editor ()
    );

CREATE POLICY "Editors can insert draft content" ON content FOR
INSERT
    TO authenticated
WITH
    CHECK (
        is_admin ()
        OR (
            is_editor ()
            AND status = 'draft'
        )
    );

CREATE POLICY "Editors can update content" ON content FOR
UPDATE TO authenticated USING (
    is_admin ()
    OR is_editor ()
)
WITH
    CHECK (
        is_admin ()
        OR (
            is_editor ()
            AND status != 'published'
        )
    );

CREATE POLICY "Admins can delete content" ON content FOR DELETE TO authenticated USING (is_admin ());

-- activities
CREATE POLICY "Public activities viewable by everyone" ON activities FOR
SELECT USING (status = 'published');

CREATE POLICY "Authenticated users view all activities" ON activities FOR
SELECT TO authenticated USING (
        is_admin ()
        OR is_editor ()
    );

CREATE POLICY "Editors can insert activities" ON activities FOR
INSERT
    TO authenticated
WITH
    CHECK (
        is_admin ()
        OR (
            is_editor ()
            AND status = 'draft'
        )
    );

CREATE POLICY "Editors can update activities" ON activities FOR
UPDATE TO authenticated USING (
    is_admin ()
    OR is_editor ()
)
WITH
    CHECK (
        is_admin ()
        OR (
            is_editor ()
            AND status != 'published'
        )
    );

CREATE POLICY "Admins can delete activities" ON activities FOR DELETE TO authenticated USING (is_admin ());

-- archives
CREATE POLICY "Public archives viewable by everyone" ON archives FOR
SELECT USING (status = 'published');

CREATE POLICY "Authenticated users view all archives" ON archives FOR
SELECT TO authenticated USING (
        is_admin ()
        OR is_editor ()
    );

CREATE POLICY "Editors can insert archives" ON archives FOR
INSERT
    TO authenticated
WITH
    CHECK (
        is_admin ()
        OR (
            is_editor ()
            AND status = 'draft'
        )
    );

CREATE POLICY "Editors can update archives" ON archives FOR
UPDATE TO authenticated USING (
    is_admin ()
    OR is_editor ()
)
WITH
    CHECK (
        is_admin ()
        OR (
            is_editor ()
            AND status != 'published'
        )
    );

CREATE POLICY "Admins can delete archives" ON archives FOR DELETE TO authenticated USING (is_admin ());

-- media_assets & junctions (simplified viewable to all for now)
CREATE POLICY "Media viewable by everyone" ON media_assets FOR
SELECT USING (true);

CREATE POLICY "Media manageable by admins and editors" ON media_assets FOR ALL TO authenticated USING (
    is_admin ()
    OR is_editor ()
);

CREATE POLICY "Media junctions viewable by everyone" ON content_media FOR
SELECT USING (true);

CREATE POLICY "Media junctions manageable by admins and editors" ON content_media FOR ALL TO authenticated USING (
    is_admin ()
    OR is_editor ()
);

CREATE POLICY "Activity media viewable by everyone" ON activity_media FOR
SELECT USING (true);

CREATE POLICY "Activity media manageable by admins and editors" ON activity_media FOR ALL TO authenticated USING (
    is_admin ()
    OR is_editor ()
);

CREATE POLICY "Archive media viewable by everyone" ON archive_media FOR
SELECT USING (true);

CREATE POLICY "Archive media manageable by admins and editors" ON archive_media FOR ALL TO authenticated USING (
    is_admin ()
    OR is_editor ()
);

-- contact_submissions
CREATE POLICY "Anyone can insert contact submissions" ON contact_submissions FOR
INSERT
WITH
    CHECK (true);

CREATE POLICY "Only admins can view contact submissions" ON contact_submissions FOR
SELECT TO authenticated USING (is_admin ());

CREATE POLICY "Only admins can manage contact submissions" ON contact_submissions FOR ALL TO authenticated USING (is_admin ());

-- community_submissions
CREATE POLICY "Anyone can insert community submissions" ON community_submissions FOR
INSERT
WITH
    CHECK (true);

CREATE POLICY "Only admins can view community submissions" ON community_submissions FOR
SELECT TO authenticated USING (is_admin ());

CREATE POLICY "Only admins can manage community submissions" ON community_submissions FOR ALL TO authenticated USING (is_admin ());