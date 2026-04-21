"use client"
import { useEffect, useState } from "react"
import SignOutButton from "@/components/Global/SignOutButton"
import styles from "./SettingsModal.module.css"
import Image from "next/image"
import { UserBioProps } from "./UserBio"
import { useRouter } from "next/navigation";

type SettingsModalProps = {
    onClose: () => void;
    settings: UserBioProps;
}

export default function SettingsModal({
    onClose,
    settings
}: SettingsModalProps) {

    const [username, setUsername] = useState(settings.username || "")
    const [bio, setBio] = useState(settings.biography || "")
    const [birthday, setBirthday] = useState(settings.birthday || "")
    const [avatarURL, setAvatarURL] = useState<string>(settings.avatarUrl || "/profile-icons/default icon.png");
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [showAlert, setShowAlert] = useState(false);
    
    const router = useRouter();

    useEffect(() => {
        if (settings.avatarUrl) {
            setAvatarURL(`${settings.avatarUrl}?v=${Date.now()}`);
        } else {
            setAvatarURL("/profile-icons/default icon.png");
        }
    }, [settings.avatarUrl]);

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl)
            }
        }
    }, [previewUrl])

    const validateForm = () => {
        if (username === "" || username.length > 16) {
            return "Username must be 1-16 characters long"
        }

        if (bio) {
            if (bio.length > 500) {
                return "Biography must be 500 characters or less"
            }
        }

        return null
    }

    const handleCancel = () => { onClose() }

    const showWarningAlert = () => {
        setShowAlert(true)
    }

    const handleSave = async () => {
        const validationError = validateForm()

        if (validationError) {
            setErrorMessage(validationError)
            setSuccessMessage("")
            return
        }

        setErrorMessage("")
        setSuccessMessage("")

        const formData = new FormData();

        formData.append("username", username);
        formData.append("birthday", birthday || "");
        formData.append("bio", bio || "");

        if (selectedFile) {
            formData.append("avatar", selectedFile);
        }

        await fetch("/api/user", {
            method: "POST",
            body: formData,
        });

        setSuccessMessage("Changes Saved")
        router.refresh();
        onClose()
    }

    useEffect(() => {
        // lock scroll
        document.body.style.overflow = "hidden"

        return () => {
            // unlock scroll when modal closes
            document.body.style.overflow = "auto"
        }
    }, [])

    return (

        <div className={styles.main} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.settingsItem}>
                    <label className={styles.top}>Profile Picture:</label>

                    <Image
                        src={previewUrl || avatarURL || "/profile-icons/default icon.png"}
                        alt="Profile Picture"
                        width={280}
                        height={280}
                        className={styles.avatarPreview}
                    />

                    <input type="file" id="filePicker" hidden
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setSelectedFile(file);

                                const preview = URL.createObjectURL(file);
                                setPreviewUrl(preview);
                            }
                        }}
                    />
                    <label htmlFor="filePicker" className={styles.filePicker}>Choose File</label>
                </div>

                <div>
                    <div className={styles.settingsItem}>
                        <label className={styles.top}>Username:</label>

                        <input
                            type="text"
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
                    <div className={styles.deleteAccount} onClick={() => showWarningAlert()}>Delete Account</div>
                </div>

                <div className={styles.saveAndCancel}>
                    <button className={styles.cancelButton} onClick={() => handleCancel()}>Cancel</button>
                    <button className={styles.saveButton} onClick={() => handleSave()}>Save</button>
                </div>
            </div>

            {showAlert && (
                <div className={styles.main} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.alert}>
                        <label className={styles.text}>
                            Are you sure you want to delete your account?
                            This action is permanent.
                        </label>
                        <div className={styles.yesNoButtonLayout}>
                            <button className={styles.noButton} onClick={() => setShowAlert(false)}>Nevermind</button>
                            <button className={styles.yesButton} onClick={() => setShowAlert(false)}>Yes, I'm sure</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}