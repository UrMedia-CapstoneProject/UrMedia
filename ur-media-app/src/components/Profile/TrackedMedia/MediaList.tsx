"use client"
import styles from "./MediaList.module.css"
import { useState } from "react"
import MediaCard from "./MediaCard";

export default function() {
    return (
        <div className={styles.main}>
            {/* 10 movies */}
            <MediaCard title="A Knight of the Seven Kingdoms" imageUrl="https://image.tmdb.org/t/p/w500/k8yARbD9iYn2nRX2HvsopfKDN2r.jpg" epWatched="12/12" score="9.0"/>
            <MediaCard title="Better Call Saul" imageUrl="https://image.tmdb.org/t/p/w500/t15KHp3iNfHVQBNIaqUGW12xQA4.jpg" epWatched="12/63" score="9.0"/>
            <MediaCard title="Daredevil: Born Again" imageUrl="https://image.tmdb.org/t/p/w500/xDUoAsU8lQHOOoRkFiBuarmACDN.jpg" epWatched="3/8" score="9.0"/>
            <MediaCard title="House of the Dragon" imageUrl="https://image.tmdb.org/t/p/w500/7QMsOTMUswlwxJP0rTTZfmz2tX2.jpg" epWatched="18/26" score="9.0"/>
            <MediaCard title="Lanterns" imageUrl="https://image.tmdb.org/t/p/w500/wDj39IEGnmpfmOtmxPDbTPIRbRy.jpg" epWatched="0/8" score="9.0"/>
            <MediaCard title="Malcolm in the Middle: Life's Still Unfair" imageUrl="https://image.tmdb.org/t/p/w500/4uXAZRYtcMfoX2XtY1gcUxLHhjj.jpg" epWatched="0/4" score="9.0"/>
            <MediaCard title="Mickey 17" imageUrl="https://image.tmdb.org/t/p/w500/edKpE9B5qN3e559OuMCLZdW1iBZ.jpg" epWatched="" score=""/>
            <MediaCard title="Scarpetta" imageUrl="https://image.tmdb.org/t/p/w500/zvkcHCJUPqv7R9ukaiDNkm75jy.jpg" epWatched="7/8" score="9.0"/>
            <MediaCard title="Spider-Noir" imageUrl="https://image.tmdb.org/t/p/w500/cRAzL6mmdM6Q6UuQgc335UMgcfd.jpg" epWatched="0/8" score="9.0"/>
            <MediaCard title="The Pitt" imageUrl="https://image.tmdb.org/t/p/w500/kvFSpESyBZMjaeOJDx7RS3P1jey.jpg" epWatched="15/30" score="9.0"/>
            <br /><br />

            <p>Movies (if you want to display movies instead)</p>
            {/* 8 shows */}
            <MediaCard title="Avatar: Fire and Ash" imageUrl="https://image.tmdb.org/t/p/w500/bRBeSHfGHwkEpImlhxPmOcUsaeg.jpg" epWatched="15/30" score="9.0"/>
            <MediaCard title="Avengers: Doomsday" imageUrl="https://image.tmdb.org/t/p/w500/yQvGrMoipbRoddT0ZR8tPoR7NfX.jpg" epWatched="" score=""/>
            <MediaCard title="Backrooms" imageUrl="https://image.tmdb.org/t/p/w500/sXrAzKMrExpggcwoEwcpn8NDm4k.jpg" epWatched="" score=""/>
            <MediaCard title="Dune: Part Three" imageUrl="https://image.tmdb.org/t/p/w500/b4wekkUaxExzOeGe7hKXzhnyXHt.jpg" epWatched="" score=""/>
            <MediaCard title="Marty Supreme" imageUrl="https://image.tmdb.org/t/p/w500/lYWEXbQgRTR4ZQleSXAgRbxAjvq.jpg" epWatched="" score=""/>
            <MediaCard title="Sinners" imageUrl="https://image.tmdb.org/t/p/w500/705nQHqe4JGdEisrQmVYmXyjs1U.jpg" epWatched="" score=""/>
            <MediaCard title="The Odyssey" imageUrl="https://image.tmdb.org/t/p/w500/pe5cCoX5iIb5IWKPsbPkCwjLFHt.jpg" epWatched="" score=""/>
            <MediaCard title="Zootopia 2" imageUrl="https://image.tmdb.org/t/p/w500/oJ7g2CifqpStmoYQyaLQgEU32qO.jpg" epWatched="" score=""/>
            
        </div>
    )
}