import {
  type SupportedMediaType,
  isSupportedMediaType,
  getPodiumGroup,
} from "./helperFunctionsForPodium";
import { getTrackedTable } from "./helperFunctionsForGetTrackedTable";

type GetUserTrackedMediaParameters = {
  supabase: any;
  userId: string; // Does this need to be a number or string?
  mediaId: number;
  mediaType: string;
};

type ModalTrackedResponse = {
  isTracked: boolean;
  status: string;
  score: number;
  hoursPlayed: number | "";
  episodesWatched: number | "";
  repeatCount: number | "";
  startDate: string;
  finishDate: string;
  review: string;
  podiumEnabled: boolean;
  podiumRank: number | "";
};

function emptyResponse(): ModalTrackedResponse {
  return {
    isTracked: false,
    status: "",
    score: NaN,
    hoursPlayed: "",
    episodesWatched: "",
    repeatCount: "",
    startDate: "",
    finishDate: "",
    review: "",
    podiumEnabled: false,
    podiumRank: "",
  };
}

function normalizeTrackedRow(
  mediaType: SupportedMediaType,
  trackedRow: any,
): Omit<ModalTrackedResponse, "podiumEnabled" | "podiumRank"> {
  switch (mediaType) {
    case "movie":
      return {
        isTracked: true,
        status: trackedRow.watch_status ?? "",
        score: trackedRow.rating ?? "",
        hoursPlayed: "",
        episodesWatched: "",
        repeatCount: trackedRow.repeat_count ?? "",
        startDate: trackedRow.starting_date ?? "",
        finishDate: trackedRow.ending_date ?? "",
        review: trackedRow.review ?? "",
      };
    case "anime_movie":
      return {
        isTracked: true,
        status: trackedRow.watch_status ?? "",
        score: trackedRow.rating ?? "",
        hoursPlayed: "",
        episodesWatched: "",
        repeatCount: trackedRow.repeat_count ?? "",
        startDate: trackedRow.starting_date ?? "",
        finishDate: trackedRow.ending_date ?? "",
        review: trackedRow.review ?? "",
      };

    case "show":
      return {
        isTracked: true,
        status: trackedRow.watch_status ?? "",
        score: trackedRow.rating ?? "",
        hoursPlayed: "",
        episodesWatched: trackedRow.episodes_watched,
        repeatCount: trackedRow.repeat_count ?? "",
        startDate: trackedRow.starting_date ?? "",
        finishDate: trackedRow.ending_date ?? "",
        review: trackedRow.review ?? "",
      };

    case "anime_show":
      return {
        isTracked: true,
        status: trackedRow.watch_status ?? "",
        score: trackedRow.rating ?? "",
        hoursPlayed: "",
        episodesWatched: trackedRow.episodes_watched,
        repeatCount: trackedRow.repeat_count ?? "",
        startDate: trackedRow.starting_date ?? "",
        finishDate: trackedRow.ending_date ?? "",
        review: trackedRow.review ?? "",
      };

    case "game":
      return {
        isTracked: true,
        status: trackedRow.watch_status ?? "",
        score: trackedRow.rating ?? "",
        hoursPlayed: trackedRow.hours_played,
        episodesWatched: "",
        repeatCount: trackedRow.repeat_count ?? "",
        startDate: trackedRow.starting_date ?? "",
        finishDate: trackedRow.ending_date ?? "",
        review: trackedRow.review ?? "",
      };

    case "book":
      return {
        isTracked: true,
        status: trackedRow.watch_status ?? "",
        score: trackedRow.rating ?? "",
        hoursPlayed: "",
        episodesWatched: "",
        repeatCount: trackedRow.repeat_count ?? "",
        startDate: trackedRow.starting_date ?? "",
        finishDate: trackedRow.ending_date ?? "",
        review: trackedRow.review ?? "",
      };

    default:
      throw new Error("Unsupported media type");
  }
}

export async function getUserTrackedMedia({
  supabase,
  userId,
  mediaId,
  mediaType,
}: GetUserTrackedMediaParameters): Promise<ModalTrackedResponse> {
  if (!isSupportedMediaType(mediaType)) {
    throw new Error("Invalid media type");
  }

  const trackedTable = getTrackedTable(mediaType);
  const podiumGroup = getPodiumGroup(mediaType);

  const { data: trackedRow, error: trackedError } = await supabase
    .from(trackedTable)
    .select("*")
    .eq("user_id", userId)
    .eq("media_id", mediaId)
    .maybeSingle();

  if (trackedError) {
    throw new Error(trackedError.message);
  }

  const { data: podiumRow, error: podiumError } = await supabase
    .from("user_podium")
    .select("placement")
    .eq("user_id", userId)
    .eq("media_id", mediaId)
    .eq("podium_group", podiumGroup)
    .maybeSingle();

  if (podiumError) {
    throw new Error(podiumError.message);
  }

  const podiumEnabled = !!podiumRow;
  const podiumRank = podiumRow?.placement ?? "";

  if (!trackedRow) {
    return {
      ...emptyResponse(),
      podiumEnabled,
      podiumRank,
    };
  }

  return {
    ...normalizeTrackedRow(mediaType, trackedRow),
    podiumEnabled,
    podiumRank
  };
}