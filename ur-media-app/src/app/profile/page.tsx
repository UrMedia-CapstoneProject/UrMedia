import styles from "./page.module.css"
import UserBio from "@/components/Profile/UserBio/UserBio";
import TrackedMedia from "@/components/Profile/TrackedMedia/TrackedMedia";
import Stats from "@/components/Profile/Stats/Stats"
import ServerPodiums from "@/components/Profile/Podium/ServerPodiums";

export default async function ProfilePage() {
    return (
        <div className={styles.main}>
            <UserBio />
            <div className={styles.content}>
                <ServerPodiums />
                <div className={styles.grid}>
                    <Stats />
                    <TrackedMedia />
                </div>
            </div>
        </div>
    );
}