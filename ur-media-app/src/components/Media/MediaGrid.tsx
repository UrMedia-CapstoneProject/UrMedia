import styles from "./MediaGrid.module.css";
import Poster from "../Global/Poster";

export type MediaItem = {
  id: number;
  title: string;
  imageURL: string;
  synopsis?: string;
  releaseDate?: string | null;
  mediaType?: "movie" | "show" | "anime" | "game" | "book"; // Remove "anime" if we decide to combine it with movies/shows
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
            imageURL={item.imageURL}
            onClick={() => onPosterClick?.(item)}
          />
        </div>
      ))}
    </div>
  );
}
