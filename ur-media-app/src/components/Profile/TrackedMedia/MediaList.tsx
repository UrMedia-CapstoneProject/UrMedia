"use client";
import styles from "./MediaList.module.css";
import MediaCard from "./MediaCard";
import { ProfileTrackedMediaProps } from "@/services/profile/lists/getFollowedLists";

export default function MediaList({
  list,
}: {
  list: ProfileTrackedMediaProps[];
}) {
  const status = [
    "plan",
    "playing",
    "replaying",
    "reading",
    "rereading",
    "watching",
    "rewatching",
    "paused",
    "completed",
    "dropped",
  ];

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
                <MediaCard title={item.title || "No title"}
                  imageUrl={item.posterUrl || "/test-images/default-poster-image"}
                  score={item.rating != null ? String(item.rating) : ""}
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
                <MediaCard title={item.title || "No title"}
                  imageUrl={item.posterUrl || "/test-images/default-poster-image"}
                  score={item.rating != null ? String(item.rating) : ""}
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
                <MediaCard title={item.title || "No title"}
                  imageUrl={item.posterUrl || "/test-images/default-poster-image"}
                  score={item.rating != null ? String(item.rating) : ""}
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
                <MediaCard title={item.title || "No title"}
                  imageUrl={item.posterUrl || "/test-images/default-poster-image"}
                  score={item.rating != null ? String(item.rating) : ""}
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
                <MediaCard title={item.title || "No title"}
                  imageUrl={item.posterUrl || "/test-images/default-poster-image"}
                  score={item.rating != null ? String(item.rating) : ""}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
