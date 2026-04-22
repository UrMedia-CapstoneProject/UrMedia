import { getShowDetails } from "@/services/tmdb";
import { getMovieDetails } from "@/services/tmdb";
import { getGameByExternalId } from "@/services/rawg";

type GetPosterUrlArgs = {
    source: string;
    mediaType: string;
    externalId: string;
};

async function getJikanPoster(id: string): Promise<string | null> {
    try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        if (!res.ok) {
            console.log("Jikan fetch failed on id", id);
            return null;
        }

        const data = await res.json();

        return (
            data.data?.images?.webp?.large_image_url ||
            data.data?.images?.jpg?.large_image_url ||
            data.data?.images?.webp?.image_url ||
            data.data?.images?.jpg?.image_url ||
            null
        );
    } catch (error) {
        console.error("Error fetching Jikan poster:", error);
        return null;
    }
}

export async function getPosterUrl({
    source,
    mediaType,
    externalId,
}: GetPosterUrlArgs): Promise<string | null> {
    try {
        if (source === "tmdb") {
            if (mediaType === "show") {
                const show = await getShowDetails(Number(externalId));
                return show?.poster_path
                    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                    : null;
            }

            if (mediaType === "movie") {
                const movie = await getMovieDetails(Number(externalId));
                return movie?.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : null;
            }
        }

        if (source === "rawg" && mediaType === "game") {
            const game = await getGameByExternalId(externalId);
            return game?.background_image ?? null;
        }

        if (source === "jikan") {
            return await getJikanPoster(externalId);
        }

        return null;
    } catch (error) {
        console.error("Error in getPosterUrl:", error);
        return null;
    }
}