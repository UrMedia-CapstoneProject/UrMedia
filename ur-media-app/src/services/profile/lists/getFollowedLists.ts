import { TrackedMediaProps } from "@/components/Profile/TrackedMedia/TrackedMedia";
import { getPosterUrl } from "../podium/getPosterUrl";
import { getCountdownTitleAndPosterUrl } from "@/services/media/countdown/getCountdownTitleAndPosterUrl";

type FollowedMediaRow = {
  media_id: number;
  media: {
    external_id: string;
    media_type: string;
    source: string;
  } | null;
};

export interface ProfileTrackedMediaProps {
  mediaId: number;
  externalId: string;
  mediaType: string;
  watchStatus: string;
  startingDate: string | null;
  endingDate: string | null;
  rating: number | null;
  episodesWatched: number | null;
  hoursPlayed: number | null;
  review: string | null;
  repeatCount: string | null;
  posterUrl: string | null;
  title: string | null;
}

export async function getFollowedLists(
  supabase: any,
  userId: string,
): Promise<TrackedMediaProps> {
  const { data: followedRows, error } = await supabase
    .from("media_follows")
    .select(
      `
    media_id,
    media:media_id (
      external_id,
      media_type,
      source
    )
  `,
    )
    .eq("user_id", userId);

  const rows = (followedRows ?? []) as unknown as FollowedMediaRow[];

  const movieRows = rows.filter((row) => row.media?.media_type === "movie");
  const showRows = rows.filter((row) => row.media?.media_type === "show");
  const animeMovieRows = rows.filter(
    (row) => row.media?.media_type === "anime_movie",
  );
  const animeShowRows = rows.filter(
    (row) => row.media?.media_type === "anime_show",
  );
  const gameRows = rows.filter((row) => row.media?.media_type === "game");
  const bookRows = rows.filter(
    (row) => row.media?.media_type === "book" || "manga",
  );

  const movieIds = movieRows.map((row) => row.media_id);
  const showIds = showRows.map((row) => row.media_id);
  const animeIds = [...animeMovieRows, ...animeShowRows].map(
    (row) => row.media_id,
  );
  const gameIds = gameRows.map((row) => row.media_id);
  const bookIds = bookRows.map((row) => row.media_id);

  const [
    trackedMoviesRes,
    trackedShowsRes,
    trackedAnimeRes,
    trackedGamesRes,
    trackedBooksRes,
  ] = await Promise.all([
    movieIds.length
      ? supabase
          .from("user_tracked_movies")
          .select(
            "media_id, watch_status, starting_date, ending_date, rating, review, repeat_count",
          )
          .eq("user_id", userId)
          .in("media_id", movieIds)
      : Promise.resolve({ data: [], error: null }),

    showIds.length
      ? supabase
          .from("user_tracked_shows")
          .select(
            "media_id, watch_status, starting_date, ending_date, rating, episodes_watched, review, repeat_count",
          )
          .eq("user_id", userId)
          .in("media_id", showIds)
      : Promise.resolve({ data: [], error: null }),

    animeIds.length
      ? supabase
          .from("user_tracked_animes")
          .select(
            "media_id, watch_status, starting_date, ending_date, rating, episodes_watched, review, repeat_count",
          )
          .eq("user_id", userId)
          .in("media_id", animeIds)
      : Promise.resolve({ data: [], error: null }),

    gameIds.length
      ? supabase
          .from("user_tracked_games")
          .select(
            "media_id, watch_status, starting_date, ending_date, rating, hours_played, review, repeat_count",
          )
          .eq("user_id", userId)
          .in("media_id", gameIds)
      : Promise.resolve({ data: [], error: null }),

    bookIds.length
      ? supabase
          .from("user_tracked_books")
          .select(
            "media_id, watch_status, starting_date, ending_date, rating, review, repeat_count",
          )
          .eq("user_id", userId)
          .in("media_id", bookIds)
      : Promise.resolve({ data: [], error: null }),
  ]);

  if (trackedMoviesRes.error) throw new Error(trackedMoviesRes.error.message);
  if (trackedShowsRes.error) throw new Error(trackedShowsRes.error.message);
  if (trackedAnimeRes.error) throw new Error(trackedAnimeRes.error.message);
  if (trackedGamesRes.error) throw new Error(trackedGamesRes.error.message);
  if (trackedBooksRes.error) throw new Error(trackedBooksRes.error.message);

  const movieMap = new Map<number, FollowedMediaRow>(
    (trackedMoviesRes.data ?? []).map((item: any) => [item.media_id, item]),
  );
  const showMap = new Map<number, FollowedMediaRow>(
    (trackedShowsRes.data ?? []).map((item: any) => [item.media_id, item]),
  );
  const animeMap = new Map<number, FollowedMediaRow>(
    (trackedAnimeRes.data ?? []).map((item: any) => [item.media_id, item]),
  );
  const gameMap = new Map<number, FollowedMediaRow>(
    (trackedGamesRes.data ?? []).map((item: any) => [item.media_id, item]),
  );
  const bookMap = new Map<number, FollowedMediaRow>(
    (trackedBooksRes.data ?? []).map((item: any) => [item.media_id, item]),
  );

  async function buildItems(
    sourceRows: FollowedMediaRow[],
    trackedMap: Map<number, any>,
  ): Promise<ProfileTrackedMediaProps[]> {
    const items: ProfileTrackedMediaProps[] = [];

    for (const row of sourceRows) {
      if (!row.media) continue;

      const tracked = trackedMap.get(row.media_id);
      if (!tracked) continue;

      const data =
        row.media.media_type === "book"
          ? null
          : await getCountdownTitleAndPosterUrl({
              source: row.media.source,
              mediaType: row.media.media_type,
              externalId: row.media.external_id,
            });

      items.push({
        mediaId: row.media_id,
        externalId: row.media.external_id,
        mediaType: row.media.media_type,
        watchStatus: tracked.watch_status,
        startingDate: tracked.starting_date ?? null,
        endingDate: tracked.ending_date ?? null,
        rating: tracked.rating ?? null,
        episodesWatched: tracked.episodes_watched ?? null,
        hoursPlayed: tracked.hours_played ?? null,
        review: tracked.review ?? null,
        repeatCount: tracked.repeat_count ?? null,
        posterUrl: data?.imageUrl ?? null,
        title: data?.title ?? null,
      });
    }

    return items;
  }

  const movies = await buildItems(movieRows, movieMap);
  const shows = await buildItems(showRows, showMap);
  const animeMovies = await buildItems(animeMovieRows, animeMap);
  const animeShows = await buildItems(animeShowRows, animeMap);
  const games = await buildItems(gameRows, gameMap);
  const books = await buildItems(bookRows, bookMap);

  return {
    movies: [...movies, ...animeMovies],
    shows: [...shows, ...animeShows],
    games,
    books,
  };
}
