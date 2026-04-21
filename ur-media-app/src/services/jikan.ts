import { JikanClient } from "@rushelasli/jikants";

const jikan = new JikanClient();

function sleep(ms: number) {
    return new Promise(res => setTimeout(res, ms))
}

export async function getAnime(externalId: number) {
    try {
        return await jikan.anime.getAnimeById(externalId)
    } catch (err) {
        console.log("Jikan API Error while fetching Anime by id, exiting with: " + err)
    }
}

export async function searchAnime(title: string, page: number) {
    try {
        sleep(400)
        return await jikan.anime.searchAnime({q: title, page: page, limit: 20})
    } catch (err) {
         console.log("Jikan API Error while fetching Anime, exiting with: " + err)
    }
}

export async function getPopularAnime(page: number) {
    try {
        await sleep(400)
        return await jikan.top.getTopAnime({page: page, limit: 20, sfw: true})
    } catch (err) {
        console.log("Jikan API Error while fetching Anime, exiting with: " + err)
    }
}

export async function getPopularManga(page: number) {
    try {
        await sleep(400)
        return await jikan.top.getTopManga({page: page, limit: 20})
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
