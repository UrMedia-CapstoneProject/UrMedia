/* =========================
   profiles
   ========================= */

create policy "Profiles are viewable by everyone"
on public.profiles
for select
using (true);

create policy "Users can insert their own profile"
on public.profiles
for insert
with check (((select auth.uid() as uid) = id));

create policy "Users can update their own profile"
on public.profiles
for update
using (((select auth.uid() as uid) = id))
with check (((select auth.uid() as uid) = id));

create policy "Users can delete their own profile"
on public.profiles
for delete
using (((select auth.uid() as uid) = id));


/* =========================
   friends
   ========================= */

create policy "Users can view their friend relationships"
on public.friends
for select
using (
  ((select auth.uid() as uid) = follower_id)
  or
  ((select auth.uid() as uid) = following_id)
);

create policy "Users can add their own friends"
on public.friends
for insert
with check (((select auth.uid() as uid) = follower_id));

create policy "Users can update their own friend relationships"
on public.friends
for update
using (((select auth.uid() as uid) = follower_id))
with check (((select auth.uid() as uid) = follower_id));

create policy "Users can delete their own friend relationships"
on public.friends
for delete
using (((select auth.uid() as uid) = follower_id));


/* =========================
   media
   ========================= */

create policy "Media is viewable by everyone"
on public.media
for select
using (true);


/* =========================
   media_follows
   ========================= */

create policy "Users can view their followed media"
on public.media_follows
for select
using (((select auth.uid() as uid) = user_id));

create policy "Users can follow media"
on public.media_follows
for insert
with check (((select auth.uid() as uid) = user_id));

create policy "Users can update their own followed media"
on public.media_follows
for update
using (((select auth.uid() as uid) = user_id))
with check (((select auth.uid() as uid) = user_id));

create policy "Users can unfollow their own media"
on public.media_follows
for delete
using (((select auth.uid() as uid) = user_id));


/* =========================
   user_podium
   ========================= */

create policy "Users can view their podium"
on public.user_podium
for select
using (((select auth.uid() as uid) = user_id));

create policy "Users can insert their own podium items"
on public.user_podium
for insert
with check (((select auth.uid() as uid) = user_id));

create policy "Users can update their own podium items"
on public.user_podium
for update
using (((select auth.uid() as uid) = user_id))
with check (((select auth.uid() as uid) = user_id));

create policy "Users can delete their own podium items"
on public.user_podium
for delete
using (((select auth.uid() as uid) = user_id));


/* =========================
   popular_media_cache
   ========================= */

create policy "Popular media cache is viewable by everyone"
on public.popular_media_cache
for select
using (true);


/* =========================
   user_tracked_movies
   ========================= */

create policy "Users can view their tracked movies"
on public.user_tracked_movies
for select
using (((select auth.uid() as uid) = user_id));

create policy "Users can insert their own tracked movies"
on public.user_tracked_movies
for insert
with check (((select auth.uid() as uid) = user_id));

create policy "Users can update their own tracked movies"
on public.user_tracked_movies
for update
using (((select auth.uid() as uid) = user_id))
with check (((select auth.uid() as uid) = user_id));

create policy "Users can delete their own tracked movies"
on public.user_tracked_movies
for delete
using (((select auth.uid() as uid) = user_id));


/* =========================
   user_tracked_shows
   ========================= */

create policy "Users can view their tracked shows"
on public.user_tracked_shows
for select
using (((select auth.uid() as uid) = user_id));

create policy "Users can insert their own tracked shows"
on public.user_tracked_shows
for insert
with check (((select auth.uid() as uid) = user_id));

create policy "Users can update their own tracked shows"
on public.user_tracked_shows
for update
using (((select auth.uid() as uid) = user_id))
with check (((select auth.uid() as uid) = user_id));

create policy "Users can delete their own tracked shows"
on public.user_tracked_shows
for delete
using (((select auth.uid() as uid) = user_id));


/* =========================
   user_tracked_animes
   ========================= */

create policy "Users can view their tracked animes"
on public.user_tracked_animes
for select
using (((select auth.uid() as uid) = user_id));

create policy "Users can insert their own tracked animes"
on public.user_tracked_animes
for insert
with check (((select auth.uid() as uid) = user_id));

create policy "Users can update their own tracked animes"
on public.user_tracked_animes
for update
using (((select auth.uid() as uid) = user_id))
with check (((select auth.uid() as uid) = user_id));

create policy "Users can delete their own tracked animes"
on public.user_tracked_animes
for delete
using (((select auth.uid() as uid) = user_id));


/* =========================
   user_tracked_games
   ========================= */

create policy "Users can view their tracked games"
on public.user_tracked_games
for select
using (((select auth.uid() as uid) = user_id));

create policy "Users can insert their own tracked games"
on public.user_tracked_games
for insert
with check (((select auth.uid() as uid) = user_id));

create policy "Users can update their own tracked games"
on public.user_tracked_games
for update
using (((select auth.uid() as uid) = user_id))
with check (((select auth.uid() as uid) = user_id));

create policy "Users can delete their own tracked games"
on public.user_tracked_games
for delete
using (((select auth.uid() as uid) = user_id));


/* =========================
   user_tracked_books
   ========================= */

create policy "Users can view their tracked books"
on public.user_tracked_books
for select
using (((select auth.uid() as uid) = user_id));

create policy "Users can insert their own tracked books"
on public.user_tracked_books
for insert
with check (((select auth.uid() as uid) = user_id));

create policy "Users can update their own tracked books"
on public.user_tracked_books
for update
using (((select auth.uid() as uid) = user_id))
with check (((select auth.uid() as uid) = user_id));

create policy "Users can delete their own tracked books"
on public.user_tracked_books
for delete
using (((select auth.uid() as uid) = user_id));