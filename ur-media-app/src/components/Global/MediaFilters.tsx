"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import styles from "./MediaFilters.module.css"

export default function MediaFilters() {
  const mediaTypes = ["movies", "games", "shows", "books", "animes", "mangas"];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentValue = searchParams.get("category") || ""

  const handleFilterChange = (genre: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('category', genre);
    params.delete('page')
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.filterBox}>
      <select
        className={styles.filterBox}
        name="category"
        onChange={(media) => handleFilterChange(media.target.value)}
        value={currentValue}
      >
        <option
          value=""
          disabled
          hidden
        >
          Category
        </option>
        {mediaTypes.map((media, idx) => (
          <option key={idx}>{media}</option>
        ))}
      </select>
    </div>
  );
}
