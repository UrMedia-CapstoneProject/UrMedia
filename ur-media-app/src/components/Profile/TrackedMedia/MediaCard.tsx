"use client"
import styles from "./MediaCard.module.css"
import { useState } from "react"
import Poster from "@/components/Global/Poster";

export default function () {
    return (
        <div className={styles.main}>
            <div className={styles.poster}>
                <Poster title={"The Odyssey"} imageUrl={"/test-images/the-odyssey.jpg"} />
                <div className={styles.mediaInfo}>
                    <div>
                        <p className={styles.title}>
                            <span className={styles.titleText}>
                                {"The Odyssey"}
                            </span>
                        </p>

                    </div>

                    <div className={styles.userStats}>
                        <p className={styles.epWatched}>0</p>
                        <p className={styles.score}>7/10</p>
                    </div>

                </div>
            </div>
        </div>
    )
}