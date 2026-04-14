import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()

    // 1. Get logged-in user
    const { data: authData, error: authError } = await supabase.auth.getUser()

    if (authError || !authData.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = authData.user

    // 2. Get request body
    const body = await request.json()
    const {
      externalId,
      title,
      imageUrl,
      releaseDate,
      watchStatus = 'Plan to Watch',
      follow = true,
    } = body

    if (!externalId || !title) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 3. Find existing media
    const { data: existingMedia, error: existingError } = await supabase
      .from('media')
      .select('id')
      .eq('source', 'tmdb')
      .eq('media_type', 'movie')
      .eq('external_id', String(externalId))
      .maybeSingle()

    if (existingError) {
      return NextResponse.json(
        { error: existingError.message },
        { status: 500 }
      )
    }

    let mediaId = existingMedia?.id

    // 4. Insert media if not found
    if (!mediaId) {
      const { data: newMedia, error: insertError } = await supabase
        .from('media')
        .insert({
          source: 'tmdb',
          media_type: 'movie',
          external_id: String(externalId),
          title,
          image_url: imageUrl ?? null,
          release_date: releaseDate ?? null,
        })
        .select('id')
        .single()

      if (insertError || !newMedia) {
        return NextResponse.json(
          { error: insertError?.message || 'Insert failed' },
          { status: 500 }
        )
      }

      mediaId = newMedia.id
    }

    // 5. Insert tracked movie
    const { error: trackedError } = await supabase
      .from('UserTrackedMovies')
      .upsert({
        user_id: user.id,
        media_id: mediaId,
        watch_status: watchStatus,
      })

    if (trackedError) {
      return NextResponse.json(
        { error: trackedError.message },
        { status: 500 }
      )
    }

    // 6. Insert follow row
    if (follow) {
      const { error: followError } = await supabase
        .from('media_follows')
        .upsert({
          user_id: user.id,
          media_id: mediaId,
        })

      if (followError) {
        return NextResponse.json(
          { error: followError.message },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}