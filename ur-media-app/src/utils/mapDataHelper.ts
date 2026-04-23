import { MediaResultItem, DisplayMediaItem} from "@/types/types"

export function replaceHtml(description: string | undefined) {
    if (!description) return;
    return description.replace(/<[^>]+>/g, "");
  }

export function mapMedia(media: MediaResultItem | null): DisplayMediaItem | undefined{
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
        mediaType: 'manga',
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