import styles from "./UserBio.module.css"
import Image from "next/image"

export default function() {
    return (
        <div className={styles.main}>

            <Image 
            src="/profile-icons/default icon.png"
            alt="Profile Picture"
            width={200}
            height={200}
            />

            <div>
                <h2 className={styles.Username}>
                    Username
                    </h2>
                <p>This is a biography.</p>

                <Image
                src="/profile-icons/settings icon.png"
                title="Settings"
                alt="Settings"
                width={40}
                height={40}
                className={styles.SettingsIcon}
                />
            </div>
        </div>
    )
}