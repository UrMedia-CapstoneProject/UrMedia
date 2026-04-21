import Image from "next/image"
import styles from "./Poster.module.css"
import { PosterProps } from "@/types/types"

export default function Poster({ title, imageUrl, onClick, hoverEnabled = true }: PosterProps) {
    return(
        <div className={`${styles.poster} ${hoverEnabled ? styles.withHover : ''}`} onClick={onClick}>
            <Image
                src={imageUrl}
                alt={title}
                fill
                style={{ objectFit: "cover" }}
            />
            <div className={styles.hoverInfo}>
                <p>{title}</p>
            </div>
        </div>
    )
}