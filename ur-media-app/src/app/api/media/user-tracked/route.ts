import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
        const searchParams = request.nextUrl.searchParams
        const mediaId = searchParams.get("mediaId")
        const mediaType = searchParams.get("mediaType")

        if (!mediaId || !mediaType) {
            return NextResponse.json(
                { error: "Missing mediaId or mediaType" },
                { status: 400 }
            )
        }

        const supabase = await createClient()
        const { data: authData, error: authError } = await supabase.auth.getUser()

        if (!authData || authError) {
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
            )
        }

        return NextResponse.json({
            message: "Route is working",
            mediaId,
            mediaType,
            userId: authData.user.id,
        })
}
