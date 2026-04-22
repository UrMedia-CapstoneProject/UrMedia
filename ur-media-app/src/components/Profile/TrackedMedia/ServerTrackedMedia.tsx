import { createClient } from "@/lib/supabase/server";
import TrackedMedia from "./TrackedMedia";
import { getFollowedLists } from "@/services/profile/lists/getFollowedLists";


export default async function ServerTrackedMedia(){

    const supabase = await createClient()

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return null;
    }

    const userId = user.id;

    const TrackedMedia = getFollowedLists(supabase, userId);

    return(
        <div></div>
    )
}