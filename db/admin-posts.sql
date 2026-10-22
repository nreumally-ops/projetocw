CREATE TABLE IF NOT EXISTS public.cwmunista_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_x_user_id TEXT NOT NULL,
    author_name TEXT NOT NULL DEFAULT '',
    author_username TEXT NOT NULL,
    content_html TEXT NOT NULL,
    published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS cwmunista_posts_published_created_at_idx
    ON public.cwmunista_posts (created_at DESC)
    WHERE published IS TRUE;