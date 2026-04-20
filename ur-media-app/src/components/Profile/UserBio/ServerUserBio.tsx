import { createClient } from "@/lib/supabase/server";
import UserBio from "./UserBio";
import { getUserSettings } from "@/services/user_settings/userSettings";

export async function ServerUserBio() {

    const supabase = await createClient();
    const { data: authData, error: authError } = await supabase.auth.getUser();

    if(!authData || authError){
        return null;
    }

    const userId = authData.user.id;

    const settings = await getUserSettings({supabase, userId});

    return (
        <UserBio settings={settings}/>
    )
}
