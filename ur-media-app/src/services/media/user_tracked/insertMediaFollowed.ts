import { TrackMediaPayload } from "./upsertUserTrackedMedia";

export async function insertMediaFollowed({
    supabase,
    userId,
    payload
}: {
    supabase: any,
    userId: string,
    payload: TrackMediaPayload
}) {
    const media_id = payload.mediaId

    const { error: mediaFollowsError } = await supabase
        .from("media_follows")
        .insert({
            user_id: userId,
            media_id: media_id
        })

        if (mediaFollowsError) {
            console.log("insertMediaFollowed.ts file:", mediaFollowsError.message)
            throw new Error(mediaFollowsError.message)
        }
}