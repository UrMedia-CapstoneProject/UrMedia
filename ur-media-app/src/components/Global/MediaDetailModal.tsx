"use client";

import Image from "next/image";
import styles from "./MediaDetailModal.module.css";
import type { MediaItem } from "../Media/MediaGrid";

type MediaDetailModalProps = {
  media: MediaItem | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function MediaDetailModal({
  media,
  isOpen,
  onClose,
}: MediaDetailModalProps) {
  if (!isOpen || !media) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>

        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <Image
              src={media.imageURL}
              alt={media.title}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className={styles.info}>
            <h2>{media.title}</h2>
            <p>
              <strong>Type:</strong> {media.mediaType ?? "Unknown"}
            </p>
            <p>
              <strong>Release Date:</strong> {media.releaseDate ?? "N/A"}
            </p>
            <p>
              <strong>Synopsis:</strong>{" "}
              {media.synopsis ?? "No synopsis avaiable."}
            </p>

            <div>
              <label>Status</label>
              <select defaultValue="Status">
                <option value="watching">Watching</option>
                <option value="plan">Plan to Watch</option>
                <option value="completed">Completed</option>
                <option value="rewatching">Rewatching</option>
                <option value="paused">Paused</option>
                <option value="dropped">Dropped</option>
              </select>
            </div>

            {/*Change the rating to be from 1-10 deciaml format later on*/}
            <div>
              <label>Rating</label>
              <select name="" id="">
                <option value="" disabled>
                  Select rating
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div>
              <label>Notes / Review</label>
              <textarea rows={4} placeholder="Write your thoughts here..." />
            </div>

            {media.mediaType === "game" && (
              <div>
                <label>Time Played</label>
                <input type="number" placeholder="Enter hours played" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
