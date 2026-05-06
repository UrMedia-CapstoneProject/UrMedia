create table public.friends (
  created_at timestamp with time zone null default (now() AT TIME ZONE 'utc'::text),
  follower_id uuid not null,
  following_id uuid not null,
  constraint Friends_pkey primary key (follower_id, following_id),
  constraint friends_follower_id_fkey foreign KEY (follower_id) references profiles (id) on delete CASCADE,
  constraint friends_following_id_fkey foreign KEY (following_id) references profiles (id) on delete CASCADE
) TABLESPACE pg_default;