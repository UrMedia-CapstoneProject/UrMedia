"use client"
import styles from "./List.module.css"
import { useState } from "react"

export default function () {

    const [activeTab, setActiveTab] = useState("movies")

    return (
        <div className={styles.main}>
            <div className={styles.tabList}>
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
        </div>
    )
}