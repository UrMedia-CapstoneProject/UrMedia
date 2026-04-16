import { createClient } from "@/lib/supabase/server";

type StatsBucket = "movies" | "shows" | "games" | "books";

type NormalizedTrackedStatsRow = {
  bucket: StatsBucket;
  status: string | null;
  rating: number | null;
};

export async function getNormalizedProfileStatsRow(userId: string) {
  const supabase = await createClient();

  const [moviesResult, showsResult, gamesResult, booksResult, animesResult] =
    await Promise.all([
      supabase
        .from("user_tracked_movies")
        .select("watch_status, rating")
        .eq("user_id", userId),
      supabase
        .from("user_tracked_shows")
        .select("watch_status, rating")
        .eq("user_id", userId),
      supabase
        .from("user_tracked_games")
        .select("watch_status, rating")
        .eq("user_id", userId),
      supabase
        .from("user_tracked_books")
        .select("watch_status, rating")
        .eq("user_id", userId),
      supabase
        .from("user_tracked_animes")
        .select("watch_status, rating, media:media_id (media_type)")
        .eq("user_id", userId),
    ]);

  if (moviesResult.error) throw new Error(moviesResult.error.message);
  if (showsResult.error) throw new Error(showsResult.error.message);
  if (gamesResult.error) throw new Error(gamesResult.error.message);
  if (booksResult.error) throw new Error(booksResult.error.message);
  if (animesResult.error) throw new Error(animesResult.error.message);

  const rows: NormalizedTrackedStatsRow[] = [];

  for (const row of moviesResult.data ?? []) {
    rows.push({
      bucket: "movies",
      status: row.watch_status ?? null,
      rating: row.rating ?? null,
    });
  }

  for (const row of showsResult.data ?? []) {
    rows.push({
      bucket: "shows",
      status: row.watch_status ?? null,
      rating: row.rating ?? null,
    });
  }

  for (const row of gamesResult.data ?? []) {
    rows.push({
      bucket: "games",
      status: row.watch_status ?? null,
      rating: row.rating ?? null,
    });
  }

  for (const row of booksResult.data ?? []) {
    rows.push({
      bucket: "books",
      status: row.watch_status ?? null,
      rating: row.rating ?? null,
    });
  }

  for (const row of animesResult.data ?? []) {
    const media = Array.isArray(row.media) ? row.media[0] ?? null : row.media
    const mediaType = media?.media_type;

    if (mediaType === "anime_movie") {
      rows.push({
        bucket: "movies",
        status: row.watch_status ?? null,
        rating: row.rating ?? null,
      });
    } else if (mediaType === "anime_show") {
      rows.push({
        bucket: "shows",
        status: row.watch_status ?? null,
        rating: row.rating ?? null,
      });
    }
  }

  return rows;
}
