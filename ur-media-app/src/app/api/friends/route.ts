import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { addFriend } from '@/services/media/friends/friends'
import { getFriendInfo } from '@/services/media/friends/friends'

export async function GET(request: NextRequest) {
    try{
        const supabase = await createClient()
        const { data: authorizedUser, error: authorizedError } = await supabase.auth.getUser()

        if (!authorizedUser || authorizedError) {
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
            )
        }

        const result = await getFriendInfo({
            supabase,
            userId: authorizedUser.user.id
        })
        return NextResponse.json(result)

    } catch (error) {
        console.error("GET /api/media/user-tracked error:", error)

        return NextResponse.json(
            {error: error instanceof Error ? error.message : "Unknown server error."},
            { status: 500 }
        )
    }
}

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json()
        const supabase = await createClient()
        const { data: authorizedUser, error: authorizedError } = await supabase.auth.getUser()

        if (!authorizedUser || authorizedError) {
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
            )
        }

        const userId = authorizedUser.user.id;

        await addFriend({
            supabase,
            userId,
            payload,
        });

        return NextResponse.json({ success: true });

    } catch(error) {
        console.error("GET /api/user error:", error)

        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Unknown server error."},
            { status: 500 }
        )
    }
}

export async function DELETE(req: NextRequest) {}