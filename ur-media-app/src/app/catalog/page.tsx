import { MediaResultItems } from "@/types/types";
import Catalog from "@/components/Catalog/Catalog";
import MediaFilters from "@/components/Catalog/MediaFilters";
import PageButton from "@/components/Catalog/PageButton";
import { getPopularAnime, getPopularManga } from "@/services/jikan";
import { getPopularGames } from "@/services/rawg";
import { getPopularMovies, getPopularShows } from "@/services/tmdb";
import { redirect } from "next/navigation";
import styles from "./page.module.css";

interface SearchParams {
  searchParams?: {
    page?: string;
    category?: string;
  };
}

export default async function CatalogPage({ searchParams }: SearchParams) {
  const params = await searchParams;
  const category = params?.category;
  const page = Number(params?.page || 1);

  let media: MediaResultItems = {};
  let hasNext: boolean = false;

  if (!category) {
    redirect("/catalog?category=movies&page=1");
  }

  if (category == "movies") {
    const response = await getPopularMovies(page);
    media.movies = response?.results || [];
    if (response?.total_pages != page) {
      hasNext = true
    } else {
      hasNext = false
    }
  } else if (category == "shows") {
    const response = await getPopularShows(page);
    media.shows = response?.results || [];
    if (response?.total_pages != page) {
      hasNext = true
    } else {
      hasNext = false
    }
  } else if (category == "games") {
    const response = await getPopularGames(page.toString());
    media.games = response.results;
    if (response.next != null) {
      hasNext = true
    } else {
      hasNext = false
    }
  } else if (category == "anime") {
    const response = await getPopularAnime(page);
    media.anime = response?.data || [];

    if(response?.pagination.has_next_page){
      hasNext = true
    } else {
      hasNext = false
    }

  } else if (category == "manga") {
    const response = await getPopularManga(page);
    media.manga = response?.data || [];

    if(response?.pagination.has_next_page){
      hasNext = true
    } else {
      hasNext = false
    }
  }
  return (
    <div className={styles.main}>
      <MediaFilters />
      <Catalog data={media} category={category} />
      <PageButton currentPage={page} hasMore={hasNext} />
    </div>
  );
}
