import styles from "./MediaGrid.module.css"
import Poster from "../Global/Poster"

export default function () {
    return (
        <div className={styles.posterGrid}>
            <div>
                <Poster imageId={"/test-images/example-poster.png"}/>
            </div>
        </div>
    )
}