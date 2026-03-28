import Image from "next/image"
import styles from "./Poster.module.css"

type PosterProps = {
  imageId: string;
};

export default function Poster({imageId}: PosterProps) {
    return(
        <div className={styles.poster}>
            <Image
                src={imageId}
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