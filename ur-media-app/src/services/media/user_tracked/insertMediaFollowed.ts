import { TrackMediaPayload } from "./upsertUserTrackedMedia";

export async function insertMediaFollowed({
  supabase,
  userId,
  payload,
}: {
  supabase: any;
  userId: string;
  payload: TrackMediaPayload;
}) {
  const { error: mediaFollowsError } = await supabase
    .from("media_follows")
    .upsert(
      {
        user_id: userId,
        media_id: payload.mediaId,
      },
      {
        // Ignore the error with the user already following the media.
        onConflict: "user_id,media_id",
        ignoreDuplicates: true,
      },
    );

  if (mediaFollowsError) {
    console.log("insertMediaFollowed.ts file:", mediaFollowsError.message);
    throw new Error(mediaFollowsError.message);
  }
}
