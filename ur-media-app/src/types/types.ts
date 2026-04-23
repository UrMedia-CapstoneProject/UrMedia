import { Anime, Manga } from "@rushelasli/jikants";
import { MovieResultItem, TVSeriesResultItem, MovieDetails, TVSeriesDetails } from "@lorenzopant/tmdb";

export interface PosterProps {
  title: string;
  imageUrl: string;
  onClick?: () => void;
  hoverEnabled: boolean;
}

export interface MobileMediaCardProps {
  item: BaseMediaItem;
  onClick?: () => void;
}

export interface PosterPodiumProps {
  imageUrl?: string
}

export interface Game {
  id: number;
  name: string;
  released: string;
  rating: number;
  background_image: string;
  description?: string | undefined;
  tba?: boolean,
}

export interface MediaResultItems {
  movies?: MovieResultItem[];
  shows?: TVSeriesResultItem[];
  games?: Game[];
  anime?: Anime[];
  manga?: Manga[];
}

export interface MediaResultItem {
  movie?: MovieDetails;
  show?: TVSeriesDetails;
  game?: Game;
  anime?: Anime;
  manga?: Manga;
}
export type MediaSource = "tmdb" | "jikan" | "rawg" | "google_books";

export type MediaType =
  | "movie"
  | "anime_movie"
  | "show"
  | "anime_show"
  | "game"
  | "book";

/*
    This will be the base prop for storing a MediaItem on our site. Other props will be added
    to give us more individual or specific fields from the respective external apis.
        - id = media_id, it can be null since the user could search for aomething that doesn't in db yet.

        - The top 4 fields (id, externalID, source, and mediaType) are being store in the db.
          Everything else below those 4 fields and beyong this prop will be retrieved from the external apis.
        
        - nextReleaseDate: This one could be taken out and the field could be put in the respective media prop
          but kept it since it could apply to all the media types.
*/
export type BaseMediaItem = {
  id: number | null;
  externalId: string;
  source: MediaSource;
  mediaType: MediaType;

  title: string;
  imageUrl: string;
  synopsis?: string;
  releaseDate?: string | null;
  nextReleaseDate?: string | null;
};

export type MovieMediaItem = BaseMediaItem & {
  mediaType: "movie" | "anime_movie";

  titleEnglish?: string;
  titleJapanese?: string;
  duration?: string | null;
  genre?: string[]; // there are id numbers so maybe number[]
  theme?: string | null;
};

export type ShowMediaItem = BaseMediaItem & {
  mediaType: "show" | "anime_show";

  nextReleaseDate?: string | null;
  titleEnglish?: string;
  titleJapanese?: string;
  totalEpisodes?: string | null;
  genre?: string[]; // there are id numbers so maybe number[]
};

export type GameMediaItem = BaseMediaItem & {
  mediaType: "game";

  tba?: string | null;
  platforms?: string | null;
  stores?: string | null;
  genre?: string[]; // We might not need this because of tags
  tags?: string[]; // there are id numbers and names 
};

export type BookMediaItem = BaseMediaItem & {
  mediaType: "book";

  titleJapanese?: string | null
  volumeInfo?: string[]
  tba?: string | null;
  genre?: string | null; // Not sure what it is stored as from the api
};

export type DisplayMediaItem =
    | MovieMediaItem
    | ShowMediaItem
    | GameMediaItem
    | BookMediaItem


/*For repopulating popular_media_cache*/
export type PopularMediaGroup = "movies" | "shows" | "games" | "books"
export type PopularTimeframe = "all_time" | "7d" | "30d"

export type MediaCategory = "movies" | "shows" | "games" | "books"