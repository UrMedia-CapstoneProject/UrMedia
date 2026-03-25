'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
    const router = useRouter()

    const handleSignOut = async () => {
        const supabase = createClient()

        const { error } = await supabase.auth.signOut()

        if (error) {
            console.error('Error signing out:', error.message)
            return
        }

        router.push('/') // we can push to either the sign up page or the media home page
        router.refresh()
    }

    return (
        <button onClick={handleSignOut}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
            Sign Out
        </button>
    )

}

