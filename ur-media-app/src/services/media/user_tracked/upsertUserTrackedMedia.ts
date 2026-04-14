import { convertServerPatchToFullTree } from "next/dist/client/components/segment-cache/navigation";
import { getTrackedTable } from "./helperFunctionsForGetTrackedTable";
import { getPodiumGroup } from "./helperFunctionsForPodium";
import { SupportedMediaType } from "./helperFunctionsForPodium";

export type TrackMediaPayload = {
    mediaId: number;
    mediaType: string;

    status: string | null;
    score: number | null;

    hoursPlayed: number | null;
    episodesWatched: number | null;
    rewatches: number | null;

    startDate: string | null;
    finishDate: string | null;

    review: string | null;

    podiumEnabled: boolean;
    podiumRank: number | null;
};

function mapPayloadToDbRow(
    mediaType: SupportedMediaType,
    payload: any,
    userId: string
) {
    const base = {
        user_id: userId,
        media_id: payload.mediaId,
        watch_status: payload.status,
        rating: payload.score,
        rewatches: payload.rewatches,
        starting_date: payload.startDate,
        ending_date: payload.finishDate,
        review: payload.review,
    };

    switch (mediaType) {
        case "movie":
        case "anime_movie":
            return base;

        case "show":
        case "anime_show":
            return {
                ...base,
                episodes_watched: payload.episodesWatched,
            };

        case "game":
            return {
                ...base,
                hours_played: payload.hoursPlayed,
            };

        case "book":
            return base;

        default:
            throw new Error("Unsupported media type");
    }
}

export async function upsertTrackedMedia({
    supabase,
    userId,
    payload
}: {
    supabase: any;
    userId: string;
    payload: TrackMediaPayload;
}) {
    const mediaType = payload.mediaType as SupportedMediaType;

    const trackedTable = getTrackedTable(mediaType);
    const podiumGroup = getPodiumGroup(mediaType);

    console.log("Updating tracked table", trackedTable)

    const dbRow = mapPayloadToDbRow(mediaType, payload, userId);

    console.log("DB ROW:", dbRow);
    const { error } = await supabase.from(trackedTable).upsert(dbRow, {
        onConflict: "user_id,media_id",
    });

    if (error) throw new Error(error.message);

    if (payload.podiumEnabled && payload.podiumRank !== null) {
        const { error: podiumError } = await supabase
            .from("user_podium")
            .upsert({
                user_id: userId,
                media_id: payload.mediaId,
                podium_group: podiumGroup,
                placement: payload.podiumRank,
            },
                {
                    onConflict: "user_id,media_id,podium_group",
                })

        if (podiumError) throw new Error(podiumError.message);
    } else {
        console.log("No way im in the delete right?")
        await supabase
            .from("user_podium")
            .delete()
            .eq("user_id", userId)
            .eq("media_id", payload.mediaId)
            .eq("podium_group", podiumGroup);
    }
}