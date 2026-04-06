import styles from "./page.module.css"
import UserBio from "@/components/Profile/UserBio";
import Podiums from "@/components/Profile/Podiums";
import List from "@/components/Profile/List";
import SignOutButton from "@/components/Media/SignOutButton";

export default async function ProfilePage() {
    return (
        <div className={styles.main}>
            <UserBio />
            <Podiums />
            <List />
            <div className={styles.signOutButton}>
                <SignOutButton />
            </div>
        </div>
    );
}