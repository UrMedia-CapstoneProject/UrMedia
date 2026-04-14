import { SupportedMediaType } from "./helperFunctionsForPodium";

export function getTrackedTable(mediaType: SupportedMediaType) {
  switch (mediaType) {
    case "movie": {
      return "user_tracked_movies";
    }
    case "anime_movie": {
      return "user_tracked_animes";
    }
    case "show": {
      return "user_tracked_shows";
    }
    case "anime_show": {
      return "user_tracked_animes";
    }
    case "game": {
      return "user_tracked_games";
    }
    case "book": {
      return "user_tracked_books";
    }
    default:
      throw new Error("Unsupported media type");
  }
}