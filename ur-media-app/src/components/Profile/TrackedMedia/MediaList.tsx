"use client";
import styles from "./MediaList.module.css";
import MediaCard from "./MediaCard";
import { TrackedMediaProps } from "./TrackedMedia";
import { ProfileTrackedMediaProps } from "@/services/profile/lists/getFollowedLists";
import Poster from "@/components/Global/Poster";

export default function MediaList({ list }: { list: ProfileTrackedMediaProps[] }) {
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

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1>Currently Watching</h1>
      </div>
      <div className={styles.grid}>
        {list.map((item) => (
            <div key={`${item.mediaId}`}>
                <Poster
                    title={item.}
                />
            </div>
        ))}

      </div>

      <div className={styles.header}>
        <h1>Completed</h1>
      </div>
      <div className={styles.grid}>


      </div>

      <div className={styles.header}>
        <h1>Plan to Watch</h1>
      </div>
      <div className={styles.grid}>


      </div>

      <div className={styles.header}>
        <h1>Plan to Watch</h1>
      </div>
      <div className={styles.grid}>


      </div>
    </div>
  );
}
