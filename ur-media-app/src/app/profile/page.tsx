import styles from "./page.module.css"
import UserBio from "@/components/Profile/UserBio/UserBio";
import Podiums from "@/components/Profile/Podium/Podiums";
import TrackedMedia from "@/components/Profile/TrackedMedia/TrackedMedia";
import SignOutButton from "@/components/Global/SignOutButton";
import ProfileStats from "@/components/Profile/Stats/ProfileStats";

export default async function ProfilePage() {
    return (
        <div className={styles.main}>
            <UserBio />
            <div className={styles.content}>
                <Podiums />
                <div className={styles.grid}>
                    <ProfileStats /> 
                    <TrackedMedia />
                </div>
            </div>
        </div>
    );
}