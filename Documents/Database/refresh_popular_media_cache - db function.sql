create or replace function public.refresh_popular_media_cache(
  target_media_group text,
  target_timeframe text
)
returns void
language plpgsql
as $$
begin
  -- Validate media group
  if target_media_group not in ('movies', 'shows', 'games', 'books') then
    raise exception 'Invalid media_group: %', target_media_group;
  end if;

  -- Validate timeframe
  if target_timeframe not in ('all_time', '7d', '30d') then
    raise exception 'Invalid timeframe: %', target_timeframe;
  end if;

  -- Remove only the rows for the requested group/timeframe
  delete from public.popular_media_cache
  where media_group = target_media_group
    and timeframe = target_timeframe;

  -- Rebuild only that group/timeframe
  insert into public.popular_media_cache (
    media_group,
    timeframe,
    media_id,
    follow_count,
    rank,
    updated_at,
    source,
    media_type,
    external_id,
    title,
    image_url,
    release_date,
    next_release_date,
    synopsis
  )
  select
    target_media_group,
    target_timeframe,
    ranked.media_id,
    ranked.follow_count,
    ranked.rank,
    now(),
    ranked.source,
    ranked.media_type,
    ranked.external_id,
    ranked.title,
    ranked.image_url,
    ranked.release_date,
    ranked.next_release_date,
    ranked.synopsis
  from (
    select
      m.id as media_id,
      m.source,
      m.media_type,
      m.external_id,
      m.title,
      m.image_url,
      m.release_date,
      m.next_release_date,
      m.synopsis,
      count(*) as follow_count,
      row_number() over (
        order by count(*) desc, m.created_at asc, m.id asc
      ) as rank
    from public.media_follows mf
    join public.media m
      on m.id = mf.media_id
    where
      (
        (
          target_media_group = 'movies'
          and m.media_type in ('movie', 'anime_movie')
        )
        or
        (
          target_media_group = 'shows'
          and m.media_type in ('show', 'anime_show')
        )
        or
        (
          target_media_group = 'games'
          and m.media_type = 'game'
        )
        or
        (
          target_media_group = 'books'
          and m.media_type = 'book'
        )
      )
      and
      (
        target_timeframe = 'all_time'
        or
        (
          target_timeframe = '7d'
          and mf.created_at >= now() - interval '7 days'
        )
        or
        (
          target_timeframe = '30d'
          and mf.created_at >= now() - interval '30 days'
        )
      )
    group by
      m.id,
      m.source,
      m.media_type,
      m.external_id,
      m.title,
      m.image_url,
      m.release_date,
      m.next_release_date,
      m.synopsis,
      m.created_at
  ) ranked
  where ranked.rank <= 5;
end;
$$;