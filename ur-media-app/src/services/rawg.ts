import {rawgFetch} from "../lib/rawg"
import { Game } from "@/types/types";

export interface RawgResponse<T> {
    results: T[];
}
export async function getPopularGames(page: string, ratingRange: string) {
    return rawgFetch<RawgResponse<Game>>('games', { page: page, metaCritic: ratingRange })
}