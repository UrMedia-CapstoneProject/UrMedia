import { createClient } from "@/lib/supabase/server";
import { getFollowedLists } from "@/services/profile/lists/getFollowedLists";
import TrackedMedia from "./TrackedMedia";


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

    const lists = await getFollowedLists(supabase, userId);

    return(
        <TrackedMedia lists={lists}/>
    )
}