import styles from "./MediaGrid.module.css";
import Poster from "../Global/Poster";
import type { DisplayMediaItem } from "@/types/types";
import MobileMediaCard from "../Global/MobileMediaCard";

type MediaGridProps = {
  items: DisplayMediaItem[];
  onPosterClick?: (item: DisplayMediaItem) => void;
  isBooks?: boolean;
};

export default function MediaGrid({
  items,
  onPosterClick,
  isBooks,
}: MediaGridProps) {
  return (
    <div>
      {!isBooks ? (
        <>
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
        </>
      ) : (
        <div className={styles.defaultMessage}>
          <h2>Books coming soon!</h2>
        </div>
      )}
    </div>
  );
}
