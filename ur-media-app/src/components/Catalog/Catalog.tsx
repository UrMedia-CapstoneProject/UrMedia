'use client'
import styles from "./Catalog.module.css";
import Poster from "@/components/Global/Poster";
import { useState } from "react";
import { getMediaDetails } from "@/services/catalog/getMediaDetails";
import MediaDetailModal from "../Global/MediaDetailModal";
import { MediaResultItems, MediaResultItem } from "@/types/types";
import { mapMedia } from "@/utils/mapDataHelper";

interface CatalogProps {
  data: MediaResultItems;
  category: string;
}

export default function Catalog({ data, category }: CatalogProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaResultItem | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  let posters;

  const handlePosterClick = async (id: number, category: string) => {
    const response = await getMediaDetails(id, category);
    const media: MediaResultItem = response.media;
    setSelectedMedia(media);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedMedia(null);
    setIsModalOpen(false);
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
          hoverEnabled={true}
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
          hoverEnabled={true}
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
          hoverEnabled={true}
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
        hoverEnabled={true}
      />
    ));
  } else if (category == "mangas") {
    posters = data.manga?.map((manga) => (
      <Poster
        key={manga.mal_id}
        title={manga.title_english || manga.title}
        imageUrl={manga.images.jpg.large_image_url || ""}
        onClick={() => handlePosterClick(manga.mal_id, category)}
        hoverEnabled={true}
      />
    ));
  }

  return (
    <div className={styles.mediaGrid}>
      {posters}
      <MediaDetailModal 
        media={mapMedia(selectedMedia)}
        isOpen={isModalOpen}
        onClose={handleModalClose}
      />
    </div>
  );
}
