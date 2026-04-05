import styles from "./Friends.module.css"
import UpdateCard from "./UpdateCard"

export default function() {
    return (
        <div className={styles.main}>
            <h2 className={styles.sectionHeader}>Friends</h2>

            <div className={styles.content}>
                <div className={styles.searchBar}>
                    <input type="text" placeholder="Search for friends" className={styles.searchBarInput}/>
                    <button className={styles.add}>
                        Add
                    </button>
                </div>
                <h3 className={styles.recentHeader}>Recent Activity</h3>
                <div className={styles.updateCards}>
                    <UpdateCard />
                </div>
            </div>
        </div>
    )
}