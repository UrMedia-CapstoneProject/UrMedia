import Navbar from "./NavbarClient";
import { createClient } from "@/lib/supabase/server";

export default async function ServerNavbar() {
    const supabase = await createClient()
    const { data: {user} } = await supabase.auth.getUser()

    const isLoggedIn = !!user

    let avatarUrl: string | null = null

    if (user) {
        const { data: profile } = await supabase
            .from("profiles")
            .select("profile_picture")
            .eq("id", user.id)
            .single()

        console.log("Profile picture,", profile)

        if (profile?.profile_picture) {
            const { data } = supabase
                .storage
                .from("profile_pics")
                .getPublicUrl(profile.profile_picture)

            avatarUrl = data.publicUrl
        }
    }

    return (
        <Navbar isLoggedIn={isLoggedIn} avatarUrl={avatarUrl} />
    )
}