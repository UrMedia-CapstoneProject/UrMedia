"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function MediaFilters() {
  const mediaTypes = ["movies", "games", "shows", "books"];
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const handleFilterChange = (genre: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", genre);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <h1>Media Type</h1>
      <select
        onChange={(media) => handleFilterChange(media.target.value)}
        value={searchParams.get("category") || "movie"}
      >
        {mediaTypes.map((media, idx) => (
          <option key={idx}>{media}</option>
        ))}
      </select>
    </div>
  );
}
