'use client'
import styles from "./Catalog.module.css";
import Poster from "@/components/Global/Poster";
import { useState } from "react";
import { getMediaDetails } from "@/services/media/catalog/getMediaDetails";
import MediaDetailModal from "../Global/MediaDetailModal";
import { MediaResultItems, MediaResultItem } from "@/types/types";
import { DisplayMediaItem } from "@/types/types";

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

  function replaceHtml(description: string | undefined) {
    if (!description) return;
    return description.replace(/<[^>]+>/g, "");
  }
  function mapMedia(media: MediaResultItem | null): DisplayMediaItem | undefined{
    if (!media) {
      return undefined
    }
    if(media.movie) {
      return {
        mediaType: 'movie',
        id: media.movie.id,
        externalId: media.movie.id.toString(),
        source: "tmdb",
        title: media.movie.title,
        imageUrl: `https://image.tmdb.org/t/p/w500/${media.movie.poster_path}`,
        synopsis: media.movie.overview,
        releaseDate: media.movie.release_date,
        duration: media.movie.runtime?.toString()
      }
    } else if (media.show) {
      return {
        mediaType: 'show',
        id: media.show.id,
        externalId: media.show.id.toString(),
        source: 'tmdb',
        title: media.show.name,
        imageUrl: `https://image.tmdb.org/t/p/w500/${media.show.poster_path}`,
        synopsis: media.show.overview,
        nextReleaseDate: media.show.next_episode_to_air?.air_date,
        releaseDate: media.show.first_air_date
      }
    }else if (media.game) {
      return {
        mediaType: 'game',
        id: media.game.id,
        externalId: media.game.id.toString(),
        source: 'rawg',
        title: media.game.name,
        imageUrl: media.game.background_image,
        synopsis: replaceHtml(media.game.description),
        releaseDate: media.game.released
      }
    }else if (media.anime) {
      let animeType = media.anime.type === 'Movie'
      return {
        mediaType: animeType ? 'anime_movie' : 'anime_show',
        id: media.anime.mal_id,
        externalId: media.anime.mal_id.toString(),
        source: 'jikan',
        title: media.anime.title_english || '',
        titleJapanese: media.anime.title_japanese || '',
        releaseDate: media.anime.aired.from,
        synopsis: media.anime.synopsis || '',
        imageUrl: media.anime.images.jpg.large_image_url || '',
        duration: media.anime.duration
      }
    }else if (media.manga) {
      return {
        mediaType: 'book',
        id: media.manga.mal_id,
        externalId: media.manga.mal_id.toString(),
        source: 'jikan',
        title: media.manga.title,
        titleJapanese: media.manga.title_japanese,
        imageUrl: media.manga.images.jpg.large_image_url || '',
        synopsis: media.manga.synopsis || '',
        releaseDate: media.manga.published.from
      }
    }
  }

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
