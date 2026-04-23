'use server'

import { getMovieDetails, getShowDetails } from "@/services/tmdb";
import { getGameDetails } from "@/services/rawg";
import { getAnimeDetails, getMangaDetails } from "@/services/jikan";

export async function getMediaDetails(id: number, category: string) {
    console.log(id, category)
  if (category == "movies") {
    const movieDetails = await getMovieDetails(id);
    return { media: {movie: movieDetails}};
  } else if (category == "shows") {
    const showDetails = await getShowDetails(id);
    return { media: {show: showDetails}};
  } else if (category == "games") {
    const gameDetails = await getGameDetails(id.toString());
    return { media: {game: gameDetails}};
  } else if (category == "animes") {
    const animeDetails = await getAnimeDetails(id);
    return { media: {anime: animeDetails?.data}}
  } else if (category == "mangas") {
    const mangaDetails = await getMangaDetails(id);
    return { media: {manga: mangaDetails?.data}}
  } else {
    return {media: {}}
  }
}
