"use client"
import { useState } from "react"
import styles from "./PopularMedia.module.css"
import MediaGrid, { MediaItem } from "./MediaGrid"
import MediaDetailModal from "../Global/MediaDetailModal"
import EditModal from "../Profile/EditModal"

export default function PopularMedia() {
    const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const items: MediaItem[] = [
        {
            id: 1,
            title: "Example Movie",
            imageURL: "/test-images/example-poster2.jpg",
            synopsis: "This is an example synopsis for a movie.",
            releaseDate: "2024-10-10",
            mediaType: "movie",
        },
        {
            id: 2,
            title: "Example Anime",
            imageURL: "/test-images/example-poster2.jpg",
            synopsis: "This is an example synopsis for an anime.",
            releaseDate: "2025-01-15",
            mediaType: "anime",
        },
        {
            id: 3,
            title: "Example Game",
            imageURL: "/test-images/example-poster2.jpg",
            synopsis: "This is an example synopsis for a game.",
            releaseDate: "2021-02-09",
            mediaType: "game",
        },
    ]

    const handlePosterClick = (item: MediaItem) => {
        setSelectedMedia(item)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedMedia(null)
    }

    return (
        <>
            <MediaGrid items={items} onPosterClick={handlePosterClick} />
            <MediaDetailModal
                media={selectedMedia}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </>
    )
}




// return (
//     <div className={styles.main}>
//         <div>
//             <h2 className={styles.sectionHeader}>Popular Movies</h2>
//             <MediaGrid />
//         </div>
//         <div>
//             <h2 className={styles.sectionHeader}>Popular Shows</h2>
//             <MediaGrid />
//         </div>
//         <div>
//             <h2 className={styles.sectionHeader}>Popular Games</h2>
//             <MediaGrid />
//         </div>
//         <div>
//             <h2 className={styles.sectionHeader}>Popular Books</h2>
//             <MediaGrid />
//         </div>
//     </div>
// )