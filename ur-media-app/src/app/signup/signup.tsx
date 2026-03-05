import {createClient} from '@supabase/supabase.js'

// Initialize the Supabase client with your project URL and public anon key
const supabaseUrl = 'enter our supabase  url here' // From Supabase Settings -> API
const supabaseAnonKey = 'enter our supabase anon key' // From Supabase Settings -> API
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function signInWithGoogle() {
    const {data,error} = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            // Specify the redirect URL for after sign-in. This should match an Authorized redirect URI. Should the redirect URI be added to the enbv folder
            redirectTo: 'https:"//localhost:3000/auth/callback',
        },
    });

    if (error) {
        console.error('Error signning in with google:', error.message);
    }

}




<button onClick="signInWithGoogle()">click here</button>