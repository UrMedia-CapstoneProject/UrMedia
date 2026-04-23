import { getAnimeDetails } from "@/services/jikan";
import { getMovieDetails, getShowDetails } from "../../tmdb";
import { getGameByExternalId } from "@/services/rawg";
// add jikan in here

import type { MediaSource, MediaType } from "@/types/types";
import { metadata } from "@/app/layout";

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

function replaceHtml(description: string | undefined) {
  if (!description) return;
  return description.replace(/<[^>]+>/g, "");
}

function cleanText(description: string | null) {
  if (!description) return;
  return description.replace(/[\n\r\t]+/g, " ").replace(/\s+/g, " ").replace("[Written by MAL Rewrite]", "").trim() //[Written by MAL Rewrite] is added by default at the end of the synopsis
}

export async function refreshMediaMetadata({
  supabase,
  media,
}: RefreshMediaMetadataParameters) {
  let updateData: Record<string, unknown> | null = null;

  if (media.source === "tmdb" && media.media_type === "movie") {
    const movie = await getMovieDetails(Number(media.external_id));
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
    const show = await getShowDetails(Number(media.external_id));

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
  } else if ((media.source === "jikan" || media.media_type === "anime_movie" || media.media_type === "anime_show")) {
    const anime = await getAnimeDetails(Number(media.external_id))

    if (!anime) {
      console.log("Failed to fetch JIKAN anime")
      throw new Error("Failed to fetch JIKAN anime");
    }

    const parseJikanDate = (anime.data.aired.from)?.split("T")[0]; //"2019-08-09T00:00:00+00:00" -> 2019-08-09

    updateData = {
      title: anime.data.title ?? null,
      image_url:
          anime?.data?.images?.webp?.large_image_url ??
          anime?.data?.images?.jpg?.large_image_url ??
          anime?.data?.images?.webp?.image_url ??
          anime?.data?.images?.jpg?.image_url ??
          null,
      synopsis: cleanText(anime.data.synopsis) ?? null,
      release_date: parseJikanDate ?? null, //"2019-08-09T00:00:00+00:00"
      next_release_date: null, // jikan doesn't have next_release_date but tmdb does
      metadata_updated_at: new Date().toISOString(),
    }
    // console.log("animes", updateData)
  } else if (media.source === "rawg" && media.media_type === "game") {
    const game = await getGameByExternalId(media.external_id);
    console.log(game);

    if (!game) {
      console.log("Failed to fetch RAWG game data");
      throw new Error("Failed to fetch RAWG game data");
    }

    // - Introduce a helper function for removing the html tags for description and fix it.
    // - Fix issue with red squiggly line
    updateData = {
      title: game.name ?? null,
      image_url: game.background_image,
      synopsis: replaceHtml(game.description) ?? null,
      release_date: game.released ?? null,
      next_release_date: null,
      metadata_updated_at: new Date().toISOString(),
    };
    console.log("games", updateData)    

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
