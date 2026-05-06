create table public.user_tracked_movies (
  user_id uuid not null,
  media_id bigint not null,
  watch_status text null default '''plan''::text'::text,
  starting_date date null,
  ending_date date null,
  rating real null,
  review text null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  repeat_count smallint null,
  constraint user_tracked_movies2_pkey primary key (user_id, media_id),
  constraint user_tracked_movies2_media_id_fkey foreign KEY (media_id) references media (id) on delete CASCADE,
  constraint user_tracked_movies2_user_id_fkey foreign KEY (user_id) references profiles (id) on delete CASCADE
) TABLESPACE pg_default;