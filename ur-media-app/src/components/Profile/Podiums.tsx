import styles from "./Podiums.module.css"
import Image from "next/image"
import PodiumPoster from "@/components/Profile/PodiumPoster";

const width: number = 67.5
const height: number = 100
const ribbonHeight: number = 45
const ribbonWidth: number = 30

export default function() {
    return (
        <div className={styles.main}>


            <div className={styles.podium}>
                <div className={styles.media}>

                    <div className={styles.secondPlace}>
                        <PodiumPoster />
                    </div>

                    <Image
                        src="/profile-icons/silver ribbon.png"
                        alt="2nd Place"
                        width={ribbonWidth}
                        height={ribbonHeight}
                        className={styles.secondRibbon}
                    />

                    <div className={styles.firstPlace}>
                        <PodiumPoster />
                    </div>

                    <Image
                        src="/profile-icons/gold ribbon.png"
                        alt="1st Place"
                        width={ribbonWidth}
                        height={ribbonHeight}
                        className={styles.firstRibbon}
                    />

                    <div className={styles.thirdPlace}>
                        <PodiumPoster />
                    </div>

                    <Image
                        src="/profile-icons/bronze ribbon.png"
                        alt="3rd Place"
                        width={ribbonWidth}
                        height={ribbonHeight}
                        className={styles.thirdRibbon}
                    />
                </div>

                <div className={styles.podiumLabel}>
                    <p>Movies</p>
                </div>
            </div>




            <div className={styles.podium}>
                <div className={styles.media}>

                    <div className={styles.secondPlace}>
                        <PodiumPoster />
                    </div>

                    <Image
                        src="/profile-icons/silver ribbon.png"
                        alt="2nd Place"
                        width={ribbonWidth}
                        height={ribbonHeight}
                        className={styles.secondRibbon}
                    />

                    <div className={styles.firstPlace}>
                        <PodiumPoster />
                    </div>

                    <Image
                        src="/profile-icons/gold ribbon.png"
                        alt="1st Place"
                        width={ribbonWidth}
                        height={ribbonHeight}
                        className={styles.firstRibbon}
                    />

                    <div className={styles.thirdPlace}>
                        <PodiumPoster />
                    </div>

                    <Image
                        src="/profile-icons/bronze ribbon.png"
                        alt="3rd Place"
                        width={ribbonWidth}
                        height={ribbonHeight}
                        className={styles.thirdRibbon}
                    />
                </div>

                <div className={styles.podiumLabel}>
                    <p>Shows</p>
                </div>
            </div>




            <div className={styles.podium}>
                <div className={styles.media}>

                    <div className={styles.secondPlace}>
                        <PodiumPoster />
                    </div>

                    <Image
                        src="/profile-icons/silver ribbon.png"
                        alt="2nd Place"
                        width={ribbonWidth}
                        height={ribbonHeight}
                        className={styles.secondRibbon}
                    />

                    <div className={styles.firstPlace}>
                        <PodiumPoster />
                    </div>

                    <Image
                        src="/profile-icons/gold ribbon.png"
                        alt="1st Place"
                        width={ribbonWidth}
                        height={ribbonHeight}
                        className={styles.firstRibbon}
                    />

                    <div className={styles.thirdPlace}>
                        <PodiumPoster />
                    </div>

                    <Image
                        src="/profile-icons/bronze ribbon.png"
                        alt="3rd Place"
                        width={ribbonWidth}
                        height={ribbonHeight}
                        className={styles.thirdRibbon}
                    />
                </div>

                <div className={styles.podiumLabel}>
                    <p>Video Games</p>
                </div>
            </div>




            <div className={styles.podium}>
                <div className={styles.media}>

                    <div className={styles.secondPlace}>
                        <PodiumPoster />
                    </div>

                    <Image
                        src="/profile-icons/silver ribbon.png"
                        alt="2nd Place"
                        width={ribbonWidth}
                        height={ribbonHeight}
                        className={styles.secondRibbon}
                    />

                    <div className={styles.firstPlace}>
                        <PodiumPoster />
                    </div>

                    <Image
                        src="/profile-icons/gold ribbon.png"
                        alt="1st Place"
                        width={ribbonWidth}
                        height={ribbonHeight}
                        className={styles.firstRibbon}
                    />

                    <div className={styles.thirdPlace}>
                        <PodiumPoster />
                    </div>

                    <Image
                        src="/profile-icons/bronze ribbon.png"
                        alt="3rd Place"
                        width={ribbonWidth}
                        height={ribbonHeight}
                        className={styles.thirdRibbon}
                    />
                </div>

                <div className={styles.podiumLabel}>
                    <p>Books</p>
                </div>
            </div>


        </div>
    )
}