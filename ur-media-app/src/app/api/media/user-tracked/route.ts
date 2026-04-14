import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getUserTrackedMedia } from "@/services/media/user_tracked/getUserTrackedMedia";
import { upsertTrackedMedia } from "@/services/media/user_tracked/upsertUserTrackedMedia";
import { deleteUserTrackedMedia } from "@/services/media/user_tracked/deleteTrackedMedia";

import { refreshMediaMetadata } from "@/services/media/refresh_popular_media/refreshMediaMetadata";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

export async function GET(request: NextRequest) {
    console.log(process.env.NODE_ENV)
  try {
    const searchParams = request.nextUrl.searchParams;
    const mediaIdParameter = searchParams.get("mediaId");
    const mediaTypeParameter = searchParams.get("mediaType");

    if (!mediaIdParameter || !mediaTypeParameter) {
      return NextResponse.json(
        { error: "Missing mediaId or mediaType" },
        { status: 400 },
      );
    }

    const mediaId = Number(mediaIdParameter);

    if (Number.isNaN(mediaId)) {
      return NextResponse.json(
        { error: "mediaId must be a valid number" },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    const { data: authorizedUser, error: authorizedError } =
      await supabase.auth.getUser();

    if (!authorizedUser || authorizedError) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }

    // Testing Purposes only
    //-----------------------------------------------------------------------

    const refreshUrl = new URL("/api/dev/refresh-popular-cache", request.url);

    await fetch(refreshUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mediaGroup: "movies",
        timeframe: "all_time",
        staleAfterHours: 24,
      }),
    });
    //-----------------------------------------------------------------------

    const result = await getUserTrackedMedia({
      supabase,
      userId: authorizedUser.user.id,
      mediaId,
      mediaType: mediaTypeParameter,
    });
    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/media/user-tracked error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown server error.",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("POST /api/media/user-tracked hit");

    const payload = await req.json();

    const supabase = await createClient();
    const { data: authorizedUser, error: authorizedError } =
      await supabase.auth.getUser();

    if (!authorizedUser || authorizedError) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }

    const userId = authorizedUser.user.id;

    // call your DB function
    await upsertTrackedMedia({
      supabase,
      userId,
      payload,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    console.log("DELETE /api/media/user-tracked hit");

    const payload = await req.json();

    const supabase = await createClient();
    const { data: authorizedUser, error: authorizedError } =
      await supabase.auth.getUser();

    if (!authorizedUser || authorizedError) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 },
      );
    }

    const userId = authorizedUser.user.id;

    await deleteUserTrackedMedia({
      supabase,
      userId,
      payload,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
