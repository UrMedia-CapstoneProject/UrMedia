import { createClient } from "@/lib/supabase/server";

type StatsBucket = "movies" | "shows" | "games" | "books";
export type StatsTab = "all" | StatsBucket;

type NormalizedTrackedStatsRow = {
  bucket: StatsBucket;
  status: string | null;
  rating: number | null;
};

type FormatDistributionItem = {
  label: "Movie" | "Show" | "Game" | "Book";
  count: number;
  percent: number;
};

type ScoreDistributionItem = {
  score: number;
  count: number;
};

type TabSummaryStats = {
  totalTrackedCount: number;
  plannedCount: number;
  inProgressCount: number;
  completedCount: number;
  pausedCount: number;
  droppedCount: number;
  averageScore: number | null;
  completionRate: number;
};

type SummaryStatsByTab = Record<StatsTab, TabSummaryStats>;
type ScoreDistributionbyTab = Record<StatsTab, ScoreDistributionItem[]>;
export type ProfileStatsResponse = {
  cards: SummaryStatsByTab;
  formatDistribution: FormatDistributionItem[];
  scoreDistribution: ScoreDistributionbyTab;
};

export async function getNormalizedProfileStatsRows(
  userId: string,
): Promise<NormalizedTrackedStatsRow[]> {
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
    const media = Array.isArray(row.media) ? (row.media[0] ?? null) : row.media;
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

function isPlanned(status: string | null) {
  return status === "plan";
}
function isInProgress(status: string | null) {
  return status === "watching" || status === "playing" || status === "reading";
}
function isCompleted(status: string | null) {
  return status === "completed";
}
function isPaused(status: string | null) {
  return status === "paused";
}
function isDropped(status: string | null) {
  return status === "dropped";
}

function buildTabSummaryStats(rows: NormalizedTrackedStatsRow[]): TabSummaryStats {
  const totalTrackedCount = rows.length;
  const plannedCount = rows.filter((row) => isPlanned(row.status)).length;
  const inProgressCount = rows.filter((row) => isInProgress(row.status)).length;
  const completedCount = rows.filter((row) => isCompleted(row.status)).length;
  const pausedCount = rows.filter((row) => isPaused(row.status)).length;
  const droppedCount = rows.filter((row) => isDropped(row.status)).length;

  const ratings = rows
    .map((row) => row.rating)
    .filter((rating): rating is number => rating !== null);

  const averageScore =
    ratings.length > 0
      ? Number(
          (
            ratings.reduce((sum, ratings) => sum + ratings, 0) / ratings.length
          ).toFixed(1),
        )
      : null;

  const completionRate =
    totalTrackedCount > 0
      ? Number(((completedCount / totalTrackedCount) * 100).toFixed(1))
      : 0;

  // Fix issue with infinity displaying
  //   games: {
  //   totalTrackedCount: 4,
  //   plannedCount: 1,
  //   inProgressCount: 1,
  //   completedCount: 0,
  //   pausedCount: 2,
  //   droppedCount: 0,
  //   averageScore: 7.8,
  //   completionRate: Infinity
  // },

  return {
    totalTrackedCount,
    plannedCount,
    inProgressCount,
    completedCount,
    pausedCount,
    droppedCount,
    averageScore,
    completionRate,
  };
}

function buildFormatDistributionCard(
  rows: NormalizedTrackedStatsRow[],
): FormatDistributionItem[] {
  const total = rows.length;

  const counts = {
    movies: rows.filter((row) => row.bucket === "movies").length,
    shows: rows.filter((row) => row.bucket === "shows").length,
    games: rows.filter((row) => row.bucket === "games").length,
    books: rows.filter((row) => row.bucket === "books").length,
  };

  function getPercent(count: number) {
    if (total === 0) {
      return 0;
    }
    return Number(((count / total) * 100).toFixed(1));
  }

  return [
    {
      label: "Movie",
      count: counts.movies,
      percent: getPercent(counts.movies),
    },
    {
      label: "Show",
      count: counts.shows,
      percent: getPercent(counts.shows),
    },
    {
      label: "Game",
      count: counts.games,
      percent: getPercent(counts.games),
    },
    {
      label: "Book",
      count: counts.books,
      percent: getPercent(counts.books),
    },
  ];
}

function buildScoreDistributionCard(
  rows: NormalizedTrackedStatsRow[],
): ScoreDistributionItem[] {
  const scoreCounts = new Map<number, number>();

  // Create buckets 1 through 10
  for (let score = 1; score <= 10; score++) {
    scoreCounts.set(score, 0);
  }

  for (const row of rows) {
    if (row.rating === null) {
      continue;
    }

    const roundedScore = Math.floor(row.rating);

    if (roundedScore < 1 || roundedScore > 10) continue; // double check for invalid value

    scoreCounts.set(roundedScore, (scoreCounts.get(roundedScore) ?? 0) + 1); // increment counter for score by 1
  }

  return Array.from(scoreCounts.entries())
    .map(([score, count]) => ({
      score,
      count,
    }))
    .filter((item) => item.count > 0); // Only display bars that actually has data
}

export async function getProfileStats(
  userId: string,
): Promise<ProfileStatsResponse> {
  const rows = await getNormalizedProfileStatsRows(userId);

  const allRows = rows;
  const movieRows = rows.filter((row) => row.bucket === "movies");
  const showRows = rows.filter((row) => row.bucket === "shows");
  const gameRows = rows.filter((row) => row.bucket === "games");
  const bookRows = rows.filter((row) => row.bucket === "books");

  const cards: SummaryStatsByTab = {
    all: buildTabSummaryStats(allRows),
    movies: buildTabSummaryStats(movieRows),
    shows: buildTabSummaryStats(showRows),
    games: buildTabSummaryStats(gameRows),
    books: buildTabSummaryStats(bookRows),
  };

  const scoreDistribution: ScoreDistributionbyTab = {
    all: buildScoreDistributionCard(allRows),
    movies: buildScoreDistributionCard(movieRows),
    shows: buildScoreDistributionCard(showRows),
    games: buildScoreDistributionCard(gameRows),
    books: buildScoreDistributionCard(bookRows),
  };

  return {
    cards,
    formatDistribution: buildFormatDistributionCard(allRows),
    scoreDistribution,
  };
}
