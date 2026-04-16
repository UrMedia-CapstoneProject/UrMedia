import styles from "./Catalog.module.css";
import Poster from "@/components/Global/Poster";
import { getPopularMovies, getPopularShows } from "@/services/tmdb";
import { getPopularGames } from "@/services/rawg";
import { getPopularAnime, getPopularManga } from "@/services/jikan";
import { Game } from "@/types/types";
import { Anime, Manga } from "@rushelasli/jikants";
import { MovieResultItem, TVSeriesResultItem } from "@lorenzopant/tmdb";
import { redirect } from "next/navigation";

export interface CatalogProps {
  searchParams?: {
    page?: string;
    category?: string;
  };
}
interface MediaResultItems {
  movies?: MovieResultItem[];
  shows?: TVSeriesResultItem[];
  games?: Game[];
  anime?: Anime[];
  manga?: Manga[];
}

export default async function Catalog({ searchParams }: CatalogProps) {
  const params = await searchParams;
  const category = params?.category;
  const page = Number(params?.page || 1);

  let media: MediaResultItems = {};
  let posters;
  if (!category) {
    redirect("/catalog?category=movies");
  }

  if (category == "movies") {
    const response = await getPopularMovies(page);
    media.movies = response?.results || [];

    posters = media.movies?.map((movie) => (
      <div className={styles.imageWrapper} key={movie.id}>
        <Poster
          key={movie.id}
          title={movie.title}
          imageUrl={
            `https://image.tmdb.org/t/p/w500/${movie.poster_path}` || ""
          }
        />
      </div>
    ));
  } else if (category == "shows") {
    const response = await getPopularShows(page);
    media.shows = response?.results || [];

    posters = media.shows.map((show) => (
      <div className={styles.imageWrapper} key={show.id}>
        <Poster
          key={show.id}
          title={show.name}
          imageUrl={`https://image.tmdb.org/t/p/w500/${show.poster_path}` || ""}
        />
      </div>
    ));
  } else if (category == "games") {
    const response = await getPopularGames(page.toString(), "80,100");
    media.games = response.results;

    posters = media.games.map((game) => (
      <div className={styles.imageWrapper} key={game.id}>
        <Poster
          key={game.id}
          title={game.name}
          imageUrl={game.background_image}
        />
      </div>
    ));
  } else if (category == "anime") {
      const response = await getPopularAnime(page)
      media.anime = response?.data || []
  
      posters = media.anime.map((anime) => (
        <Poster
          key={anime.mal_id}
          title={anime.title_english || anime.title}
          imageUrl={anime.images.jpg.image_url || ""}
        />
      ))
    } else if (category == "manga") {
      const response = await getPopularManga(page)
      media.manga = response?.data || []
  
      posters = media.manga.map((manga) => (
        <Poster
          key={manga.mal_id}
          title={manga.title_english || manga.title}
          imageUrl={manga.images.jpg.image_url || ""}
        />
      ))
    }

  return <div className={styles.mediaGrid}>{posters}</div>;
}
