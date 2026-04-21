import { getMovieDetails, getShowDetails } from "@/services/tmdb";
import { getGameDetails } from "@/services/rawg";
import { getAnimeDetails, getMangaDetails } from "@/services/jikan";

export async function getMediaDetails(id: number, category: string) {

    if (category == "movies") {
        
    } else if (category == "shows") {
        
    } else if (category == "games") {

    } else if (category == "animes") {

    } else if (category == "mangas") {
        
    }
}