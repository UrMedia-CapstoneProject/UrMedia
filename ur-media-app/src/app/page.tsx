import styles from "./page.module.css"
import PopularMedia from "@/components/Media/PopularMedia";
import ProfileCountdown from "@/components/Media/Countdown/ProfileCountdown";
import { ServerFriends } from "@/components/Media/Friends/ServerFriends";

export default function Home() {
  return (
    <div className={styles.main}>
      <PopularMedia />
      <div className={styles.sidebar}>
        <ProfileCountdown />
        <ServerFriends />
      </div>
    </div>
  );
}
