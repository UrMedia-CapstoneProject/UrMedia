import styles from "./UserBio.module.css"
import Image from "next/image"

export default function () {
    return (
        <div className={styles.main}>
            <div className={styles.content}>

                <div className={styles.left}>
                    <Image
                        src="/profile-icons/default icon.png"
                        alt="Profile Picture"
                        width={200}
                        height={200}
                        className={styles.pfp}
                    />

                    <h2 className={styles.username}>
                        Username
                    </h2>
                </div>

                <p className={styles.bio}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <Image
                    src="/profile-icons/settings icon.png"
                    title="Settings"
                    alt="Settings"
                    width={40}
                    height={40}
                    className={styles.settingsIcon}
                />

            </div>
        </div>
    )
}