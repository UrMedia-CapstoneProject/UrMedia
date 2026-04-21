"use client";

import styles from "./Catalog.module.css";
import Poster from "@/components/Global/Poster";
import { getMediaDetails } from "@/services/media/catalog/getMediaDetails";
import MediaDetailModal from "../Global/MediaDetailModal";
import { MediaResultItems } from "@/types/types";
import { DisplayMediaItem } from "@/types/types";

interface CatalogProps {
  data: MediaResultItems;
  category: string;
}

export default function Catalog({ data, category }: CatalogProps) {
  let posters;

  const handlePosterClick = (id: number, category: string) => {
    const media = getMediaDetails(id, category)
  };

  if (category == "movies") {
    posters = data.movies?.map((movie) => (
      <div className={styles.imageWrapper} key={movie.id}>
        <Poster
          key={movie.id}
          title={movie.title}
          imageUrl={
            `https://image.tmdb.org/t/p/w500/${movie.poster_path}` || ""
          }
          onClick={() => handlePosterClick(movie.id, category)}
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
          onClick={() => handlePosterClick(show.id, category)}
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
          onClick={() => handlePosterClick(game.id, category)}
        />
      </div>
    ));
  } else if (category == "animes") {
    posters = data.anime?.map((anime) => (
      <Poster
        key={anime.mal_id}
        title={anime.title_english || anime.title}
        imageUrl={anime.images.jpg.large_image_url || ""}
        onClick={() => handlePosterClick(anime.mal_id, category)}
      />
    ));
  } else if (category == "mangas") {
    posters = data.manga?.map((manga) => (
      <Poster
        key={manga.mal_id}
        title={manga.title_english || manga.title}
        imageUrl={manga.images.jpg.large_image_url || ""}
        onClick={() => handlePosterClick(manga.mal_id, category)}
      />
    ));
  }

  return <div className={styles.mediaGrid}>{posters}</div>;
}
