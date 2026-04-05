import styles from "./page.module.css"
import PopularMedia from "@/components/Media/PopularMedia";
import Countdown from "@/components/Media/Countdown/Countdown";
import Friends from "@/components/Media/Friends/Friends";

export default function Home() {
  return (
    <div className={styles.main}>
        <PopularMedia />
        <div className={styles.sidebar}>
          <Countdown />
          <Friends />
        </div>
    </div>
  );
}
