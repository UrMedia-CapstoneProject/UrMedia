import Poster from "@/components/Global/Poster";
import styles from "./MediaCard.module.css"

export default function MediaCard(){
    return(
        <div className={styles.main}>
            <div className={styles.poster}>
                <Poster title = {"Interstellar"} imageUrl = {"/test-images/example-poster2.jpg"}/>
            </div>
            <div className={styles.info}>
                <div className={styles.title}>
                    <h2>Name of movie</h2>
                </div>
                <div className={styles.countdown}>
                    <p>Countdown to movie</p>
                </div>
            </div>
        </div>
    )
}