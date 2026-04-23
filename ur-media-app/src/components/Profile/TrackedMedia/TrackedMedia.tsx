"use client"
import styles from "./TrackedMedia.module.css"
import { useState } from "react"
import MediaList from "./MediaList";
import TierView from "./TierView";
import { ProfileTrackedMediaProps } from "@/services/profile/lists/getFollowedLists";

export interface TrackedMediaProps {
    movies: ProfileTrackedMediaProps[];
    shows: ProfileTrackedMediaProps[];
    games: ProfileTrackedMediaProps[];
    books: ProfileTrackedMediaProps[];
}


export default function TrackedMedia({ lists }: { lists: TrackedMediaProps }) {

    const [activeTab, setActiveTab] = useState("movies")
    const [activeFilter, setActiveFilter] = useState<string | null>("A-Z")
    const [viewMode, setViewMode] = useState("list")

    function handleFilterSelect(filter: string) {
        setActiveFilter(filter)
        setActiveTab("filter")
    }

    return (
        <div className={styles.main}>
            <div className={styles.buttonRow}>
                <div className={styles.radioGroup}>
                    <div className={styles.listView}>
                        <input type="radio" name="viewMode" value="list"
                            defaultChecked
                            onChange={() => setViewMode("list")}
                        />
                    </div>
                    <div className={styles.tierView}>
                        <input type="radio" name="viewMode" value="tiers"
                            onChange={() => setViewMode("tiers")}
                        />
                    </div>
                </div>

                <div className={styles.filters}>
                    <div className={styles.mobileTabDropdown}>
                        <button className={styles.filterButton}>
                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                        </button>

                        <div className={styles.mobileTabMenu}>
                            <button onClick={() => setActiveTab("movies")}>Movies</button>
                            <button onClick={() => setActiveTab("shows")}>Shows</button>
                            <button onClick={() => setActiveTab("games")}>Games</button>
                            <button onClick={() => setActiveTab("books")}>Books</button>
                        </div>
                    </div>

                    <div className={styles.dropdown}>
                        <button className={`${styles.filterButton} ${activeTab === "filter"}`}>
                            {activeFilter}
                        </button>

                        <div className={styles.dropdownMenu}>
                            <button onClick={() => handleFilterSelect("A-Z")}>A-Z</button>
                            <button onClick={() => handleFilterSelect("Z-A")}>Z-A</button>
                            <button onClick={() => handleFilterSelect("Rating")}>Rating</button>
                            <button onClick={() => handleFilterSelect("Date Added")}>Date Added</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.contentArea}>
                {viewMode === "tiers" ? (
                    <>
                        {activeTab === "movies" && <TierView />}
                        {activeTab === "shows" && <TierView />}
                        {activeTab === "games" && <TierView />}
                        {activeTab === "books" && <TierView />}
                    </>
                ) : (
                    <>
                        {activeTab === "movies" && <MediaList list={lists.movies} />}
                        {activeTab === "shows" && <MediaList list={lists.shows} />}
                        {activeTab === "games" && <MediaList list={lists.games} />}
                        {activeTab === "books" && <MediaList list={lists.books} />}
                        {activeTab === "filter" && <p>Filtering by: {activeFilter}</p>}
                    </>
                )}
            </div>

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