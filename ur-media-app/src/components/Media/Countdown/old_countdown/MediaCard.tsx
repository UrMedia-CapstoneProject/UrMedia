import Poster from "@/components/Global/Poster";
import styles from "./MediaCard.module.css"

export default function MediaCard(){
    return(
        <div className={styles.main}>
            <div className={styles.poster}>
                <Poster title={"The Odyssey"} imageUrl={"/test-images/the-odyssey.jpg"} hoverEnabled={false}/>
            </div>
            <div className={styles.info}>
                <div className={styles.title}>
                    <h2>The Odyssey</h2>
                </div>
                <div className={styles.countdown}>
                    <p>3 Months, 13 Days</p>
                </div>
            </div>
        </div>
    )
}