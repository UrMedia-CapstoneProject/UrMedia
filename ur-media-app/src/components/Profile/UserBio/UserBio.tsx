"use client"
import { useEffect, useState } from "react"
import styles from "./UserBio.module.css"
import Image from "next/image"
import SettingsModal from "./SettingsModal"

export default function () {

    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")
    const [birthday, setBirthday] = useState("")

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("")

    function openSettingsModal() {
        setIsSettingsOpen(true)
    }

    function closeSettingsModal() {
        setIsSettingsOpen(false)
    }

    const loadUserSettings = async () => {
        try {
            const response = await fetch(
                `/api/user/`,
            );

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.error || "Failed to load tracked data.");
                return;
            }
            console.log(data);

            setUsername(data.username ?? "")
            setBirthday(data.birthday ?? "")
            setBio(data.biography ?? "")

        } catch (error) {
            console.error("Failed to laod the user tracked data", error);
            setErrorMessage("Failed to load the user tracked data.");
        }
    }

    useEffect(() => {
        loadUserSettings();
    }, []);

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

                    <div className={styles.username}>{username}</div>
                </div>

                <div className={styles.bio}>{bio}</div>

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