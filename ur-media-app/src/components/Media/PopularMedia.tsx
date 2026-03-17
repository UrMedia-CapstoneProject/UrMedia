"useClient"
import { useState } from "react"
import styles from "./PopularMedia.module.css"
import MediaGrid from "./MediaGrid"
import EditModal from "../Profile/EditModal"

export default function PopularMedia() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return(
        <div className={styles.main}>
            <div>
                <h2 className={styles.sectionHeader}>Popular Movies</h2>
                <MediaGrid />
            </div>
            <div>
                <h2 className={styles.sectionHeader}>Popular Shows</h2>
                <MediaGrid />
            </div>
            <div>
                <h2 className={styles.sectionHeader}>Popular Games</h2>
                <MediaGrid />
            </div>
            <div>
                <h2 className={styles.sectionHeader}>Popular Books</h2>
                <MediaGrid />
            </div>
        </div>
    )
}