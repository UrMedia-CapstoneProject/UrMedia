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
import SignOutButton from '@/components/auth/SignOutButton'
import AddMovieTrackerButton from '@/components/auth/AddMovieTrackerButton'

export default async function ProfilePage() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()

    if (error || !data.user) {
        redirect('/signup')
    }

    return (
        <main className="p-6">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <div className="space-y-2">
                <p>
                    <strong>Email:</strong> {data.user.email}
                </p>
                <p>
                    <strong>User ID:</strong> {data.user.id}
                </p>
            </div>

            <SignOutButton />
            <AddMovieTrackerButton />

        </main>
    )

}