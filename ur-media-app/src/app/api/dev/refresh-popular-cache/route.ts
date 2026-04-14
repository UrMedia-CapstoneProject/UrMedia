import { NextRequest, NextResponse } from "next/server";
import { refreshPopularMediaCache } from "@/services/media/refresh_popular_media/refreshPopularMediaCache";
import type { PopularMediaGroup, PopularTimeframe } from "@/types/types";

const VALID_GROUPS: PopularMediaGroup[] = ["movies", "shows", "games", "books"];

const VALID_TIMEFRAMES: PopularTimeframe[] = ["all_time", "7d", "30d"];

// Helper Function to check if media group is valid
function isValidMediaGroup(value: string): value is PopularMediaGroup {
  return VALID_GROUPS.includes(value as PopularMediaGroup);
}

// Helper Function to check if time frame is valid
function isValidTimeframe(value: string): value is PopularTimeframe {
  return VALID_TIMEFRAMES.includes(value as PopularTimeframe);
}

export async function POST(request: NextRequest) {
  try {
    // Can only work in dev only route
    if (process.env.NODE_ENV !== "development") {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Extra measure for only onlying devs to go further
    const expectedSecret = process.env.DEV_REFRESH_POPULAR_CACHE_SECRET;
    const providedSecret = request.headers.get(
      "x-dev-refresh-popular-cache-secret-x",
    );

    console.log("expectedSecret:", JSON.stringify(expectedSecret));
      console.log("providedSecret:", JSON.stringify(providedSecret));
      console.log("match:", expectedSecret === providedSecret);

    if (!expectedSecret || providedSecret !== expectedSecret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const mediaGroup = body.mediaGroup;
    const timeframe = body.timeframe;
    const staleAfterHours =
      typeof body.staleAfterHours === "number" ? body.staleAfterHours : 24;

    // Refresh all media groups at once
    if (mediaGroup === "all") {
      const resolvedTimeframe = isValidTimeframe(timeframe)
        ? timeframe
        : "all_time";

      const results = [];

      for (const group of VALID_GROUPS) {
        const result = await refreshPopularMediaCache({
          mediaGroup: group,
          timeframe: resolvedTimeframe,
          staleAfterHours,
        });

        results.push(result);
      }

      return NextResponse.json({
        success: true,
        mode: "all",
        results,
      });
    }

    if (!isValidMediaGroup(mediaGroup)) {
      return NextResponse.json(
        { error: "Invalid mediaGroup" },
        { status: 400 },
      );
    }

    if (!isValidTimeframe(timeframe)) {
      return NextResponse.json({ error: "Invalid timeframe" }, { status: 400 });
    }

    // Refresh one specific media group
    const result = await refreshPopularMediaCache({
      mediaGroup,
      timeframe,
      staleAfterHours,
    });

    return NextResponse.json({
      success: true,
      mode: "single",
      result,
    });
  } catch (error) {
    console.error("POST /api/dev/refresh-popular-cache error:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
