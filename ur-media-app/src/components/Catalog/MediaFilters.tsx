"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import styles from "./MediaFilters.module.css"

export default function MediaFilters() {
  const mediaTypes = ["movies", "games", "shows", "books", "anime", "manga"];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (genre: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", genre);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.main}>
      <h2 className={styles.header}>Media Type</h2>
      <div className={styles.filters}>
        <select
          onChange={(media) => handleFilterChange(media.target.value)}
          value={searchParams.get("category") || "movie"}
        >
          {mediaTypes.map((media, idx) => (
            <option key={idx}>{media}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
