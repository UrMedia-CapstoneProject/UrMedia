import Image from "next/image"
import styles from "./MediaGrid.module.css"

export default function () {
    return (
        <div className={styles.posterGrid}>
            <div className={styles.poster}>
                <Image
                    src="/test-images/example-poster.png"
                    alt="Poster"
                    fill
                    style={{ objectFit: "cover" }}
                />
                <div className={styles.hoverInfo}>
                    <p>This is the hover text</p>
                </div>
            </div>
        </div>
    )
}