import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(new URL('/signup', request.url))
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    console.error('Error exchanging code for session:', error.message)
    return NextResponse.redirect(new URL('/signup', request.url))
  }

  const { data: userData, error: userError } = await supabase.auth.getUser()

  if (userError || !userData.user) {
    console.error('Error getting user after login:', userError?.message)
    return NextResponse.redirect(new URL('/signup', request.url))
  }

  const { error: profileError } = await supabase.from('profiles').upsert({
    id: userData.user.id,
    username: userData.user.email?.split('@')[0] ?? null,
  })

  if (profileError) {
    console.error('Error creating profile:', profileError?.message)
    return NextResponse.redirect(new URL('/signup', request.url))
  }

  return NextResponse.redirect(new URL('/', request.url))
}