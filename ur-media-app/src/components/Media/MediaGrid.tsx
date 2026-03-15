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
            </div>
        </div>
    )
}