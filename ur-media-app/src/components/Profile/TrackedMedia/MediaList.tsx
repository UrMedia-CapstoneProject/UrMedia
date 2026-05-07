"use client";
import styles from "./MediaList.module.css";
import MediaCard from "./MediaCard";
import { useState } from "react";
import { ProfileTrackedMediaProps } from "@/services/profile/lists/getFollowedLists";
import { getMediaDetails } from "@/services/catalog/getMediaDetails";
import { MediaResultItem } from "@/types/types";
import MediaDetailModal from "@/components/Global/MediaDetailModal";
import { mapMedia } from "@/utils/mapDataHelper";

export default function MediaList({
  list,
}: {
  list: ProfileTrackedMediaProps[];
}) {
  const [media, setMedia] = useState<MediaResultItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [realMediaId, setRealMediaId] = useState(0);
  const watchingItems = list.filter(
    (item) =>
      item.watchStatus === "watching" ||
      item.watchStatus === "playing" ||
      item.watchStatus === "reading",
  );
  const completedItems = list.filter(
    (item) => item.watchStatus === "completed",
  );
  const pausedItems = list.filter((item) => item.watchStatus === "paused");
  const droppedItems = list.filter((item) => item.watchStatus === "dropped");
  const plannedItems = list.filter((item) => item.watchStatus === "plan");

  const handleMediaCardClick = async (id: number, category: string, externalId: number) => {
    if (category == "movie") {
      category = 'movies'
    } else if (category == "show") {
      category = 'shows'
    } else if (category == "game") {
      category = 'games'
    } else if (category == "anime_moive" || category == "anime_show") {
      category = 'animes'
    } else if (category == 'manga') {
      category = 'mangas'
    }
    const response = await getMediaDetails(externalId, category)
    const media: MediaResultItem = response.media;
    setMedia(media);
    setIsModalOpen(true);
    setRealMediaId(id)
  }

  const handleCloseModal = () => {
    setMedia(null)
    setIsModalOpen(false)
  }

  return (
    <div className={styles.main}>
      {watchingItems.length > 0 && (
        <>
          <div className={styles.header}>
            <h1>Currently Watching</h1>
          </div>

          <div className={styles.grid}>
            {watchingItems.map((item) => (
              <div key={item.mediaId}>
                <MediaCard
                  title={item.title || "No title"}
                  imageUrl={
                    item.posterUrl || "/test-images/default-poster-image"
                  }
                  score={item.rating != null ? String(item.rating) : ""}
                  onClick={() => handleMediaCardClick(item.mediaId, item.mediaType, Number(item.externalId))}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {completedItems.length > 0 && (
        <>
          <div className={styles.header}>
            <h1>Completed</h1>
          </div>

          <div className={styles.grid}>
            {completedItems.map((item) => (
              <div key={item.mediaId}>
                <MediaCard
                  title={item.title || "No title"}
                  imageUrl={
                    item.posterUrl || "/test-images/default-poster-image"
                  }
                  score={item.rating != null ? String(item.rating) : ""}
                  onClick={() => handleMediaCardClick(item.mediaId, item.mediaType, Number(item.externalId))}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {pausedItems.length > 0 && (
        <>
          <div className={styles.header}>
            <h1>Paused</h1>
          </div>

          <div className={styles.grid}>
            {pausedItems.map((item) => (
              <div key={item.mediaId}>
                <MediaCard
                  title={item.title || "No title"}
                  imageUrl={
                    item.posterUrl || "/test-images/default-poster-image"
                  }
                  score={item.rating != null ? String(item.rating) : ""}
                  onClick={() => handleMediaCardClick(item.mediaId, item.mediaType, Number(item.externalId))}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {droppedItems.length > 0 && (
        <>
          <div className={styles.header}>
            <h1>Dropped</h1>
          </div>

          <div className={styles.grid}>
            {droppedItems.map((item) => (
              <div key={item.mediaId}>
                <MediaCard
                  title={item.title || "No title"}
                  imageUrl={
                    item.posterUrl || "/test-images/default-poster-image"
                  }
                  score={item.rating != null ? String(item.rating) : ""}
                  onClick={() => handleMediaCardClick(item.mediaId, item.mediaType, Number(item.externalId))}
                />
              </div>
            ))}
          </div>
        </>
      )}

      {plannedItems.length > 0 && (
        <>
          <div className={styles.header}>
            <h1>Planning</h1>
          </div>

          <div className={styles.grid}>
            {plannedItems.map((item) => (
              <div key={item.mediaId}>
                <MediaCard
                  title={item.title || "No title"}
                  imageUrl={
                    item.posterUrl || "/test-images/default-poster-image"
                  }
                  score={item.rating != null ? String(item.rating) : ""}
                  onClick={() => handleMediaCardClick(item.mediaId, item.mediaType, Number(item.externalId))}
                />
              </div>
            ))}
          </div>
        </>
      )}

      <MediaDetailModal
        media={media ? mapMedia(media, realMediaId) : undefined}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
