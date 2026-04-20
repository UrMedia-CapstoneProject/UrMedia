import styles from "./page.module.css"
import UserBio from "@/components/Profile/UserBio/UserBio";
import TrackedMedia from "@/components/Profile/TrackedMedia/TrackedMedia";
import ProfileStats from "@/components/Profile/Stats/ProfileStats";
import ServerPodiums from "@/components/Profile/Podium/ServerPodiums";

export default async function ProfilePage() {
    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <div className={styles.userInfo}>
                    <UserBio />
                    <ServerPodiums />
                </div>
                <div className={styles.grid}>
                    <ProfileStats />
                    <TrackedMedia />
                </div>
            </div>
        </div>
    );
}