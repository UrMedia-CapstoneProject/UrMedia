import styles from "./page.module.css"
import ProfileStats from "@/components/Profile/Stats/ProfileStats";
import ServerPodiums from "@/components/Profile/Podium/ServerPodiums";
import { ServerUserBio } from "@/components/Profile/UserBio/ServerUserBio";
import ServerTrackedMedia from "@/components/Profile/TrackedMedia/ServerTrackedMedia";

export default async function ProfilePage() {
    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <div className={styles.userInfo}>
                    <ServerUserBio />
                    <ServerPodiums />
                </div>
                <div className={styles.grid}>
                    <ProfileStats />
                    <ServerTrackedMedia /> 
                </div>
            </div>
        </div>
    );
}