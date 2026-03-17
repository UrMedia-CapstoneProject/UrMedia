"use client"
import styles from "./Countdown.module.css"
import { useState } from "react"

export default function() {

    const [activeTab, setActiveTab] = useState("movies")

    return (
        <div className={styles.main}>
            <h2 className={styles.sectionHeader}>Countdown</h2>
            
            <div className={styles.tabBar}>
                <button className={`${styles.tabLink} ${activeTab === "movies" ? styles.active : ""}`}
                    onClick={() => setActiveTab("movies")}
                >Movies</button>

                <button className={`${styles.tabLink} ${activeTab === "shows" ? styles.active : ""}`}
                    onClick={() => setActiveTab("shows")}
                >Shows</button>

                <button className={`${styles.tabLink} ${activeTab === "games" ? styles.active : ""}`}
                    onClick={() => setActiveTab("games")}
                >Games</button>

                <button className={`${styles.tabLink} ${activeTab === "books" ? styles.active : ""}`}
                    onClick={() => setActiveTab("books")}
                >Books</button>

            </div>

            <div className={styles.tabContent}>
                {activeTab === "movies" && <p>Upcoming Movies</p>}
                {activeTab === "shows" && <p>Upcoming Shows</p>}
                {activeTab === "games" && <p>Upcoming Games</p>}
                {activeTab === "books" && <p>Upcoming Books</p>}
            </div>
        </div>
    )
}