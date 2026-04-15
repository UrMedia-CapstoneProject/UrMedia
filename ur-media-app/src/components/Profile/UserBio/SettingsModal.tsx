"use client"
import { useEffect, useState } from "react"
import SignOutButton from "@/components/Global/SignOutButton"
import styles from "./SettingsModal.module.css"
import Image from "next/image"

type SettingsModalProps = {
  onClose: () => void
}

export default function SettingsModal({
    onClose
    }: SettingsModalProps) {

    const [username, setUsername] = useState("")
    const [bio, setBio] = useState("")
    const [birthday, setBirthday] = useState("")

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const validateForm = () => {

        if (username != "" && username.length <= 16) {
            setUsername(username)
        }
        else {return "Username must be 1-16 characters long"}

        if (bio.length <= 500) {
            setBio(bio)
        }
        else {return "Biography must be 500 characters or less"}

        setBirthday(birthday)
    }

    const handleCancel = () => { onClose() }
    const handleSave = async () => {
        if (!isLoggedIn) {return}

        const validationError = validateForm()

        if (validationError) {
            setErrorMessage(validationError)
            setSuccessMessage("")
            return
        }

        setErrorMessage("")
        setSuccessMessage("")

        const payload = {
            username: username,
            birthday: birthday || null,
            bio: bio || null
        }

        console.log("Save Changes payload:", payload)
        
        await fetch("/api/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        });

        setSuccessMessage("Changes Saved")
    }

    return (

        <div className={styles.main} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.settingsItem}>
                    <label className={styles.top}>Profile Picture:</label>

                    <Image
                        src="/profile-icons/default icon.png"
                        alt="Profile Picture"
                        width={280}
                        height={280}
                    />

                    <input type="file" id="filePicker" hidden />
                    <label htmlFor="filePicker" className={styles.filePicker}>Choose File</label>
                </div>

                <div>
                    <div className={styles.settingsItem}>
                        <label className={styles.top}>Username:</label>

                        <input
                            type="string"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="New Username"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.settingsItem}>
                        <label className={styles.option}>Birthday:</label>

                        <input
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            placeholder="mm/dd/yyyy"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.settingsItem}>
                    <label className={styles.option}>User Biography:</label>

                    <textarea
                        rows={10}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself..."
                        className={styles.textarea}
                    />
                    </div>
                </div>

                <div className={styles.exitOptions}>
                    <div className={styles.signout}><SignOutButton /></div>
                    <div className={styles.deleteAccount}>Delete Account</div>
                </div>

                <div className={styles.saveAndCancel}>
                    <button className={styles.cancelButton} onClick={() => handleCancel()}>Cancel</button>
                    <button className={styles.saveButton} onClick={() => handleSave()}>Save</button>
                </div>
            </div>
        </div>
    )
}