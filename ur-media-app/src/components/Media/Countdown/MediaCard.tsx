import Poster from "@/components/Global/Poster";
import styles from "./MediaCard.module.css"

export default function MediaCard(){
    return(
        <div className={styles.main}>
            <div className={styles.poster}>
                <Poster imageId = {"/test-images/example-poster2.jpg"}/>
            </div>
        </div>
    )
}