import styles from "./Catalog.module.css";
import Poster from "@/components/Global/Poster";
import { MediaResultItems } from "@/types/types";

interface CatalogProps {
  data: MediaResultItems;
  category: string;
}

export default async function Catalog({ data, category }: CatalogProps) {
  let posters;

  if (category == "movies") {
    posters = data.movies?.map((movie) => (
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
    posters = data.shows?.map((show) => (
      <div className={styles.imageWrapper} key={show.id}>
        <Poster
          key={show.id}
          title={show.name}
          imageUrl={`https://image.tmdb.org/t/p/w500/${show.poster_path}` || ""}
        />
      </div>
    ));
  } else if (category == "games") {
    posters = data.games?.map((game) => (
      <div className={styles.imageWrapper} key={game.id}>
        <Poster
          key={game.id}
          title={game.name}
          imageUrl={game.background_image}
        />
      </div>
    ));
  } else if (category == "animes") {
    posters = data.anime?.map((anime) => (
      <Poster
        key={anime.mal_id}
        title={anime.title_english || anime.title}
        imageUrl={anime.images.jpg.large_image_url || ""}
      />
    ));
  } else if (category == "mangas") {
    posters = data.manga?.map((manga) => (
      <Poster
        key={manga.mal_id}
        title={manga.title_english || manga.title}
        imageUrl={manga.images.jpg.large_image_url || ""}
      />
    ));
  }

  return <div className={styles.mediaGrid}>{posters}</div>;
}
