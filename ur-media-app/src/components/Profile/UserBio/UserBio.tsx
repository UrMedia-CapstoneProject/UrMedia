"use client"
import { useState } from "react"
import styles from "./UserBio.module.css"
import Image from "next/image"
import SettingsModal from "./SettingsModal"

export default function () {

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    function openSettingsModal() {
        setIsSettingsOpen(true)
    }

    function closeSettingsModal() {
        setIsSettingsOpen(false)
    }

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

                <div className={styles.SettingsButton} onClick = {openSettingsModal}>
                    <Image
                        src="/profile-icons/settings.png"
                        title="Settings"
                        alt="Settings"
                        width={45}
                        height={45}
                    />
                </div>
            </div>

            {isSettingsOpen && (
                <SettingsModal onClose = {closeSettingsModal} />
            )}
        </div>
    )
}