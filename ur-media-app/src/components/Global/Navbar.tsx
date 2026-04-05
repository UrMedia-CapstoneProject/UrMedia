import Link from "next/link"
import Image from "next/image"
import styles from "./Navbar.module.css"

export default function Navbar() {
    return (
        <div className={styles.main}>
            <div className={styles.search}>
                <Link href="/catalog">
                    <Image
                    src="/navbar-icons/browse.png"
                    title="Browse Catalog"
                    alt="Browse"
                    width={40}
                    height={40}
                    className={styles.browseIcon}
                    />
                </Link>
                <div className={styles.searchBar}>
                    <input type="text" placeholder="Search..." className={styles.searchBarInput}/>
                    <Link href="/catalog" className={styles.searchBarButton}>
                        <Image
                        src="/navbar-icons/search.png"
                        title="Search"
                        alt="Search"
                        width={25}
                        height={20}
                        />
                    </Link>
                </div>
            </div>
            <Link href="/" className={styles.logo}>
                <h1 className={styles.logoText}>UrMedia</h1>
            </Link>
            <div className={styles.profile}>
                <Link href="profile">
                    <Image
                    src="/test-images/azusa.jpg"
                    title="Username"
                    alt="Profile"
                    width={45}
                    height={45}
                    className={styles.pfp}
                    />
                </Link>
                <Image 
                    src="/navbar-icons/caret-down.png"
                    title="Dropdown"
                    alt=""
                    width={18}
                    height={18}
                    className={styles.dropdown}
                />
            </div>
        </div>
    )
}