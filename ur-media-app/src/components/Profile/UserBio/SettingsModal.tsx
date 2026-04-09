import SignOutButton from "@/components/Media/SignOutButton"
import styles from "./SettingsModal.module.css"
import Image from "next/image"

type SettingsModalProps = {
  isSettingsOpen: boolean
  onClose: () => void
}

export default function SettingsModal({
    isSettingsOpen,
    onClose
    }: SettingsModalProps) {

    const handleUsernameChange = (value: string) => {}
    const handleBioChange = (value: string) => {}
    const setBirthday = (value: string) => {}
    const handleSave = () => {}
    const handleCancel = () => {}

    return (

        <div className={styles.main} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.settingsItem}>
                    <Image
                        src="/profile-icons/default icon.png"
                        alt="Profile Picture"
                        width={200}
                        height={200}
                    />
                    <label className={styles.option}>Change Profile Picture:</label>

                    <input type="file" id="filePicker" hidden />
                    <label htmlFor="filePicker" className={styles.filePicker}>Choose File</label>
                </div>

                <div className={styles.settingsItem}>
                    <label className={styles.option}>Change User Biography:</label>

                    <textarea
                        rows={10}
                        onChange={(e) => handleBioChange(e.target.value)}
                        placeholder="Tell us about yourself..."
                        className={styles.textarea}
                    />
                </div>

                <div className={styles.settingsItem}>
                    <label className={styles.option}>Change Username:</label>

                    <input
                        type="string"
                        onChange={(e) => handleUsernameChange(e.target.value)}
                        placeholder="New Username"
                        className={styles.input}
                    />
                </div>

                <div className={styles.settingsItem}>
                    <label className={styles.option}>Change Birthday:</label>

                    <input
                        type="date"
                        onChange={(e) => setBirthday(e.target.value)}
                        placeholder="mm/dd/yyyy"
                        className={styles.input}
                    />
                </div>

                <div className={styles.exitOptions}>
                    <SignOutButton />
                    <label className={styles.deleteAccount}>Delete Account</label>
                </div>

                <div className={styles.saveAndCancel}>
                    <button className={styles.cancelButton} onClick={() => handleCancel()}>Cancel</button>
                    <button className={styles.saveButton} onClick={() => handleSave()}>Save</button>
                </div>
            </div>
        </div>
    )
}