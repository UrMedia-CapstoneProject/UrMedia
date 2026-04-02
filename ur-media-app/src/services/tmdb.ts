import {TMDBError} from "@lorenzopant/tmdb"
import {tmdb} from "../lib/tmdb";

export async function getMovies() {
    try{
        const res = tmdb.movie_lists.now_playing
        return res
    } catch {

    }
}

export async function getShows() {
    try {
        const res = tmdb.tv_lists.on_the_air
        return res
    } catch {

    }
}