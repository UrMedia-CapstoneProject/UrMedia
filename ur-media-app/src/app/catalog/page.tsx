import { CatalogProps } from "@/components/Catalog/Catalog";
import Catalog from "@/components/Catalog/Catalog";
import MediaFilters from "@/components/Catalog/MediaFilters";
import styles from "./page.module.css"


export default async function CatalogPage({ searchParams }: CatalogProps) {
  const params = await searchParams;
  return (
    <div className={styles.main}>
      <MediaFilters />
      <Catalog searchParams={params} />
    </div>
  )
}
