import { JikanClient } from "@rushelasli/jikants";

const jikan = new JikanClient();

function sleep(ms: number) {
    return new Promise(res => setTimeout(res, ms))
}
export async function anime () {
    return await jikan.anime.getAnimeById(1);
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