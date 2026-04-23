import {
  getPopularAnime,
  getPopularManga,
  searchAnime,
  searchManga,
} from "@/services/jikan";
import { getPopularGames, searchGame } from "@/services/rawg";
import {
  getPopularShows,
  getPopularMovies,
  searchMovies,
  searchShows,
} from "@/services/tmdb";

export async function getCatalogMedia(
  category: string,
  page: number,
  title?: string,
) {
  const searching = !!title;

  if (category == "movies") {
    console.log("Searching movies")
    const movies = searching
      ? await searchMovies(title, page)
      : await getPopularMovies(page);

    return {
      media: { movies: movies?.results || [] },
      hasNext: page != movies?.total_pages || false,
    };
  } else if (category == "shows") {
    console.log("Searching shows")
    const shows = searching
      ? await searchShows(title, page)
      : await getPopularShows(page);

    return {
      media: { shows: shows?.results || [] },
      hasNext: page != shows?.total_pages || false,
    };
  } else if (category == "games") {
    console.log("Searching games")
    const games = searching
      ? await searchGame(title, page.toString())
      : await getPopularGames(page.toString());

    return {
      media: { games: games?.results || [] },
      hasNext: !!games?.next || false,
    };
  } else if (category == "animes") {
    console.log("Searching animes")
    const anime = searching
      ? await searchAnime(title, page)
      : await getPopularAnime(page);

    return {
      media: { anime: anime?.data || [] },
      hasNext: anime?.pagination.has_next_page || false,
    };
  } else if (category == "mangas") {
    console.log("Searching manga")
    const manga = searching
      ? await searchManga(title, page)
      : await getPopularManga(page);

    return {
      media: { manga: manga?.data || [] },
      hasNext: manga?.pagination?.has_next_page || false,
    };
  } else {
    return {
      media: {},
      hasNext: false,
    };
  }
}
