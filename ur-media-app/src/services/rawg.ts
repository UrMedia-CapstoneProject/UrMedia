import {rawgFetch} from "../lib/rawg"
import { Game } from "@/types/types";

const currentDate = new Date() 
currentDate.setDate(currentDate.getDate() - 1)
const pastYear = new Date()
pastYear.setFullYear(currentDate.getFullYear() - 1)

const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
}
const dateRange = `${formatDate(pastYear)},${formatDate(currentDate)}`;
export interface RawgResponse{
    next?: string
    results: Game[];
}

export async function getPopularGames(page: string) {
    return rawgFetch<RawgResponse>('games', { page: page, metaCritic:"80, 100", dates: dateRange})
}

export async function searchGame(title: string, page: string) {
    return rawgFetch<RawgResponse>('games', {page: page, search: title})
}

export async function getGameDetails(id: string) {
    return rawgFetch<Game>(`games/${id}`)
}

export async function getGameByExternalId(rawgId: string) {
  return rawgFetch<Game>(`games/${rawgId}`)
}