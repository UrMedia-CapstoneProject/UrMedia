create table public.media (
  id bigint generated always as identity not null,
  source text not null,
  media_type text not null,
  external_id text not null,
  title text null,
  image_url text null,
  release_date date null,
  next_release_date timestamp with time zone null,
  status text null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  synopsis text null,
  metadata_updated_at timestamp with time zone null,
  constraint media_pkey primary key (id),
  constraint media_source_type_external_unique unique (source, media_type, external_id),
  constraint media_source_check check (
    (
      source = any (
        array[
          'tmdb'::text,
          'jikan'::text,
          'rawg'::text,
          'google_books'::text
        ]
      )
    )
  ),
  constraint media_source_type_valid_check check (
    (
      (
        (source = 'tmdb'::text)
        and (
          media_type = any (array['movie'::text, 'show'::text])
        )
      )
      or (
        (source = 'jikan'::text)
        and (
          media_type = any (
            array[
              'anime_movie'::text,
              'anime_show'::text,
              'manga'::text
            ]
          )
        )
      )
      or (
        (source = 'rawg'::text)
        and (media_type = 'game'::text)
      )
      or (
        (source = 'google_books'::text)
        and (media_type = 'book'::text)
      )
    )
  ),
  constraint media_type_check check (
    (
      media_type = any (
        array[
          'movie'::text,
          'show'::text,
          'anime_movie'::text,
          'anime_show'::text,
          'game'::text,
          'book'::text,
          'manga'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;