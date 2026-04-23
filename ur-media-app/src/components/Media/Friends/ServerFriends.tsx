import { createClient } from "@/lib/supabase/server";
import { getFriendInfo } from "@/services/media/friends/friends";
import Friends from "./Friends"

export async function ServerFriends () {
    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if(!authData || authError){
        return null;
    }

    const userId = authData.user.id;

    const friendInfo = await getFriendInfo({supabase, userId})

    return (
        <Friends friendInfo={friendInfo} />
    )
}