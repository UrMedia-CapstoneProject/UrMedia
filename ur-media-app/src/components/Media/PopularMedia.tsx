import { createClient } from "@/lib/supabase/server"
import PopularMediaClient from "./PopularMediaClient"
import type { MediaCategory, DisplayMediaItem } from "@/types/types"

type DatabaseMediaRecord = {
  id: number
  source: string
  media_type: string
  external_id: string
  title: string
  image_url: string | null
  synopsis: string | null
  release_date: string | null
}

type PopularMediaCacheRow = {
  media_group: MediaCategory
  rank: number
  follow_count: number
  media: DatabaseMediaRecord | null
}

type PopularMediaByCategory = Record<MediaCategory, DisplayMediaItem[]>

/*
This function fixes the raw Supabase response shape. Convert media into a single object or null.
*/
function normalizePopularMediaCacheRows(rawRows: any[]): PopularMediaCacheRow[] {
  return rawRows.map((row) => ({
    media_group: row.media_group,
    rank: row.rank,
    follow_count: row.follow_count,
    media: Array.isArray(row.media) ? row.media[0] ?? null : row.media ?? null,
  }))
}

/*
Convert one database media record into the MediaItem shape used by MediaGrid and the modal.
*/

function convertDatabaseMediaToMediaItem(
  mediaRecord: DatabaseMediaRecord
): DisplayMediaItem {
  return {
    id: mediaRecord.id,
    source: mediaRecord.source as DisplayMediaItem["source"],
    mediaType: mediaRecord.media_type as DisplayMediaItem["mediaType"],
    externalId: mediaRecord.external_id,
    title: mediaRecord.title,
    imageUrl: mediaRecord.image_url ?? "/test-images/default_no_image.png",
    synopsis: mediaRecord.synopsis ?? undefined,
    releaseDate: mediaRecord.release_date ?? null,
  }
}

/*
Take the cleaned query rows and sort them into 4 grouped arrays for the page.
*/
function buildPopularMediaByCategory(
  popularMediaRows: PopularMediaCacheRow[]
): PopularMediaByCategory {
  const groupedMedia: PopularMediaByCategory = {
    movies: [],
    shows: [],
    games: [],
    books: [],
  }

  for (const row of popularMediaRows) {
    if (!row.media) continue

    groupedMedia[row.media_group].push(
      convertDatabaseMediaToMediaItem(row.media)
    )
  }

  return groupedMedia
}

export default async function PopularMedia() {

  const rows = await getNormalizedProfileStatsRow('f6108ce8-44c2-4203-bf1f-27f5668c1f9b')

console.log({
  total: rows.length,
  movies: rows.filter((row) => row.bucket === "movies").length,
  shows: rows.filter((row) => row.bucket === "shows").length,
  games: rows.filter((row) => row.bucket === "games").length,
  books: rows.filter((row) => row.bucket === "books").length,
})
  const supabase = await createClient()

  // Testing stat values based on logged in user
  // const rows = await getNormalizedProfileStatsRows('enter_user_id')
  // const rows2 = await getProfileStats('enter_user_id')

  //   console.log({
  //     total: rows.length,
  //     movies: rows.filter((row) => row.bucket === "movies").length,
  //     shows: rows.filter((row) => row.bucket === "shows").length,
  //     games: rows.filter((row) => row.bucket === "games").length,
  //     books: rows.filter((row) => row.bucket === "books").length,
  //   })

  //   console.log("profile-stats", rows2)

  const { data, error } = await supabase
    .from("popular_media_cache")
    .select(`
      media_group,
      rank,
      follow_count,
      media:media_id (
        id,
        source,
        media_type,
        external_id,
        title,
        image_url,
        synopsis,
        release_date
      )
    `)
    .eq("timeframe", "all_time")
    .order("media_group", { ascending: true })
    .order("rank", { ascending: true })

  if (error) {
    console.error("Error loading popular media:", error.message)

    return (
      <PopularMediaClient
        initialPopularMedia={{
          movies: [],
          shows: [],
          games: [],
          books: [],
        }}
      />
    )
  }

  const normalizedRows = normalizePopularMediaCacheRows(data ?? [])
  const groupedMedia = buildPopularMediaByCategory(normalizedRows)

  return <PopularMediaClient initialPopularMedia={groupedMedia} />
}