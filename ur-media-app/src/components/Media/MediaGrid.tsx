import styles from "./MediaGrid.module.css";
import Poster from "../Global/Poster";
import type { DisplayMediaItem } from "@/types/types";
import MobileMediaCard from "../Global/MobileMediaCard";

// Previous type. Switch to DisplayMediaItem
// export type MediaItem = {
//   id: number
//   source?: "movie" | "jikan" | "rawg" | "google_books"
//   mediaType: "movie" | "show" | "anime_movie" | "anime_show" | "game" | "book"
//   externalId?: string
//   title: string;
//   imageUrl: string;
//   synopsis?: string;
//   releaseDate?: string | null;
//   totalEpisodes?: number | null; // Needed for keeping track how many max episodes that the user can track. Might not need it
// };


type MediaGridProps = {
  items: DisplayMediaItem[];
  onPosterClick?: (item: DisplayMediaItem) => void;
};

export default function MediaGrid({ items, onPosterClick }: MediaGridProps) {
  return (
    <div className={styles.wrapper}>

      <div className={styles.posterGrid}>
        {items.map((item) => (
          <div key={`${item.source}-${item.externalId}`}>
            <Poster
              title={item.title}
              imageUrl={item.imageUrl}
              onClick={() => onPosterClick?.(item)}
              hoverEnabled={true}
            />
          </div>
        ))}
      </div>

      <div className={styles.mobileRow}>
        {items.map((item) => (
          <MobileMediaCard
            key={`${item.source}-${item.externalId}`}
            item={item}
            onClick={() => onPosterClick?.(item)}
          />
        ))}
      </div>

    </div>
  );
}
