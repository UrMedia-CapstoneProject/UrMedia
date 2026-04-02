"use client"
import styles from "./List.module.css"
import { useState } from "react"
import MediaList from "@/components/Profile/MediaList";

export default function () {

    const [activeTab, setActiveTab] = useState("movies")
    const [filterOpen, setFilterOpen] = useState(false)
    const [activeFilter, setActiveFilter] = useState<string | null>(null)

    function handleFilterSelect(filter: string) {
        setActiveFilter(filter)
        setActiveTab("filter")
        setFilterOpen(false)
    }

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

                <div 
                    className={styles.dropdown}
                    onBlur={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                            setFilterOpen(false)
                        }
                    }}
                >
                    <button
                        className={`${styles.dropdown} ${activeTab === "filter"}`}
                        onClick={() => setFilterOpen(prev => !prev)}
                    >
                        {activeFilter ? `Filter: ${activeFilter}` : "Filter"}
                    </button>

                    {filterOpen && (
                        <div className={styles.dropdownMenu}>
                            <button onClick={() => handleFilterSelect("A-Z")}>A–Z</button>
                            <button onClick={() => handleFilterSelect("Z-A")}>Z–A</button>
                            <button onClick={() => handleFilterSelect("Rating")}>Rating</button>
                            <button onClick={() => handleFilterSelect("Date Added")}>Date Added</button>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.tabContent}>
                {activeTab === "movies" && <MediaList />}
                {activeTab === "shows" && <MediaList />}
                {activeTab === "games" && <MediaList />}
                {activeTab === "books" && <MediaList />}
                {activeTab === "filter" && <p>Filter</p>}
            </div>
        </div>
    )
}