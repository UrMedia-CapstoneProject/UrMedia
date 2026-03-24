import Image from "next/image"
import styles from "./Poster.module.css"

export default function() {
    return(
        <div className={styles.poster}>
            <Image
                src="/test-images/example-poster2.jpg"
                alt="Poster"
                fill
                style={{ objectFit: "cover" }}
            />
            <div className={styles.hoverInfo}>
                <p>This is the hover text</p>
            </div>
        </div>
    )
}