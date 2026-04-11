"use client"
import styles from "./MediaList.module.css"
import { useState } from "react"
import MediaCard from "./MediaCard";

export default function () {
    return (
        <div className={styles.main}>

            <div className={styles.header}>
                <h1>Completed Movies</h1>
            </div>
            <div className={styles.grid}>
                {/* 10 movies */}
                {/* <MediaCard title="A Knight of the Seven Kingdoms" imageUrl="https://image.tmdb.org/t/p/w500/k8yARbD9iYn2nRX2HvsopfKDN2r.jpg" epWatched="12/12" score="9.0"/>
                <MediaCard title="Better Call Saul" imageUrl="https://image.tmdb.org/t/p/w500/t15KHp3iNfHVQBNIaqUGW12xQA4.jpg" epWatched="12/63" score="9.0"/>
                <MediaCard title="Daredevil: Born Again" imageUrl="https://image.tmdb.org/t/p/w500/xDUoAsU8lQHOOoRkFiBuarmACDN.jpg" epWatched="3/8" score="9.0"/>
                <MediaCard title="House of the Dragon" imageUrl="https://image.tmdb.org/t/p/w500/7QMsOTMUswlwxJP0rTTZfmz2tX2.jpg" epWatched="18/26" score="9.0"/>
                <MediaCard title="Lanterns" imageUrl="https://image.tmdb.org/t/p/w500/wDj39IEGnmpfmOtmxPDbTPIRbRy.jpg" epWatched="0/8" score="9.0"/>
                <MediaCard title="Malcolm in the Middle: Life's Still Unfair" imageUrl="https://image.tmdb.org/t/p/w500/4uXAZRYtcMfoX2XtY1gcUxLHhjj.jpg" epWatched="0/4" score="9.0"/>
                <MediaCard title="Mickey 17" imageUrl="https://image.tmdb.org/t/p/w500/edKpE9B5qN3e559OuMCLZdW1iBZ.jpg" epWatched="" score=""/>
                <MediaCard title="Scarpetta" imageUrl="https://image.tmdb.org/t/p/w500/zvkcHCJUPqv7R9ukaiDNkm75jy.jpg" epWatched="7/8" score="9.0"/>
                <MediaCard title="Spider-Noir" imageUrl="https://image.tmdb.org/t/p/w500/cRAzL6mmdM6Q6UuQgc335UMgcfd.jpg" epWatched="0/8" score="9.0"/>
                <MediaCard title="The Pitt" imageUrl="https://image.tmdb.org/t/p/w500/kvFSpESyBZMjaeOJDx7RS3P1jey.jpg" epWatched="15/30" score="9.0"/>

             {/* 8 shows */}

                <MediaCard title="Oppenheimer" imageUrl="https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg" epWatched="" score="9.3" />
                <MediaCard title="Harry Potter and the Deathly Hallows: Part 2" imageUrl="https://image.tmdb.org/t/p/w500/c54HpQmuwXjHq2C9wmoACjxoom3.jpg" epWatched="" score="8.9" />
                <MediaCard title="Project Hail Mary" imageUrl="https://image.tmdb.org/t/p/w500/yihdXomYb5kTeSivtFndMy5iDmf.jpg" epWatched="" score="8.5" />
                <MediaCard title="Avatar: Fire and Ash" imageUrl="https://image.tmdb.org/t/p/w500/bRBeSHfGHwkEpImlhxPmOcUsaeg.jpg" epWatched="" score="8.1" />
                <MediaCard title="Sinners" imageUrl="https://image.tmdb.org/t/p/w500/705nQHqe4JGdEisrQmVYmXyjs1U.jpg" epWatched="" score="7.7" />
                <MediaCard title="Superman" imageUrl="https://image.tmdb.org/t/p/w500/ldyfo0BKmz5rWtJJKCvwaNS4cJT.jpg" epWatched="" score="7.5" />
                <MediaCard title="Speed Racer" imageUrl="https://image.tmdb.org/t/p/w500/fxRIpx9Op9h71q3tvuabx4GryyP.jpg" epWatched="" score="7.4" />
                <MediaCard title="Mickey 17" imageUrl="https://image.tmdb.org/t/p/w500/edKpE9B5qN3e559OuMCLZdW1iBZ.jpg" epWatched="" score="7.3" />
                <MediaCard title="Spider-Man: Far From Home" imageUrl="https://image.tmdb.org/t/p/w500/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg" epWatched="" score="7.1" />
                <MediaCard title="Zootopia 2" imageUrl="https://image.tmdb.org/t/p/w500/oJ7g2CifqpStmoYQyaLQgEU32qO.jpg" epWatched="" score="6.9" />
                <MediaCard title="Shark Tale" imageUrl="https://image.tmdb.org/t/p/w500/r08DpyPyhXcJTfNZAICNGMzcQ8l.jpg" epWatched="" score="6.8" />
                <MediaCard title="Marty Supreme" imageUrl="https://image.tmdb.org/t/p/w500/lYWEXbQgRTR4ZQleSXAgRbxAjvq.jpg" epWatched="" score="6.4" />
            </div>
            <div className={styles.header}>
                <h1>Plan to Watch</h1>
            </div>
            <div className={styles.grid}>
                <MediaCard title="Avengers: Doomsday" imageUrl="https://image.tmdb.org/t/p/w500/8HkIe2i4ScpCkcX9SzZ9IPasqWV.jpg" epWatched="" score="-" />
                <MediaCard title="Backrooms" imageUrl="https://image.tmdb.org/t/p/w500/sXrAzKMrExpggcwoEwcpn8NDm4k.jpg" epWatched="" score="-" />
                <MediaCard title="Dune: Part Three" imageUrl="https://image.tmdb.org/t/p/w500/b4wekkUaxExzOeGe7hKXzhnyXHt.jpg" epWatched="" score="-" />
                <MediaCard title="The Odyssey" imageUrl="https://image.tmdb.org/t/p/w500/pe5cCoX5iIb5IWKPsbPkCwjLFHt.jpg" epWatched="" score="-" />

            </div>
        </div>
    )
}