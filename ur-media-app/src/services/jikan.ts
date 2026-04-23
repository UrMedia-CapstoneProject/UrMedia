import { JikanClient } from "@rushelasli/jikants";
import { JikanResponseWithPagination } from "@rushelasli/jikants";

const jikan = new JikanClient();

function sleep(ms: number) {
    return new Promise(res => setTimeout(res, ms))
}

export async function getPopularAnime(page: number) {
    try {
        await sleep(400)
        const res = await jikan.top.getTopAnime({page: page, limit: 20, sfw: true})
        const data = res as JikanResponseWithPagination<typeof res.data>
        return data
    } catch (err) {
         console.log("Jikan API Error while fetching Anime, exiting with: " + err)
    }
}

export async function searchAnime(title: string, page: number) {
    try {
        await sleep(400)
        return await jikan.anime.searchAnime({q: title, page: page, limit: 20})
    } catch (err) {
         console.log("Jikan API Error while fetching Anime, exiting with: " + err)
    }
}

export async function getAnimeDetails(id: number) {
    try {
        await sleep(1000)
        return await jikan.anime.getAnimeById(id)
    } catch (err) {
        console.log("Jikan API Error while fetching Anime, exiting with: " + err)
    }
}

export async function getPopularManga(page: number) {
    try {
        await sleep(400)
        const res = await jikan.top.getTopManga({page: page, limit: 20})
        const data = res as JikanResponseWithPagination<typeof res.data>
        return data
    } catch (err) {
        console.log("Jikan API Error while fetching Manga, exiting with: " + err)
    }
}

export async function searchManga(title: string, page: number) {
    try {
        sleep(400)
        return await jikan.manga.searchManga({q: title, page: page, limit: 20})
    } catch (err) {
         console.log("Jikan API Error while fetching Manga, exiting with: " + err)
    }
}

export async function getMangaDetails(id: number) {
    try {
        sleep(400)
        return await jikan.manga.getMangaById(id)
    } catch (err) {
         console.log("Jikan API Error while fetching Manga, exiting with: " + err)
    }
}
