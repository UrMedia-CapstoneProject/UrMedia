/* This file builds the final grouped countdown data for one user*/

import { createClient } from "@/lib/supabase/server";
import {
  CountdownTitleAndUrl,
  getCountdownTitleAndPosterUrl,
} from "./getCountdownTitleAndPosterUrl";

export type CountdownTab = "movies" | "shows" | "games" | "books"; // "book" will be taken out. "anime" could replace it?\

export type CountdownMediaType =
  | "movie"
  | "anime_movie"
  | "show"
  | "anime_show"
  | "game"
  | "book";

type RawCountdownMediaDbRow = {
  media_id: number;
  media:
    | {
        id: number;
        source: string;
        media_type: CountdownMediaType;
        external_id: string;
        release_date: string | null;
        next_release_date: string | null;
        metadata_updated_at: string | null;
      }[]
    | null;
};

type CountdownMediaDbRow = {
  media_id: number;
  media: {
    id: number;
    source: string;
    media_type: CountdownMediaType;
    external_id: string;
    release_date: string | null;
    next_release_date: string | null;
    metadata_updated_at: string | null;
  } | null;
};

function normalizeCountdownMediaRows(
  rawRows: RawCountdownMediaDbRow[],
): CountdownMediaDbRow[] {
  return rawRows.map((row) => ({
    media_id: row.media_id,
    media: Array.isArray(row.media)
      ? (row.media[0] ?? null)
      : (row.media ?? null),
  }));
}

export type CountdownItem = {
  mediaId: number;
  source: string;
  mediaType: CountdownMediaType;
  externalId: string;
  title: string;
  imageUrl: string | null;
  countdownDate: string;
  countdownText: string;
};

export type CountdownItemsByTab = Record<CountdownTab, CountdownItem[]>;

function normalizeToStartOfDay(date: Date): Date {
  const normalizeDate = new Date(date);
  normalizeDate.setHours(0, 0, 0, 0);

  return normalizeDate;
}

function isReleasingTodayOrInTheFuture(dateString: string | null): boolean {
  if (!dateString) {
    return false;
  }

  const today = normalizeToStartOfDay(new Date());
  const targetDate = normalizeToStartOfDay(new Date(dateString));

  return targetDate >= today;
}

function getCountdownTabForMediaType(
  mediaType: CountdownMediaType,
): CountdownTab {
  switch (mediaType) {
    case "movie":
    case "anime_movie":
      return "movies";

    case "show":
    case "anime_show":
      return "shows";

    case "game":
      return "games";

    case "book":
      return "books";
  }
}

function getCountdownDateForMedia(media: {
  media_type: CountdownMediaType;
  release_date: string | null;
  next_release_date: string | null;
}): string | null {
  if (
    media.media_type === "movie" ||
    media.media_type === "anime_movie" ||
    media.media_type === "game"
  ) {
    return isReleasingTodayOrInTheFuture(media.release_date)
      ? media.release_date
      : null;
  }

  if (media.media_type === "show" || media.media_type === "anime_show") {
    if (isReleasingTodayOrInTheFuture(media.release_date)) {
      return media.release_date;
    }

    if (isReleasingTodayOrInTheFuture(media.next_release_date)) {
      return media.next_release_date;
    }

    return null;
  }

  return null;
}

function formatCountdownText(countdownDate: string): string {
  const today = new Date();
  const target = new Date(countdownDate);

  let months =
    (target.getFullYear() - today.getFullYear()) * 12 +
    (target.getMonth() - today.getMonth());

  let days = target.getDate() - today.getDate();

  if (days < 0) {
    months -= 1;

    const previousMonth = new Date(
      target.getFullYear(),
      target.getMonth(),
      0,
    );

    days += previousMonth.getDate();
  }

  if (months <= 0 && days <= 0) {
    return "Today";
  }

  if (months > 0 && days > 0) {
    return `${months} Month${months === 1 ? "" : "s"}, ${days} Day${
      days === 1 ? "" : "s"
    }`;
  }

  if (months > 0) {
    return `${months} Month${months === 1 ? "" : "s"}`;
  }

  return `${days} Day${days === 1 ? "" : "s"}`;
}

function sortCountdownItemsByNearestRelease(
  items: CountdownItem[],
): CountdownItem[] {
  return items.sort((firstItem, secondItem) => {
    return (
      new Date(firstItem.countdownDate).getTime() -
      new Date(secondItem.countdownDate).getTime()
    );
  });
}

export async function getCountdownFollowedMediaForUser(
  userId: string,
): Promise<CountdownItemsByTab> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("media_follows")
    .select(
      `
        media_id,
        media:media_id (
        id,    
        source,
        media_type,
        external_id,
        release_date,
        next_release_date,
        metadata_updated_at
          )
        `,
    )
    .eq("user_id", userId);

  if (error || !data) {
    console.error(
      "Error fetching user's followed media for Countdown component:",
      error,
    );
    throw new Error(error.message);
  }

  const normalizeRows = normalizeCountdownMediaRows(
    (data ?? []) as RawCountdownMediaDbRow[],
  );

  const countdownCandidates: Array<{
    mediaId: number;
    source: string;
    mediaType: CountdownMediaType;
    externalId: string;
    countdownDate: string;
    countdownText: string;
  }> = [];

  for (const row of normalizeRows) {
    const media = row.media;

    if (!media) {
      continue;
    }

    const countdownDate = getCountdownDateForMedia(media);

    if (!countdownDate) {
      continue;
    }

    countdownCandidates.push({
      mediaId: media.id,
      source: media.source,
      mediaType: media.media_type,
      externalId: media.external_id,
      countdownDate,
      countdownText: formatCountdownText(countdownDate),
    });
  }

  const countdownItemsWithMetadata = await Promise.all(
    countdownCandidates.map(async (candidate) => {
      const metadata: CountdownTitleAndUrl =
        await getCountdownTitleAndPosterUrl({
          source: candidate.source,
          mediaType: candidate.mediaType,
          externalId: candidate.externalId,
        });

      if (!metadata.title) {
        return null;
      }

      return {
        ...candidate,
        title: metadata.title,
        imageUrl: metadata.imageUrl ?? "/test-images/default-poster-image.png",
      } satisfies CountdownItem;
    }),
  );

  const groupedCountdownItems: CountdownItemsByTab = {
    movies: [],
    shows: [],
    games: [],
    books: []
  };

  for (const item of countdownItemsWithMetadata) {
    if (!item) {
      continue;
    }

    const tab = getCountdownTabForMediaType(item.mediaType);

    groupedCountdownItems[tab].push(item);
  }

  groupedCountdownItems.movies = sortCountdownItemsByNearestRelease(
    groupedCountdownItems.movies,
  );

  groupedCountdownItems.shows = sortCountdownItemsByNearestRelease(
    groupedCountdownItems.shows,
  );

  groupedCountdownItems.games = sortCountdownItemsByNearestRelease(
    groupedCountdownItems.games,
  );

  groupedCountdownItems.books = []

  return groupedCountdownItems;
}
