import styles from "./Podiums.module.css"
import Image from "next/image"
import PodiumPoster from "./PodiumPoster";
import { PodiumItem } from "@/services/podium/getPodiums";

const ribbonHeight: number = 45
const ribbonWidth: number = 30

type PodiumProps = {
    podiums: PodiumItem[];
}

function PodiumSlot({ item }: { item?: PodiumItem }) {
    if (!item?.posterUrl) {
        return <div className="podium-empty" />;
    }

    return <PodiumPoster imageUrl={item.posterUrl} />;
}

export default function Podiums({ podiums }: PodiumProps) {

    //this is vibecoded bro i have no fricking clue how this code works like why tf are there 4 arrow signs
    const podiumMap = (podiums).reduce<Record<string, Partial<Record<number, PodiumItem>>>>(
        (acc, item) => {
            if (!acc[item.podiumGroup]) {
                acc[item.podiumGroup] = {};
            }

            acc[item.podiumGroup][item.placement] = item;
            return acc;
        },
        {}
    );

    const getSlot = (group: string, placement: 1 | 2 | 3) => {
        return podiumMap[group]?.[placement];
    };

    return (
        <div className={styles.main}>

            <div className={styles.podiumWrapper}>

                <div className={styles.podium}>
                    <div className={styles.media}>

                        <div className={styles.secondPlace}>
                            <PodiumSlot item={getSlot("movies", 2)} />
                        </div>

                        <Image
                            src="/profile-icons/silver ribbon.png"
                            alt="2nd Place"
                            width={ribbonWidth}
                            height={ribbonHeight}
                            className={styles.secondRibbon}
                        />

                        <div className={styles.firstPlace}>
                            <PodiumSlot item={getSlot("movies", 1)} />
                        </div>

                        <Image
                            src="/profile-icons/gold ribbon.png"
                            alt="1st Place"
                            width={ribbonWidth}
                            height={ribbonHeight}
                            className={styles.firstRibbon}
                        />

                        <div className={styles.thirdPlace}>
                            <PodiumSlot item={getSlot("movies", 3)} />
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
            </div>



            <div className={styles.podiumWrapper}>
                <div className={styles.podium}>
                    <div className={styles.media}>

                        <div className={styles.secondPlace}>
                            <PodiumSlot item={getSlot("shows", 2)} />
                        </div>

                        <Image
                            src="/profile-icons/silver ribbon.png"
                            alt="2nd Place"
                            width={ribbonWidth}
                            height={ribbonHeight}
                            className={styles.secondRibbon}
                        />

                        <div className={styles.firstPlace}>
                            <PodiumSlot item={getSlot("shows", 1)} />
                        </div>

                        <Image
                            src="/profile-icons/gold ribbon.png"
                            alt="1st Place"
                            width={ribbonWidth}
                            height={ribbonHeight}
                            className={styles.firstRibbon}
                        />

                        <div className={styles.thirdPlace}>
                            <PodiumSlot item={getSlot("shows", 3)} />
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
            </div>


            <div className={styles.podiumWrapper}>
                <div className={styles.podium}>
                    <div className={styles.media}>

                        <div className={styles.secondPlace}>
                            <PodiumSlot item={getSlot("games", 2)} />
                        </div>

                        <Image
                            src="/profile-icons/silver ribbon.png"
                            alt="2nd Place"
                            width={ribbonWidth}
                            height={ribbonHeight}
                            className={styles.secondRibbon}
                        />

                        <div className={styles.firstPlace}>
                            <PodiumSlot item={getSlot("games", 1)} />
                        </div>

                        <Image
                            src="/profile-icons/gold ribbon.png"
                            alt="1st Place"
                            width={ribbonWidth}
                            height={ribbonHeight}
                            className={styles.firstRibbon}
                        />

                        <div className={styles.thirdPlace}>
                            <PodiumSlot item={getSlot("games", 3)} />
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
            </div>


            <div className={styles.podiumWrapper}>
                <div className={styles.podium}>
                    <div className={styles.media}>

                        <div className={styles.secondPlace}>
                            <PodiumPoster
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

        </div>
    )
}