import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getUserTrackedMedia } from '@/services/media/user_tracked/getUserTrackedMedia'

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const mediaIdParameter = searchParams.get("mediaId")
        const mediaTypeParameter = searchParams.get("mediaType")

        if (!mediaIdParameter || !mediaTypeParameter) {
            return NextResponse.json(
                { error: "Missing mediaId or mediaType" },
                { status: 400 }
            )
        }

        const mediaId = Number(mediaIdParameter)
        
        if (Number.isNaN(mediaId)) {
            return NextResponse.json(
                { error: "mediaId must be a valid number"},
                { status: 400}
            )
        }

        const supabase = await createClient()
        const { data: authorizedUser, error: authorizedError } = await supabase.auth.getUser()

        if (!authorizedUser || authorizedError) {
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
            )
        }

        const result = await getUserTrackedMedia({
            supabase,
            userId: authorizedUser.user.id,
            mediaId,
            mediaType: mediaTypeParameter
        })
        return NextResponse.json(result)
    } catch (error) {
        console.error("GET /api/media/user-tracked error:", error)

        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : "Unknown server error."
            },
            { status: 500}
        )
    }
}
