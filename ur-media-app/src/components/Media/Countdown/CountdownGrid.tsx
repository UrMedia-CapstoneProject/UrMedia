import styles from "./CountdownGrid.module.css";
import MediaCard from "./MediaCard";
import { CountdownItem } from "@/services/media/countdown/getCountdownFollowedMediaForUser";

type CountdownGridProps = {
  items: CountdownItem[];
};

export default function CountdownGrid({
  items,
}: CountdownGridProps) {
  if (items.length === 0) {
    return (
      <div className={styles.emptyState}>
        No upcoming releases yet.
      </div>
    );
  }

  return (
    <div className={styles.main}>
      {items.map((item) => (
        <MediaCard
          key={`${item.mediaType}-${item.mediaId}`}
          item={item}
        />
      ))}
    </div>
  );
}