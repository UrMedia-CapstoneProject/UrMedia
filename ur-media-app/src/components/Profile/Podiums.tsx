import styles from "./Podiums.module.css"
import Image from "next/image"

const width: number = 67.5
const height: number = 100
const ribbon: number = 50

export default function() {
    return (
        <div className={styles.main}>


            <div className={styles.podium}>
                <div className={styles.media}>

                    <Image
                        src="/test-images/example-poster2.jpg"
                        alt="2nd Place"
                        width={width}
                        height={height}
                        className={styles.secondPlace}
                    />

                    <Image
                        src="/profile-icons/badge.png"
                        alt="2nd Place"
                        width={ribbon}
                        height={ribbon}
                        className={styles.secondRibbon}
                    />

                    <Image
                        src="/profile-icons/1st place icon.png"
                        alt="1st Place"
                        width={width}
                        height={height}
                    />

                    <Image
                        src="/profile-icons/badge.png"
                        alt="1st Place"
                        width={ribbon}
                        height={ribbon}
                        className={styles.firstRibbon}
                    />

                    <Image
                        src="/profile-icons/3rd place icon.png"
                        alt="3rd Place"
                        width={width}
                        height={height}
                        className={styles.thirdPlace}
                    />

                    <Image
                        src="/profile-icons/badge.png"
                        alt="3rd Place"
                        width={ribbon}
                        height={ribbon}
                        className={styles.thirdRibbon}
                    />
                </div>

                <div className={styles.podiumLabel}>
                    <p>Movies</p>
                </div>
            </div>




            <div className={styles.podium}>
                <div className={styles.media}>

                    <Image
                        src="/profile-icons/2nd place icon.png"
                        alt="2nd Place"
                        width={width}
                        height={height}
                        className={styles.secondPlace}
                    />

                    <Image
                        src="/profile-icons/badge.png"
                        alt="2nd Place"
                        width={ribbon}
                        height={ribbon}
                        className={styles.secondRibbon}
                    />

                    <Image
                        src="/profile-icons/1st place icon.png"
                        alt="1st Place"
                        width={width}
                        height={height}
                    />

                    <Image
                        src="/profile-icons/badge.png"
                        alt="1st Place"
                        width={ribbon}
                        height={ribbon}
                        className={styles.firstRibbon}
                    />

                    <Image
                        src="/profile-icons/3rd place icon.png"
                        alt="3rd Place"
                        width={width}
                        height={height}
                        className={styles.thirdPlace}
                    />

                    <Image
                        src="/profile-icons/badge.png"
                        alt="3rd Place"
                        width={ribbon}
                        height={ribbon}
                        className={styles.thirdRibbon}
                    />
                </div>

                <div className={styles.podiumLabel}>
                    <p>Shows</p>
                </div>
            </div>




            <div className={styles.podium}>
                <div className={styles.media}>

                    <Image
                        src="/profile-icons/2nd place icon.png"
                        alt="2nd Place"
                        width={width}
                        height={height}
                        className={styles.secondPlace}
                    />

                    <Image
                        src="/profile-icons/badge.png"
                        alt="2nd Place"
                        width={ribbon}
                        height={ribbon}
                        className={styles.secondRibbon}
                    />

                    <Image
                        src="/profile-icons/1st place icon.png"
                        alt="1st Place"
                        width={width}
                        height={height}
                    />

                    <Image
                        src="/profile-icons/badge.png"
                        alt="1st Place"
                        width={ribbon}
                        height={ribbon}
                        className={styles.firstRibbon}
                    />

                    <Image
                        src="/profile-icons/3rd place icon.png"
                        alt="3rd Place"
                        width={width}
                        height={height}
                        className={styles.thirdPlace}
                    />

                    <Image
                        src="/profile-icons/badge.png"
                        alt="3rd Place"
                        width={ribbon}
                        height={ribbon}
                        className={styles.thirdRibbon}
                    />
                </div>

                <div className={styles.podiumLabel}>
                    <p>Video Games</p>
                </div>
            </div>




            <div className={styles.podium}>
                <div className={styles.media}>

                    <Image
                        src="/profile-icons/2nd place icon.png"
                        alt="2nd Place"
                        width={width}
                        height={height}
                        className={styles.secondPlace}
                    />

                    <Image
                        src="/profile-icons/badge.png"
                        alt="2nd Place"
                        width={ribbon}
                        height={ribbon}
                        className={styles.secondRibbon}
                    />

                    <Image
                        src="/profile-icons/1st place icon.png"
                        alt="1st Place"
                        width={width}
                        height={height}
                    />

                    <Image
                        src="/profile-icons/badge.png"
                        alt="1st Place"
                        width={ribbon}
                        height={ribbon}
                        className={styles.firstRibbon}
                    />

                    <Image
                        src="/profile-icons/3rd place icon.png"
                        alt="3rd Place"
                        width={width}
                        height={height}
                        className={styles.thirdPlace}
                    />

                    <Image
                        src="/profile-icons/badge.png"
                        alt="3rd Place"
                        width={ribbon}
                        height={ribbon}
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