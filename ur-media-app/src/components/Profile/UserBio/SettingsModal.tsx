import styles from "./SettingsModal.module.css"

type SettingsModalProps = {
  isSettingsOpen: boolean
  onClose: () => void
}

export default function SettingsModal({
    isSettingsOpen,
    onClose
    }: SettingsModalProps) {

    return (
        <div className={styles.main} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <p className={styles.option}>Change Username</p>
                <p className={styles.option}>Change User Biography</p>
                <p className={styles.option}>Change Profile Picture</p>
                <p className={styles.option}>Change Birthday</p>
                <p className={styles.option}>Sign Out</p>
                <p className={styles.option}>Delete Account</p>
            </div>
        </div>
    )
}