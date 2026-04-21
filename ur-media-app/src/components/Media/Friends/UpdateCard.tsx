import Poster from "@/components/Global/Poster";
import styles from "./UpdateCard.module.css"

export default function MediaCard(){
    return(
        <div className={styles.main}>
            <div className={styles.poster}>
                <Poster title = {"The Odyssey"} imageUrl = {"/test-images/the-odyssey.jpg"} hoverEnabled={true}/>
            </div>
            <div className={styles.info}>
                <div className={styles.title}>
                    <h3>Joimes</h3>
                </div>
                <p>Plans to watch The Odyssey</p>
            </div>
        </div>
    )
}