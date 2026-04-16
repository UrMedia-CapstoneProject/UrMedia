import { CatalogProps } from "@/components/Catalog/Catalog";
import Catalog from "@/components/Catalog/Catalog";
import MediaFilters from "@/components/Catalog/MediaFilters";
import styles from "./page.module.css"
import SearchBar from "@/components/Global/SearchBar";

export default async function CatalogPage({ searchParams }: CatalogProps) {
  const params = await searchParams;

  return (
    <div className={styles.main}>
      <div className={styles.searchBar}>
        <SearchBar />
      </div>
      <div className={styles.filters}>
        <MediaFilters />
      </div>
      <Catalog searchParams={params} />
    </div>
  )
}
