import Catalog from "@/components/Catalog/Catalog";
<<<<<<< HEAD
import MediaFilters from "@/components/Catalog/MediaFilters";
import styles from "./page.module.css"
import SearchBar from "@/components/Global/SearchBar";
=======
import PageButton from "@/components/Catalog/PageButton";
import { getCatalogMedia } from "@/services/media/catalog/getMedia";
import styles from "./page.module.css";
>>>>>>> skyler

interface SearchParams {
  searchParams?: {
    page?: string;
    category?: string;
    title?: string;
  };
}

export default async function CatalogPage({ searchParams }: SearchParams) {
  const params = await searchParams;
  const category = params?.category || 'movies';
  const title = params?.title;
  const page = Number(params?.page || 1);

  const { media, hasNext } = await getCatalogMedia(category, page, title)

  
   
  return (
    <div className={styles.main}>
<<<<<<< HEAD
      <div className={styles.searchBar}>
        <SearchBar />
      </div>
      <div className={styles.filters}>
        <MediaFilters />
      </div>
      <Catalog searchParams={params} />
=======
      <Catalog data={media} category={category} />
      <PageButton currentPage={page} hasMore={hasNext} />
>>>>>>> skyler
    </div>
  );
}
