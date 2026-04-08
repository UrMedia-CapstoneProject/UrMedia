import styles from "./page.module.css";
import MediaFilters from "@/components/Catalog/MediaFilters";
import Poster from "@/components/Global/Poster";
import { getPopularMovies } from "@/services/tmdb";
import { MovieResultItem } from "@lorenzopant/tmdb";

interface CatalogProps {
  searchParams?: { page?: string };
}
export default async function CatalogPage({ searchParams }: CatalogProps) {
  const page = Number(searchParams?.page || 1);
  let movies: MovieResultItem[] = [];

  const response = await getPopularMovies(page);
  movies = response?.results || [];

  const posters = movies.map((movie) => (
    <Poster
      key={movie.id}
      title={movie.title}
      imageUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}` || ""}
    />
  ));

  return (
    <div className={styles.main}>
      <MediaFilters />
      <div className={styles.mediaGrid}>{posters}</div>
    </div>
  );
}
