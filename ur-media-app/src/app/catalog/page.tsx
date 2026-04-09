"use client"

import styles from "./page.module.css"
import MediaFilters from "@/components/Catalog/MediaFilters"
import Poster from "@/components/Global/Poster"

export default function CatalogPage(){
    const posters = []
    for (let i: number = 0; i < 25; i++) {
        posters.push(<Poster key={i} title = {"The Odyssey"} imageUrl = {"/test-images/the-odyssey.jpg"} />)
    }

    return (
        <div className={styles.main}>
            <MediaFilters />
            <div className={styles.mediaGrid}>
                {posters}
            </div>
        </div>
    )
}