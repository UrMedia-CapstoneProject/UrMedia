import Catalog from "@/components/Catalog/Catalog";
import PageButton from "@/components/Catalog/PageButton";
import { getCatalogMedia } from "@/services/media/catalog/getPageMedia";
import styles from "./page.module.css";
import SearchBar from "@/components/Global/SearchBar";

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
      <div className={styles.searchBar}>
        <SearchBar isDisabled={false}/>
      </div>
      <Catalog data={media} category={category} />
      <PageButton currentPage={page} hasMore={hasNext} />
    </div>
  );
}
