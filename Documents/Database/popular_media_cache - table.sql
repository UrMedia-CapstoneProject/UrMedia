create table public.popular_media_cache (
  media_group text not null,
  timeframe text not null,
  media_id bigint not null,
  follow_count bigint not null,
  rank integer not null,
  updated_at timestamp with time zone not null default now(),
  source text null,
  media_type text null,
  external_id text null,
  title text null,
  image_url text null,
  release_date date null,
  synopsis text null,
  next_release_date timestamp with time zone null,
  constraint popular_media_cache_pkey_copy primary key (media_group, timeframe, rank),
  constraint popular_media_cache_unique_media_copy unique (media_group, timeframe, media_id),
  constraint popular_media_cache_media_id_fkey_copy foreign KEY (media_id) references media (id) on delete CASCADE,
  constraint popular_media_cache_group_check_copy check (
    (
      media_group = any (
        array[
          'movies'::text,
          'shows'::text,
          'games'::text,
          'books'::text
        ]
      )
    )
  ),
  constraint popular_media_cache_timeframe_check check (
    (
      timeframe = any (array['all_time'::text, '7d'::text, '30d'::text])
    )
  )
) TABLESPACE pg_default;