import Poster from "@/components/Global/Poster";
import styles from "./UpdateCard.module.css"
import { FriendTrackedMedia } from "@/types/types";
import { CountdownTitleAndUrl } from "@/services/media/countdown/getCountdownTitleAndPosterUrl";

export default function MediaCard({ updateInfo, mediaInfo }: { updateInfo: FriendTrackedMedia, mediaInfo: CountdownTitleAndUrl }){
    return(
        <div className={styles.main}>
            <div className={styles.poster}>
                <Poster title={mediaInfo.title} imageUrl={mediaInfo.imageUrl} hoverEnabled={true}/>
            </div>
            <div className={styles.info}>
                <div className={styles.title}>
                    <h3>{updateInfo.username}</h3>
                </div>
                <p>Status Update: {updateInfo.status}</p>
                <p>Progress: {updateInfo.quantityConsumed}</p>
                <p>Rating: {updateInfo.rating}</p>
            </div>
        </div>
    )
}