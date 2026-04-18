'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./SearchBar.module.css";

export default function SearchBar() {

    const searchParams = useSearchParams();
    const { replace } = useRouter();

    function handleSearch(input: string) {
        const params = new URLSearchParams(searchParams)
        if (input) {
            params.set('title', input)
        } else {
            params.delete('title')
        }
        replace(`/catalog?${params.toString()}`)
    }

  return (
    <div>
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => {
            handleSearch(e.target.value)
          }}
          className={styles.searchBarInput}
        />
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
  );
}
