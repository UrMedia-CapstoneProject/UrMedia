import styles from "./TierView.module.css"
import { useState } from "react"
import MediaCard from "./MediaCard";

export default function () {
    return (
        <div className={styles.main}>
            <div className={styles.tier}>
                <div className={styles.grid}>
                    <label className={styles.text}>S</label>
                    <div className={styles.tierPoster}>
                        <MediaCard title="Oppenheimer" imageUrl="https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" epWatched="" score="9.3"/>
                    </div>
                </div>
            </div>
            <div className={styles.tier}>
                <div className={styles.grid}>
                    <label className={styles.text}>A</label>
                    <div className={styles.tierPoster}>
                        <MediaCard title="Harry Potter and the Deathly Hallows: Part 2" imageUrl="https://image.tmdb.org/t/p/w500/c54HpQmuwXjHq2C9wmoACjxoom3.jpg" epWatched="" score="8.9" />
                    </div>
                    <div className={styles.tierPoster}>
                        <MediaCard title="Project Hail Mary" imageUrl="https://image.tmdb.org/t/p/w500/yihdXomYb5kTeSivtFndMy5iDmf.jpg" epWatched="" score="8.5" />
                    </div>
                    <div className={styles.tierPoster}>
                        <MediaCard title="Avatar: Fire and Ash" imageUrl="https://image.tmdb.org/t/p/w500/bRBeSHfGHwkEpImlhxPmOcUsaeg.jpg" epWatched="" score="8.1" />
                    </div>
                    <div className={styles.tierPoster}>
                        <MediaCard title="Sinners" imageUrl="https://image.tmdb.org/t/p/w500/705nQHqe4JGdEisrQmVYmXyjs1U.jpg" epWatched="" score="7.7" />
                    </div>
                    <div className={styles.tierPoster}>
                        <MediaCard title="Superman" imageUrl="https://image.tmdb.org/t/p/w500/ldyfo0BKmz5rWtJJKCvwaNS4cJT.jpg" epWatched="" score="7.5" />
                    </div>
                    <div className={styles.tierPoster}>
                        <MediaCard title="Speed Racer" imageUrl="https://image.tmdb.org/t/p/w500/fxRIpx9Op9h71q3tvuabx4GryyP.jpg" epWatched="" score="7.4" />
                    </div>
                    <div className={styles.tierPoster}>
                        <MediaCard title="Mickey 17" imageUrl="https://image.tmdb.org/t/p/w500/edKpE9B5qN3e559OuMCLZdW1iBZ.jpg" epWatched="" score="7.3" />
                    </div>
                    <div className={styles.tierPoster}>
                        <MediaCard title="Spider-Man: Far From Home" imageUrl="https://image.tmdb.org/t/p/w500/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg" epWatched="" score="7.1" />
                    </div>
                </div>
            </div>
            <div className={styles.tier}>
                <div className={styles.grid}>
                    <label className={styles.text}>B</label>
                    <div className={styles.tierPoster}>
                        <MediaCard title="Zootopia 2" imageUrl="https://image.tmdb.org/t/p/w500/oJ7g2CifqpStmoYQyaLQgEU32qO.jpg" epWatched="" score="6.9" />
                    </div>
                    <div className={styles.tierPoster}>
                        <MediaCard title="Shark Tale" imageUrl="https://image.tmdb.org/t/p/w500/r08DpyPyhXcJTfNZAICNGMzcQ8l.jpg" epWatched="" score="6.8" />
                    </div>
                    <div className={styles.tierPoster}>
                        <MediaCard title="Marty Supreme" imageUrl="https://image.tmdb.org/t/p/w500/lYWEXbQgRTR4ZQleSXAgRbxAjvq.jpg" epWatched="" score="6.4" />
                    </div>
                </div>
            </div>
            <div className={styles.tier}>
                <div className={styles.grid}>
                    <label className={styles.text}>C</label>
                </div>
            </div>
            <div className={styles.tier}>
                <div className={styles.grid}>
                    <label className={styles.text}>D</label>
                </div>
            </div>
            <div className={styles.tier}>
                <div className={styles.grid}>
                    <label className={styles.text}>F</label>
                </div>
            </div>
        </div>
    )
}