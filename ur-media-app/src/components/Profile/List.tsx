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

                <button className={`${styles.tabLink} ${activeTab === "filter" ? styles.active : ""}`}
                    onClick={() => setActiveTab("filter")}
                >Filter</button>
            </div>

            <div className={styles.tabContent}>
                {activeTab === "movies" && <p>Movies List</p>}
                {activeTab === "shows" && <p>Shows List</p>}
                {activeTab === "games" && <p>Games List</p>}
                {activeTab === "books" && <p>Books List</p>}
                {activeTab === "filter" && <p>Filters List</p>}
            </div>
        </div>
    )
}