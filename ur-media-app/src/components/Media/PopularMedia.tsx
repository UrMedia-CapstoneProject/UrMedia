import styles from "./PopularMedia.module.css"
import Image from "next/image"
import MediaGrid from "./MediaGrid"

export default function PopularMedia() {
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