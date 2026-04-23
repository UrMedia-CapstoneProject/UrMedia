/*Fetches title and poster from the correct external API*/

import { getMovieDetails, getShowDetails } from "@/services/tmdb";
import { getGameByExternalId } from "@/services/rawg";
import { getAnimeDetails } from "@/services/jikan";
// Missing getBook

export type GetCountdownMetadataArgs = {
  source: string;
  mediaType: string;
  externalId: string;
};

export type CountdownTitleAndUrl = {
  title: string | null;
  imageUrl: string | null;
};

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function buildTMDBImageUrl(posterPath?: string | null) {
  if (!posterPath) {
    return null;
  }
  return `${TMDB_IMAGE_BASE}${posterPath}`;
}

export async function getCountdownTitleAndPosterUrl({
  source,
  mediaType,
  externalId,
}: GetCountdownMetadataArgs): Promise<CountdownTitleAndUrl> {
  try {
    if (source === "tmdb" && mediaType === "movie") {
      const movie = await getMovieDetails(Number(externalId));

      if (!movie) {
        console.log("Failed to fetch TMDB movie data");
        throw new Error("Failed to fetch TMDB movie data");
      }

      return {
        title: movie.title ?? null,
        imageUrl: buildTMDBImageUrl(movie.poster_path),
      };
    } else if (source === "tmdb" && mediaType === "show") {
      const show = await getShowDetails(Number(externalId));

      if (!show) {
        console.log("Failed to fetch TMDB show data");
        throw new Error("Failed to fetch TMDB show data");
      }

      return {
        title: show.original_name ?? null,
        imageUrl: buildTMDBImageUrl(show.poster_path),
      };
    } else if (source === "rawg" && mediaType === "game") {
      const game = await getGameByExternalId(externalId);

      if (!game) {
        console.log("Failed to fetch RAWG game data");
        throw new Error("Failed to fetch RAWG game data");
      }

      return {
        title: game.name ?? null,
        imageUrl: game.background_image,
      };
    } else if (source === "jikan" || mediaType === "anime_movie" || mediaType === "anime_show") {
      const anime = await getAnimeDetails(Number(externalId));

      if (!anime) {
        console.log("Failed to fetch JIKAN anime data");
        throw new Error("Failed to fetch JIKAN anime data");
      }

      return {
        title:
          anime?.data?.title_english ??
          anime?.data?.title ??
          anime?.data?.title_japanese ??
          null,

        imageUrl:
          anime?.data?.images?.webp?.large_image_url ??
          anime?.data?.images?.jpg?.large_image_url ??
          anime?.data?.images?.webp?.image_url ??
          anime?.data?.images?.jpg?.image_url ??
          null,
      };
    } else {
      return {
        title: null,
        imageUrl: null,
      };
    }
  } catch (error) {
    console.error("Failed to fetch countdown title and poster url");
    return {
      title: null,
      imageUrl: null,
    };
  }
}
