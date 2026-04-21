/*Renders one countdown card*/

import Poster from "@/components/Global/Poster";
import styles from "./MediaCard.module.css";
import { CountdownItem } from "@/services/media/countdown/getCountdownFollowedMediaForUser";

type MediaCardProps = {
  item: CountdownItem;
};

export default function MediaCard({ item }: MediaCardProps) {
  return (
    <div className={styles.main}>
      <div className={styles.poster}>
        <Poster
          title={item.title}
          imageUrl={item.imageUrl ?? ""}
          hoverEnabled={false}
        />
      </div>

      <div className={styles.info}>
        <div className={styles.title}>
          <h2>{item.title}</h2>
        </div>

        <div className={styles.countdown}>
          <p>{item.countdownText}</p>
        </div>
      </div>
    </div>
  );
}