import { getPopularAnime, getPopularManga } from "@/services/jikan"
import { getPopularGames } from "@/services/rawg"
import { getPopularShows, getPopularMovies } from "@/services/tmdb"

export async function getCatalogMedia(category: string, page: number, title?: string) {
    const searching = !!title

    if (category == "movies") {
        const movies = searching 
        ? await getPopularMovies(page)
        : await getPopularMovies(page)

        return {
            media: {movies: movies?.results || []},
            hasNext: page != movies?.total_pages || false
        }
    } else if (category == "shows") {
        const shows = searching
        ? await getPopularShows(page)
        : await getPopularShows(page)

        return {
            media: {shows: shows?.results || []},
            hasNext: page != shows?.total_pages || false
        }
    } else if (category == "games") {
        const games = searching
        ? await getPopularGames(page.toString())
        : await getPopularGames(page.toString())

        return {
            media: {games: games?.results || []},
            hasNext: !!games?.next || false
        }
    } else if (category == "anime") {
        const anime = searching
        ? await getPopularAnime(page)
        : await getPopularAnime(page)

        return {
            media: {anime: anime?.data || []},
            hasNext: anime?.pagination.has_next_page || false
        }
    } else if (category == "manga") {
        const manga = searching
        ? await getPopularManga(page)
        : await getPopularManga(page)
        
        return {
            media: {manga: manga?.data || []},
            hasNext: manga?.pagination.has_next_page || false
        }
    } else {
        return {
            media: {},
            hasNext: false
        }
    }
}