import Image from "next/image"
import styles from "./Poster.module.css"

type PosterProps = {
    title: string
    imageURL: string
    onClick?: () => void
}

export default function Poster({ title, imageURL, onClick }: PosterProps) {
    return(
        <div className={styles.poster} onClick={onClick}>
            <Image
                src={imageURL} //"/test-images/example-poster2.jpg". load only test image from folder, load the image from api later on
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