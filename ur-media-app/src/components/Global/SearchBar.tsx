'use client'

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import styles from "./SearchBar.module.css";

interface searchBarProps {
  isDisabled: boolean
}
export default function SearchBar({isDisabled}: searchBarProps) {

  const searchParams = useSearchParams();

  return (
    <div>
      <div className={styles.searchBar}>
        <input
          name="title"
          type="text"
          placeholder={isDisabled ? "Select a Category" : "Search..."}
          disabled={isDisabled}
          defaultValue={searchParams.get('title') || ''}
          className={styles.searchBarInput}
        />
        <button type="submit" className={styles.searchBarButton}>
          <Image
            src="/navbar-icons/search1.png"
            title="Search"
            alt="Search"
            width={25}
            height={25}
          />
        </button>
      </div>
    </div>
  );
}
