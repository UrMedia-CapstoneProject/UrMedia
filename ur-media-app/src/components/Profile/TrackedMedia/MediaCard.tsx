'use client'

import styles from "./MediaCard.module.css";
import Image from "next/image";

type MediaCardProps = {
  title: string;
  imageUrl: string;
  epWatched?: string;
  score?: string;
  onClick?: () => void
};

export default function MediaCard({
  title,
  imageUrl,
  epWatched,
  score,
  onClick,
}: MediaCardProps) {
  return (
    <div className={styles.main} >
      <div className={styles.poster} onClick={onClick}>
        <Image src={imageUrl} alt={title} fill className={styles.posterImage} />

        <div className={styles.mediaInfo}>
          <p className={styles.title}>
            <span className={styles.titleText}>{title}</span>
          </p>

          <div className={styles.userStats}>
            <p className={styles.score}>{score}</p>
            <p className={styles.epWatched}>{epWatched}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
