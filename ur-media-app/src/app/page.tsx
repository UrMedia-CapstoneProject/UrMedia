import styles from "./page.module.css"
import PopularMedia from "@/components/PopularMedia";
import Countdown from "@/components/Countdown";
import Friends from "@/components/Friends";

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
