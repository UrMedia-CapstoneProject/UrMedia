import {TMDB} from "@lorenzopant/tmdb"

if (!process.env.TMDB_BEARER_TOKEN) {
    console.log(process.env.TMDB_BEARER_TOKEN)
    throw new Error("TMDB_BEARER_TOKEN is missing");
}
export const tmdb = new TMDB(process.env.TMDB_BEARER_TOKEN, {
    language: "en",
    region: "US",
    timezone: "America/Chicago"
});