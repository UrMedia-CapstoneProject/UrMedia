import styles from "./Podiums.module.css"
import Image from "next/image"

export default function() {
    return (
        <div className={styles.main}>


            <div className={styles.podium}>
                <div className={styles.media}>

                    <Image
                        src="/profile-icons/2nd place icon.png"
                        alt="2nd Place"
                        width={75}
                        height={100}
                        className={styles.secondPlace}
                    />

                    <Image
                        src="/profile-icons/badge.png"
                        alt="2nd Place"
                        width={50}
                        height={50}
                        className={styles.secondRibbon}
                    />

                    <Image
                        src="/profile-icons/1st place icon.png"
                        alt="1st Place"
                        width={75}
                        height={100}
                    />

                    <Image
                        src="/profile-icons/badge.png"
                        alt="1st Place"
                        width={50}
                        height={50}
                        className={styles.firstRibbon}
                    />

                    <Image
                        src="/profile-icons/3rd place icon.png"
                        alt="3rd Place"
                        width={75}
                        height={100}
                        className={styles.thirdPlace}
                    />

                    <Image
                        src="/profile-icons/badge.png"
                        alt="3rd Place"
                        width={50}
                        height={50}
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
                        width={75}
                        height={100}
                        className={styles.secondPlace}
                    />

                    <Image
                        src="/profile-icons/1st place icon.png"
                        alt="1st Place"
                        width={75}
                        height={100}
                    />

                    <Image
                        src="/profile-icons/3rd place icon.png"
                        alt="3rd Place"
                        width={75}
                        height={100}
                        className={styles.thirdPlace}
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
                        width={75}
                        height={100}
                        className={styles.secondPlace}
                    />

                    <Image
                        src="/profile-icons/1st place icon.png"
                        alt="1st Place"
                        width={75}
                        height={100}
                    />

                    <Image
                        src="/profile-icons/3rd place icon.png"
                        alt="3rd Place"
                        width={75}
                        height={100}
                        className={styles.thirdPlace}
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
                        width={75}
                        height={100}
                        className={styles.secondPlace}
                    />

                    <Image
                        src="/profile-icons/1st place icon.png"
                        alt="1st Place"
                        width={75}
                        height={100}
                    />

                    <Image
                        src="/profile-icons/3rd place icon.png"
                        alt="3rd Place"
                        width={75}
                        height={100}
                        className={styles.thirdPlace}
                    />
                </div>

                <div className={styles.podiumLabel}>
                    <p>Books</p>
                </div>
            </div>


        </div>
    )
}