import { tmdb } from "@/lib/tmdb";
import { TMDBError } from "@lorenzopant/tmdb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const page = Number(req.nextUrl.searchParams.get("page"));

  try {
    const data = await tmdb.movie_lists.popular({ page });
    return data;
  } catch (err) {
    if (err instanceof TMDBError) {
      console.log(err.message);
      console.log(err.http_status_code);
      console.log(err.tmdb_status_code);
    }
  }
}
