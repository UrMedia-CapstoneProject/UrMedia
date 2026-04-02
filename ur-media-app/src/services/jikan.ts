import { JikanClient } from "@rushelasli/jikants";

const jikan = new JikanClient();

export async function anime () {
    return await jikan.anime.getAnimeById(1);
}
