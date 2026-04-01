import styles from "./MediaGrid.module.css";
import Poster from "../Global/Poster";

export type MediaItem = {
  id: number
  source?: "movie" | "jikan" | "rawg" | "google_books"
  mediaType?: "movie" | "show" | "anime_movie" | "anime_show" | "game" | "book"
  externalId?: string
  title: string;
  imageUrl: string;
  synopsis?: string;
  releaseDate?: string | null;
  
};



type MediaGridProps = {
  items: MediaItem[];
  onPosterClick?: (item: MediaItem) => void;
};

export default function MediaGrid({ items, onPosterClick }: MediaGridProps) {
  return (
    <div className={styles.posterGrid}>
      {items.map((item) => (
        <div key={item.id}>
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
