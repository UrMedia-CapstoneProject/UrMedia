// import styles from "./page.module.css"
// import UserBio from "@/components/Profile/UserBio"

// export default function Profile() {
//     return (
//         <div className={styles.main}>
//             <UserBio />
//         </div>
//     )
// }

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import SignOutButton from '@/components/Media/SignOutButton'
import AddMovieTrackerButton from '@/components/Media/AddMovieTrackerButton'
import styles from "./page.module.css"
import UserBio from "@/components/Profile/UserBio";
import Podiums from "@/components/Profile/Podiums";
import List from "@/components/Profile/List";

export default async function ProfilePage() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()

    if (error || !data.user) {
        redirect('/signup')
    }

    return (
        <div className={styles.main}>
            <UserBio />
            <Podiums />
            <List />
            <SignOutButton />
        </div>
    );
}