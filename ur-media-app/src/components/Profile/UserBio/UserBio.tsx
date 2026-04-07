"use client"
import { useState } from "react"
import styles from "./UserBio.module.css"
import Image from "next/image"

export default function () {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.main}>
            <div className={styles.content}>

                <Image
                    src="/profile-icons/default icon.png"
                    alt="Profile Picture"
                    width={200}
                    height={200}
                    className={styles.Pfp}
                />

                <h2 className={styles.Username}>
                    Username
                </h2>
                <p className={styles.Bio}>
                    This is a biography. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <div className={styles.SettingsButton}>
                    <button onClick={() => setIsOpen(true)}>
                        Open Modal
                    </button>
                    <span className={styles.icon}>
                        <Image
                            src="/profile-icons/settings.png"
                            title="Settings"
                            alt="Settings"
                            width={45}
                            height={45}
                        />
                    </span>
                </div>

                {isOpen && (
                    <div>
                        <p>Modal content goes here</p>
                    </div>
                )}

            </div>
        </div>
    )
}