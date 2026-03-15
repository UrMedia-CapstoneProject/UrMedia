import styles from "./page.module.css"
import UserBio from "@/components/Profile/UserBio"

export default function Profile() {
    return (
        <div className={styles.main}>
            <UserBio />
        </div>
    )
}