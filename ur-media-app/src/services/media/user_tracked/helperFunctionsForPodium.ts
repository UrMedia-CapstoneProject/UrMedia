/*
    Helper functions for getting podium group and tracked table.
    - Place SupportedMediaType  in a types file later on
*/

export type SupportedMediaType =
  | "movie"
  | "anime_movie"
  | "show"
  | "anime_show"
  | "game"
  | "book"
  | "manga";

export function isSupportedMediaType(
  value: string,
): value is SupportedMediaType {
  return (
    value === "movie" ||
    value === "anime_movie" ||
    value === "show" ||
    value === "anime_show" ||
    value === "game" ||
    value === "book" ||
    value === "manga"
  );
}

export function getPodiumGroup(mediaType: SupportedMediaType) {
  switch (mediaType) {
    case "movie":
    case "anime_movie": {
      return "movies";
    }
    case "show":
    case "anime_show": {
      return "shows";
    }
    case "game": {
      return "games";
    }
    case "book": {
      return "books";
    }
  }
}