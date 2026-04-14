import styles from "./page.module.css"
import UserBio from "@/components/Profile/UserBio/UserBio";
import Podiums from "@/components/Profile/Podium/Podiums";
import TrackedMedia from "@/components/Profile/TrackedMedia/TrackedMedia";
import SignOutButton from "@/components/Global/SignOutButton";
import Stats from "@/components/Profile/Stats/Stats"

export default async function ProfilePage() {
    return (
        <div className={styles.main}>
            <UserBio />
            <div className={styles.content}>
                <Podiums />
                <div className={styles.grid}>
                    <Stats />
                    <TrackedMedia />
                </div>
                <div className={styles.signOutButton}>
                    <SignOutButton />
                </div>
            </div>
        </div>
    );
}