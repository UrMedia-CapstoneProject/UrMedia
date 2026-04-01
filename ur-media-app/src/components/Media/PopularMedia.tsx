"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import MediaGrid, { MediaItem } from "./MediaGrid"
import MediaDetailModal from "../Global/MediaDetailModal"

type PopularMediaRow = {
    media_group: "movies" | "shows" | "games" | "books"
    rank: number
    follow_count: number
    media: {
        id: number
        source: string
        media_type: string
        external_id: string
        title: string
        image_url: string | null
        synopsis: string | null
        release_date: string | null
    } | null
}

export default function PopularMedia() {
    const supabase = createClient()

    const [movies, setMovies] = useState<MediaItem[]>([])
    const [shows, setShows] = useState<MediaItem[]>([])
    const [games, setGames] = useState<MediaItem[]>([])
    const [books, setBooks] = useState<MediaItem[]>([])
    const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        const loadPopularMedia = async () => {
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

            const mappedItems: Record<"movies" | "shows" | "games" | "books", MediaItem[]> = {
                movies: [],
                shows: [],
                games: [],
                books: [],
            }

            for (const row of (data ?? []) as PopularMediaRow[]) {
                const media = row.media

                if (!media) continue

                mappedItems[row.media_group].push({
                    id: media.id,
                    source: media.source as MediaItem["source"],
                    mediaType: media.media_type as MediaItem["mediaType"],
                    externalId: media.external_id,
                    title: media.title,
                    imageUrl: media.image_url ?? "/test-images/default_no_image.png",
                    synopsis: media.synopsis ?? undefined,
                    releaseDate: media.release_date ?? null,
                })
            }

            setMovies(mappedItems.movies)
            setShows(mappedItems.shows)
            setGames(mappedItems.games)
            setBooks(mappedItems.books)

            console.log("popular media raw data:", data)
            console.log("first row:", data?.[0])
            console.log("first row media:", data?.[0]?.media)
        }

        loadPopularMedia()
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
        <>
            <section>
                <h2>Popular Movies</h2>
                <MediaGrid items={movies} onPosterClick={handlePosterClick} />
            </section>
            <br />

            <section>
                <h2>Popular Shows</h2>
                <MediaGrid items={shows} onPosterClick={handlePosterClick} />
            </section>
            <br />

            <section>
                <h2>Popular Games</h2>
                <MediaGrid items={games} onPosterClick={handlePosterClick} />
            </section>
            <br />

            <section>
                <h2>Popular Books</h2>
                <MediaGrid items={books} onPosterClick={handlePosterClick} />
            </section>
            <br />

            <MediaDetailModal
                media={selectedMedia}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    )
}