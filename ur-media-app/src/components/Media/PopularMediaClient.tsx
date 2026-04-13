"use client"

import { useState } from "react"
import MediaGrid from "./MediaGrid"
import MediaDetailModal from "../Global/MediaDetailModal"
import styles from "./PopularMedia.module.css"
import type { DisplayMediaItem } from "@/types/types"

type MediaCategory = "movies" | "shows" | "games" | "books"

type PopularMediaByCategory = Record<MediaCategory, DisplayMediaItem[]>

type PopularMediaClientProps = {
  initialPopularMedia: PopularMediaByCategory
}

export default function PopularMediaClient({
  initialPopularMedia,
}: PopularMediaClientProps) {
  const [selectedMedia, setSelectedMedia] = useState<DisplayMediaItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePosterClick = (item: DisplayMediaItem) => {
    setSelectedMedia(item)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setSelectedMedia(null)
    setIsModalOpen(false)
  }

  return (
    <div className={styles.main}>
      <div className={styles.section}>
        <h2>Popular Movies</h2>
        <MediaGrid
          items={initialPopularMedia.movies}
          onPosterClick={handlePosterClick}
        />
      </div>

      <div className={styles.section}>
        <h2>Popular Shows</h2>
        <MediaGrid
          items={initialPopularMedia.shows}
          onPosterClick={handlePosterClick}
        />
      </div>

      <div className={styles.section}>
        <h2>Popular Games</h2>
        <MediaGrid
          items={initialPopularMedia.games}
          onPosterClick={handlePosterClick}
        />
      </div>

      <div className={styles.section}>
        <h2>Popular Books</h2>
        <MediaGrid
          items={initialPopularMedia.books}
          onPosterClick={handlePosterClick}
        />
      </div>

      <MediaDetailModal
        media={selectedMedia}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}