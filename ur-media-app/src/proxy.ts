/*
    - RENAME file to proxy. ⚠ The "middleware" file convention is deprecated. Please use "proxy" instead. Learn more: https://nextjs.org/docs/messages/middleware-to-proxy 



    Flow of the app when user vists their profile:
    - user vists /profile
    - middleware runs
    - supabase checks cookies
    - session is refreshed if needed
    - updated cookies sent back
    - profile page runs getUser()
    - user is recognized
    - ADD LATER: user's saved info should populate. ADD Beth's profile changes in the future - DZ 3/18
*/

import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse} from 'next/server'

export async function proxy(request: NextRequest) {
    let response = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options}) => {
                        request.cookies.set(name, value)
                        response.cookies.set(name, value, options)
                    })
                },
            },
        }
    )
    
    await supabase.auth.getUser()

    return response
}

// config (matcher). Run middleware on ALL routes except the static files. 
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
