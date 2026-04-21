import styles from "./page.module.css"
import PopularMedia from "@/components/Media/PopularMedia";
import ProfileCountdown from "@/components/Media/Countdown/ProfileCountdown";
import Friends from "@/components/Media/Friends/Friends";

export default function Home() {
  return (
    <div className={styles.main}>
      <PopularMedia />
      <div className={styles.sidebar}>
        <ProfileCountdown />
        <Friends />
      </div>
    </div>
  );
}
