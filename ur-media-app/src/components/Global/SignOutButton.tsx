'use client'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import styles from './SignOutButton.module.css'

export default function SignOutButton() {
    const router = useRouter()

    const handleSignOut = async () => {
        const supabase = createClient()

        const { error } = await supabase.auth.signOut()

        if (error) {
            console.error('Error signing out:', error.message)
            return
        }

        router.push('/')
        router.refresh()
    }

    return (
        <div className={styles.main}>
            <button onClick={handleSignOut}>
                Sign Out
            </button>
        </div>
    )

}

