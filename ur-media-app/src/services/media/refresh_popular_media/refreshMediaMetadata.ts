import { getMovie, getShow } from "../../tmdb";
import { getGameByExternalId } from "@/services/rawg";
// add jikan in here

import type { MediaSource, MediaType } from "@/types/types";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

type MediaRowRefresh = {
  id: number;
  external_id: string;
  source: MediaSource;
  media_type: MediaType;
};

type RefreshMediaMetadataParameters = {
  supabase: any;
  media: MediaRowRefresh;
};

function buildTMDBImageUrl(posterPath?: string | null) {
  if (!posterPath) {
    return null;
  }
  return `${TMDB_IMAGE_BASE}${posterPath}`;
}

export async function refreshMediaMetadata({
  supabase,
  media,
}: RefreshMediaMetadataParameters) {
  let updateData: Record<string, unknown> | null = null;

  if (media.source === "tmdb" && media.media_type === "movie") {
    const movie = await getMovie(Number(media.external_id));
    // console.log(movie);

    if (!movie) {
      console.log("Failed to fetch TMDB movie data");
      throw new Error("Failed to fetch TMDB movie data");
    }

    updateData = {
      title: movie.title ?? null,
      image_url: buildTMDBImageUrl(movie.poster_path),
      synopsis: movie.overview ?? null,
      release_date: movie.release_date ?? null,
      next_release_date: null,
      metadata_updated_at: new Date().toISOString(),
    };
  } else if (media.source === "tmdb" && media.media_type === "show") {
    const show = await getShow(Number(media.external_id));

    if (!show) {
      console.log("Failed to fetch TMDB show data");
      throw new Error("Failed to fetch TMDB show data");
    }

    updateData = {
      title: show.original_name ?? null,
      image_url: buildTMDBImageUrl(show.poster_path),
      synopsis: show.overview ?? null,
      release_date: show.first_air_date ?? null,
      next_release_date: show.next_episode_to_air?.air_date ?? null, // switch it to .seasons.[air_date that is the lastest]
      metadata_updated_at: new Date().toISOString(),
    };

    // console.log(updateData);
  } else if (media.source === "rawg" && media.media_type === "game") {
    const game = await getGameByExternalId(media.external_id);
    // console.log(game);

    if (!game) {
      console.log("Failed to fetch RAWG game data");
      throw new Error("Failed to fetch RAWG gamed data");
    }

    // - Introduce a helper function for removing the html tags for description and fix it.
    // - Fix issue with red squiggly line
    updateData = {
      title: game.name ?? null,
      image_url: game.background_image,
      synopsis: game.description ?? null,
      release_date: game.released ?? null,
      next_release_date: null,
      metadata_updated_at: new Date().toISOString(),
    };

    // add else if for (media.source === "google_books" && media.media_type === "book")
  } else {
    throw new Error(
      `refreshMediaMetadata does not support source=${media.source} media_type=${media.media_type} yet`,
    );
  }

  // console.log("refreshMediaMetadata media:", media);
  // console.log("updateData:", updateData);

  const { data, error } = await supabase
    .from("media")
    .update(updateData)
    .eq("id", media.id)
    .select(
      `
      id,
      external_id,
      source,
      media_type,
      title,
      image_url,
      synopsis,
      release_date,
      next_release_date,
      metadata_updated_at
      `,
    )
    .maybeSingle();
  // .single();

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
}
