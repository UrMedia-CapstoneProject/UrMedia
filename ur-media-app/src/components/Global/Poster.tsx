import Image from "next/image"
import styles from "./Poster.module.css"
import { PosterProps } from "@/types/types"

// type PosterProps = {
//     title: string
//     imageURL: string
//     onClick?: () => void
// }

export default function Poster({ title, imageUrl, onClick }: PosterProps) {
    return(
        <div className={styles.poster} onClick={onClick}>
            <Image
                src={imageUrl} //"/test-images/example-poster2.jpg". load only test image from folder, load the image from api later on
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