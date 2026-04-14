import styles from "./MediaGrid.module.css";
import Poster from "../Global/Poster";
import type { DisplayMediaItem } from "@/types/types";

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
    <div className={styles.posterGrid}>
      {items.map((item) => (
        // <div key={item.id} className={styles.poster}> 
        <div key={`${item.source}-${item.externalId}`}>
          <Poster
            title={item.title}
            imageUrl={item.imageUrl}
            onClick={() => onPosterClick?.(item)}
          />
        </div>
      ))}
    </div>
  );
}
