create table public.user_podium (
  id bigint generated always as identity not null,
  user_id uuid not null,
  media_id bigint not null,
  podium_group text not null,
  placement smallint not null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint user_podium_pkey primary key (id),
  constraint user_podium_unique unique (user_id, media_id, podium_group),
  constraint user_podium_media_id_fkey foreign KEY (media_id) references media (id) on delete CASCADE,
  constraint user_podium_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE,
  constraint user_podium_group_check check (
    (
      podium_group = any (
        array[
          'movies'::text,
          'shows'::text,
          'games'::text,
          'books'::text
        ]
      )
    )
  ),
  constraint user_podium_placement_check check ((placement = any (array[1, 2, 3])))
) TABLESPACE pg_default;