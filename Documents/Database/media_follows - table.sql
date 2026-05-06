create table public.media_follows (
  user_id uuid not null,
  media_id bigint not null,
  created_at timestamp with time zone not null default now(),
  constraint media_follows_pkey primary key (user_id, media_id),
  constraint media_follows_media_id_fkey foreign KEY (media_id) references media (id) on delete CASCADE,
  constraint media_follows_user_id_fkey foreign KEY (user_id) references profiles (id) on delete CASCADE
) TABLESPACE pg_default;

create index IF not exists media_follows_media_id_idx on public.media_follows using btree (media_id) TABLESPACE pg_default;