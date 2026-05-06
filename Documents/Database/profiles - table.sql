create table public.profiles (
  id uuid not null,
  username text null default ''::text,
  birthday date null,
  biography text null default 'No biography'::text,
  profile_picture text null,
  date_joined date null default CURRENT_DATE,
  created_at timestamp with time zone null default now(),
  constraint profiles_pkey primary key (id),
  constraint profiles_username_key unique (username),
  constraint profiles_id_fkey foreign KEY (id) references auth.users (id) on delete CASCADE
) TABLESPACE pg_default;