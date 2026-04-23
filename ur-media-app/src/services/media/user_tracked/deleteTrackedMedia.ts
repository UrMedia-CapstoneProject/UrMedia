import { TrackMediaPayload } from "./upsertUserTrackedMedia";
import { getPodiumGroup, isSupportedMediaType } from "./helperFunctionsForPodium";
import { getTrackedTable } from "./helperFunctionsForGetTrackedTable";

export type DeleteTrackedMediaPayload = {
    userId: string;
    mediaId: string;
    mediaType: string;
    deletePodiumOnly?: boolean;
};

export async function deleteUserTrackedMedia({
    supabase,
    userId,
    payload,
}: {
    supabase: any,
    userId: string,
    payload: DeleteTrackedMediaPayload,
}) {
    if (!isSupportedMediaType(payload.mediaType)) {
        throw new Error("Invalid media type");
    }

    const { mediaType, mediaId } = payload;
    const trackedTable = getTrackedTable(mediaType);
    const podiumGroup = getPodiumGroup(mediaType);

    if (payload.deletePodiumOnly) {
        await supabase
            .from("user_podium")
            .delete()
            .eq("user_id", userId)
            .eq("media_id", mediaId)
            .eq("podium_group", podiumGroup)
    } else {
        await supabase
            .from(trackedTable)
            .delete()
            .eq("user_id", userId)
            .eq("media_id", mediaId)

        await supabase
            .from("user_podium")
            .delete()
            .eq("user_id", userId)
            .eq("media_id", mediaId)
            .eq("podium_group", podiumGroup)

        await supabase
            .from("media_follows")
            .delete()
            .eq("user_id", userId)
            .eq("media_id", mediaId)
    }

}