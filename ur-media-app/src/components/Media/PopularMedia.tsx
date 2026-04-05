"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import MediaGrid, { MediaItem } from "./MediaGrid"
import MediaDetailModal from "../Global/MediaDetailModal"

type MediaCategory = "movies" | "shows" | "games" | "books"

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

type PopularMediaByCategory = Record<MediaCategory, MediaItem[]>

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
function convertDatabaseMediaToMediaItem(mediaRecord: DatabaseMediaRecord): MediaItem {
    return {
        id: mediaRecord.id,
        source: mediaRecord.source as MediaItem["source"],
        mediaType: mediaRecord.media_type as MediaItem["mediaType"],
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

export default function PopularMedia() {
    const supabase = createClient()

    const [popularMedia, setPopularMedia] = useState<PopularMediaByCategory>({
        movies: [],
        shows: [],
        games: [],
        books: [],
    })
    const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const fetchPopularMedia = async () => {
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
                return
            }

            const normalizedRows = normalizePopularMediaCacheRows(data ?? [])
            const groupedMedia = buildPopularMediaByCategory(normalizedRows)

            setPopularMedia(groupedMedia)
        }

        fetchPopularMedia()
    }, [supabase])


    const handlePosterClick = (item: MediaItem) => {
        setSelectedMedia(item)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setSelectedMedia(null)
        setIsModalOpen(false)
    }

    return (
        <div>
            <section>
                <h2>Popular Movies</h2>
                <MediaGrid
                    items={popularMedia.movies}
                    onPosterClick={handlePosterClick}
                />
            </section>
            <br />

            <section>
                <h2>Popular Shows</h2>
                <MediaGrid
                    items={popularMedia.shows}
                    onPosterClick={handlePosterClick}
                />
            </section>
            <br />

            <section>
                <h2>Popular Games</h2>
                <MediaGrid
                    items={popularMedia.games}
                    onPosterClick={handlePosterClick}
                />
            </section>
            <br />

            <section>
                <h2>Popular Books</h2>
                <MediaGrid
                    items={popularMedia.books}
                    onPosterClick={handlePosterClick}
                />
            </section>
            <br />

            <MediaDetailModal
                media={selectedMedia}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    )
}