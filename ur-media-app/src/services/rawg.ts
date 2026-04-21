import {rawgFetch} from "../lib/rawg"
import { Game } from "@/types/types";

export interface RawgResponse<T> {
    next?: string
    results?: T[];
    result: T;
}

export async function getPopularGames(page: string) {
    return rawgFetch<RawgResponse<Game>>('games', { page: page, metaCritic: "80,100" })
}

export async function searchGame(title: string, page: string) {
    return rawgFetch<RawgResponse<Game>>('games', {page: page, search: title})
}

export async function getGameDetails(id: string) {
    return rawgFetch<RawgResponse<Game>>('games', {id: id})
}

export async function getGameByExternalId(rawgId: string) {
  return rawgFetch<Game>(`games/${rawgId}`)
}