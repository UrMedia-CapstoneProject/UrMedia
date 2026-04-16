import Link from "next/link"
import Image from "next/image"
import styles from "./SearchBar.module.css"


export default function SearchBar(){
    return(
        <div className={styles.main}>
            <div className={styles.searchBar}>
                    <input type="text" placeholder="Search..." className={styles.searchBarInput} />
                    <Link href="/catalog" className={styles.searchBarButton}>
                        <Image
                            src="/navbar-icons/search1.png"
                            title="Search"
                            alt="Search"
                            width={25}
                            height={25}
                        />
                    </Link>
                </div>
        </div>
    )
}