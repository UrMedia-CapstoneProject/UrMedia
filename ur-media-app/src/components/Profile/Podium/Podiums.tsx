import styles from "./Podiums.module.css"
import Image from "next/image"
import PodiumPoster from "./PodiumPoster";

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
                        <PodiumPoster
                        title="The Dark Knight" 
                        imageUrl="https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg"/>
                    </div>

                    <Image
                        src="/profile-icons/silver ribbon.png"
                        alt="2nd Place"
                        width={ribbonWidth}
                        height={ribbonHeight}
                        className={styles.secondRibbon}
                    />

                    <div className={styles.firstPlace}>
                        <PodiumPoster
                        title="Interstellar"
                        imageUrl="https://image.tmdb.org/t/p/w500/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg" />
                    </div>

                    <Image
                        src="/profile-icons/gold ribbon.png"
                        alt="1st Place"
                        width={ribbonWidth}
                        height={ribbonHeight}
                        className={styles.firstRibbon}
                    />

                    <div className={styles.thirdPlace}>
                        <PodiumPoster
                        title="Your Name"
                        imageUrl="https://myanimelist.net/images/anime/5/87048l.webp" />
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
                        <PodiumPoster
                        title="Fullmetal Alchemist: Brotherhood"
                        imageUrl="https://myanimelist.net/images/anime/1208/94745l.webp" />
                    </div>

                    <Image
                        src="/profile-icons/silver ribbon.png"
                        alt="2nd Place"
                        width={ribbonWidth}
                        height={ribbonHeight}
                        className={styles.secondRibbon}
                    />

                    <div className={styles.firstPlace}>
                        <PodiumPoster
                        title="Chernobyl"
                        imageUrl="https://image.tmdb.org/t/p/w500/AmJLuHjxPdIJO6vmymeWADG6jK5.jpg" />
                    </div>

                    <Image
                        src="/profile-icons/gold ribbon.png"
                        alt="1st Place"
                        width={ribbonWidth}
                        height={ribbonHeight}
                        className={styles.firstRibbon}
                    />

                    <div className={styles.thirdPlace}>
                        <PodiumPoster
                        title="A Knight of the Seven Kingdoms"
                        imageUrl="https://image.tmdb.org/t/p/w500/k8yARbD9iYn2nRX2HvsopfKDN2r.jpg" />
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
                        <PodiumPoster
                        title="Red Dead Redemption 2"
                        imageUrl="https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg" />
                    </div>

                    <Image
                        src="/profile-icons/silver ribbon.png"
                        alt="2nd Place"
                        width={ribbonWidth}
                        height={ribbonHeight}
                        className={styles.secondRibbon}
                    />

                    <div className={styles.firstPlace}>
                        <PodiumPoster
                        title="Minecraft"
                        imageUrl="https://media.rawg.io/media/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg" />
                    </div>

                    <Image
                        src="/profile-icons/gold ribbon.png"
                        alt="1st Place"
                        width={ribbonWidth}
                        height={ribbonHeight}
                        className={styles.firstRibbon}
                    />

                    <div className={styles.thirdPlace}>
                        <PodiumPoster
                        title="Dark Souls III"
                        imageUrl="https://media.rawg.io/media/games/da1/da1b267764d77221f07a4386b6548e5a.jpg" />
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
                        <PodiumPoster
                        title="The Hunger Games (Hunger Games, Book One)"
                        imageUrl="/test-images/hunger games.jpg" />
                    </div>

                    <Image
                        src="/profile-icons/silver ribbon.png"
                        alt="2nd Place"
                        width={ribbonWidth}
                        height={ribbonHeight}
                        className={styles.secondRibbon}
                    />

                    <div className={styles.firstPlace}>
                        <PodiumPoster
                        title="The Lord of the Rings"
                        imageUrl="/test-images/lord of the rings.jpg" />
                    </div>

                    <Image
                        src="/profile-icons/gold ribbon.png"
                        alt="1st Place"
                        width={ribbonWidth}
                        height={ribbonHeight}
                        className={styles.firstRibbon}
                    />

                    <div className={styles.thirdPlace}>
                        <PodiumPoster
                        title="How to Win Friends and Influence People"
                        imageUrl="/test-images/how to win friends and influence people.jpg" />
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