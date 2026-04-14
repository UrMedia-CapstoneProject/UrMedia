import styles from "./page.module.css"
import PopularMedia from "@/components/Media/PopularMedia";
import Countdown from "@/components/Media/Countdown/Countdown";
import Friends from "@/components/Media/Friends/Friends";
import MobileSearch from "@/components/Media/MobileSearch"

export default function Home() {
  return (
    <div className={styles.main}>
      {/* <div className={styles.mobileSeachBar}>
        <MobileSearch />
      </div> */}
      <PopularMedia />
      <div className={styles.sidebar}>
        <Countdown />
        <Friends />
      </div>
    </div>
  );
}
