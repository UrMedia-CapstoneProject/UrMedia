create table public.user_tracked_shows (
  user_id uuid not null,
  media_id bigint not null,
  watch_status text not null default 'Watching'::text,
  starting_date date null,
  ending_date date null,
  rating real null,
  episodes_watched bigint null,
  review text null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  repeat_count smallint null,
  constraint user_tracked_shows2_pkey primary key (user_id, media_id),
  constraint user_tracked_shows2_media_id_fkey foreign KEY (media_id) references media (id) on delete CASCADE,
  constraint user_tracked_shows2_user_id_fkey foreign KEY (user_id) references profiles (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists user_tracked_shows_user_id_idx on public.user_tracked_shows using btree (user_id) TABLESPACE pg_default;