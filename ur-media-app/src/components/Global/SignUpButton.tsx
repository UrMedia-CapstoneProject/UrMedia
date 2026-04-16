// import {createClient} from '@supabase/supabase.js'

// // Initialize the Supabase client with your project URL and public anon key
// const supabaseUrl = 'enter our supabase  url here' // From Supabase Settings -> API
// const supabaseAnonKey = 'enter our supabase anon key' // From Supabase Settings -> API
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// async function signInWithGoogle() {
//     const {data,error} = await supabase.auth.signInWithOAuth({
//         provider: 'google',
//         options: {
//             // Specify the redirect URL for after sign-in. This should match an Authorized redirect URI. Should the redirect URI be added to the enbv folder
//             redirectTo: 'https:"//localhost:3000/auth/callback',
//         },
//     });

//     if (error) {
//         console.error('Error signning in with google:', error.message);
//     }

// }

// <button onClick="signInWithGoogle()">click here</button>

//I kept your comments idk if you need them


'use client'

import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const signInWithGoogle = async () => {
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    })

    if (error) {
      console.error('Error signing in with Google:', error.message)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <button onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </main>
  )
}