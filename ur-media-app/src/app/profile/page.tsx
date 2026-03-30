import styles from "./page.module.css"
import UserBio from "@/components/Profile/UserBio";
import Podiums from "@/components/Profile/Podiums";
import List from "@/components/Profile/List";

export default function Profile() {
    return (
        <div className={styles.main}>
            <UserBio />
            <Podiums />
            <List />
        </div>
    );
}