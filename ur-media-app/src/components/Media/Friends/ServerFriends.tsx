import { createClient } from "@/lib/supabase/server";
import { getFriendInfo } from "@/services/media/friends/friends";
import { getCountdownTitleAndPosterUrl } from "@/services/media/countdown/getCountdownTitleAndPosterUrl";
import { GetCountdownMetadataArgs } from "@/services/media/countdown/getCountdownTitleAndPosterUrl";
import { CountdownTitleAndUrl } from "@/services/media/countdown/getCountdownTitleAndPosterUrl";
import Friends from "./Friends"

export async function ServerFriends () {
    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if(!authData || authError){
        return null;
    }

    const userId = authData.user.id;

    const friendInfo = await getFriendInfo({supabase, userId})

    const posterMediaInfo: CountdownTitleAndUrl[] = await Promise.all(
        friendInfo.map(async (friend) => {
            const posterProps: GetCountdownMetadataArgs = {
                source: friend.media.source,
                mediaType: friend.media.mediaType,
                externalId: friend.media.externalId,
            };
            return await getCountdownTitleAndPosterUrl(posterProps);
        })
    );

    return (
        <Friends friendInfo={friendInfo} posterInfo={posterMediaInfo} />
    )
}