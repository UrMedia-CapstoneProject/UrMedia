"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./MediaDetailModal.module.css";
import type { DisplayMediaItem } from "@/types/types";
import { createClient } from "@/lib/supabase/client";

type MediaDetailModalProps = {
  media: DisplayMediaItem | undefined;
  isOpen: boolean;
  onClose: () => void;
};

export function formatMediaType(mediaType?: string) {
  switch (mediaType) {
    case "movie": {
      return "Movie";
    }
    case "show": {
      return "Show";
    }
    case "anime_movie": {
      return "Anime Movie";
    }
    case "anime_show": {
      return "Anime Show";
    }
    case "game": {
      return "Game";
    }
    case "book": {
      return "Book";
    }
  }
}

export function formatDate(releaseDate?: string | null) {
  if (!releaseDate) return "N/A"; // This handles the issue with Date() can't take a null or undefined value. This is will act as default value.
  const date = new Date(releaseDate);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function MediaDetailModal({
  media,
  isOpen,
  onClose,
}: MediaDetailModalProps) {
  const supabase = createClient();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTracked, setIsTracked] = useState(false);

  const [status, setStatus] = useState("");
  const [score, setScore] = useState("");
  const [hoursPlayed, setHoursPlayed] = useState<number | "">("");
  const [episodesWatched, setEpisodesWatched] = useState<number | "">("");
  const [repeatCount, setRepeatCount] = useState<number | "">(""); // means the same thing as movies/shows/animes = "rewatches", games = "replays", books = "rereads"
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  const [review, setReview] = useState("");
  const [podiumEnabled, setPodiumEnabled] = useState(false);
  const [podiumRank, setPodiumRank] = useState<number | "">("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function getId(external_id: number) {
    const {data} = await supabase
      .from("media")
      .select("id")
      .eq("external_id", external_id)
      .single()

    return data;
  }

  useEffect(() => {
    if (!media || !isOpen || !media.mediaType) {
      resetFormStates();
      return;
    }

    if (getId(Number(media.externalId)) != null) {
      console.log("modal open:", isOpen);
      const loadTrackedData = async () => {
        const data = await getId(Number(media.externalId))
        console.log(data)
        if(data == null) {
          resetFormStates()
          return
        }
        try {
          const response = await fetch(
            `/api/media/user-tracked?mediaId=${data.id}&mediaType=${media.mediaType}`,
          );

          const trackedData = await response.json();

          if (!response.ok) {
            setErrorMessage(
              trackedData.error || "Failed to load tracked data.",
            );
            return;
          }
          console.log(trackedData);

          setIsTracked(true);
          setStatus(trackedData.status ?? "");
          setScore(trackedData.score ?? "");
          setHoursPlayed(trackedData.hoursPlayed ?? "");
          setEpisodesWatched(trackedData.episodesWatched ?? "");
          setRepeatCount(trackedData.repeatCount ?? "");
          setStartDate(trackedData.startDate ?? "");
          setFinishDate(trackedData.finishDate ?? "");
          setReview(trackedData.review ?? "");
          setPodiumEnabled(trackedData.podiumEnabled ?? false);
          setPodiumRank(trackedData.podiumRank ?? "");
          setSuccessMessage("");
        } catch (error) {
          console.error("Failed to laod the user tracked data", error);
          setErrorMessage("Failed to load the user tracked data.");
        }
      };

      loadTrackedData();
    } else {
      resetFormStates();
    }
  }, [media, isOpen]);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setIsLoggedIn(!!data.user);
    };

    checkUser();
  }, [supabase]);

  if (!isOpen || !media) return null;

  const isGame = media.mediaType === "game";
  const isBook = media.mediaType === "book" || media.mediaType === "manga";
  const isShow = media.mediaType === "show" || media.mediaType === "anime_show";
  const isMovie =
    media.mediaType === "movie" || media.mediaType === "anime_movie";

  const showHoursPlayed = isGame;
  const showReplays = isGame;
  const showEpisodesWatched = isShow;
  const showRewatches = isMovie || isShow;

  const getStatusOptions = () => {
    if (isGame) {
      return [
        { value: "plan", label: "Plan to Play" },
        { value: "playing", label: "Playing" },
        { value: "replaying", label: "Replaying" },
        { value: "paused", label: "Paused" },
        { value: "completed", label: "Completed" },
        { value: "dropped", label: "Dropped" },
      ];
    }

    if (isBook) {
      return [
        { value: "plan", label: "Plan to Read" },
        { value: "reading", label: "Reading" },
        { value: "rereading", label: "Rereading" },
        { value: "paused", label: "Paused" },
        { value: "completed", label: "Completed" },
        { value: "dropped", label: "Dropped" },
      ];
    }

    // if (isMovie) {
    //   return [
    //     { value: "plan", label: "Plan to Watch" },
    //     { value: "paused", label: "Paused" },
    //     { value: "completed", label: "Completed" },
    //     { value: "dropped", label: "Dropped" },
    //   ];
    // }

    return [
      { value: "plan", label: "Plan to Watch" },
      { value: "watching", label: "Watching" },
      { value: "rewatching", label: "Rewatching" },
      { value: "paused", label: "Paused" },
      { value: "completed", label: "Completed" },
      { value: "dropped", label: "Dropped" },
    ];
  };

  const handleScoreChange = (value: string) => {
    if (value === "") {
      setScore("");
      return;
    }

    const num = Number(value);

    if (isNaN(num)) return;
    if (num < 1 || num > 10) return;

    setScore(value);
  };

  const validateForm = () => {
    if (score !== "") {
      var num = Number(score);

      if (isNaN(num) || num > 10) {
        setScore("10");
      } else if (num < 1) {
        setScore("1");
      }

      const decimalPart = String(score).split(".")[1];
      if (decimalPart && decimalPart.length > 1) {
        num = Math.floor(num * 10) / 10;
        setScore(String(num));
      }
    }

    if (hoursPlayed !== "" && Number(hoursPlayed) < 0) {
      setHoursPlayed(0);
    }

    if (episodesWatched !== "" && Number(episodesWatched) < 0) {
      setEpisodesWatched(0);
    }

    if (repeatCount !== "" && Number(repeatCount) < 0) {
      setRepeatCount(0);
    }

    var epWatched = Number(episodesWatched);
    if (
      showEpisodesWatched &&
      episodesWatched !== "" &&
      epWatched &&
      media.totalEpisodes != null &&
      epWatched > Number(media.totalEpisodes)
    ) {
      setEpisodesWatched(Number(media.totalEpisodes));
    }

    if (startDate && finishDate && new Date(finishDate) < new Date(startDate)) {
      return "Finish date cannot be before start date.";
    }

    if (podiumEnabled && podiumRank === "") {
      return "Please select a podium rank.";
    }
  };

  function resetFormStates() {
    setStatus("");
    setScore("");
    setHoursPlayed("");
    setEpisodesWatched("");
    setRepeatCount("");
    setStartDate("");
    setFinishDate("");
    setReview("");
    setPodiumRank("");
    setPodiumEnabled(false);
    setErrorMessage("");
    setSuccessMessage("");
    setIsTracked(false);
  }

  const handleTogglePodium = () => {
    if (!isLoggedIn) return;

    if (podiumEnabled) {
      setPodiumEnabled(false);
      setPodiumRank("");
    } else {
      setPodiumEnabled(true);

      if (podiumRank === "") {
        setPodiumRank(1);
      }
    }
  };

  const handleSaveChanges = async () => {
    if (!isLoggedIn) return;

    const validationError = validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      setSuccessMessage("");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("");

    const externalMediaPayload = {
      source: media.source,
      media_type: media.mediaType,
      external_id: media.externalId,
      release_date: media.releaseDate
    };

    const res = await fetch("/api/media", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(externalMediaPayload),
    });

    const { id } = await res.json();

    const trackedMediaPayload = {
      mediaId: id,
      mediaType: media.mediaType,
      status: status || "plan",
      score: score === "" ? null : Number(score),
      hoursPlayed: hoursPlayed === "" ? null : hoursPlayed,
      episodesWatched: episodesWatched === "" ? null : episodesWatched,
      repeatCounter: repeatCount === "" ? null : repeatCount,
      // rewatches: rewatches === "" ? null : rewatches,
      // replays: replays === "" ? null : replays,
      startDate: startDate || null,
      finishDate: finishDate || null,
      review: review || null,
      podiumEnabled,
      podiumRank: podiumEnabled ? podiumRank : null,
    };

    if (!podiumEnabled && podiumRank !== null) {
      handleDeletePodium();
    }

    console.log("Save Changes payload:", trackedMediaPayload);

    await fetch("/api/media/user-tracked", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trackedMediaPayload),
    });

    setIsTracked(true);
    setSuccessMessage("Added to your tracked list.");
  };

  const handleCancel = () => {
    resetFormStates();
    onClose();
  };

  const handleDeleteTracked = async () => {
    if (!isLoggedIn || !media) return;

    setErrorMessage("");
    setSuccessMessage("");

    const payload = {
      mediaId: media.id,
      mediaType: media.mediaType,
    };

    console.log("Delete tracked payload:", payload);

    await fetch("/api/media/user-tracked", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setStatus("");
    setScore("");
    setHoursPlayed("");
    setEpisodesWatched("");
    setRepeatCount("");
    setStartDate("");
    setFinishDate("");
    setReview("");
    setPodiumRank("");
    setPodiumEnabled(false);
    setIsTracked(false);

    setSuccessMessage("Removed from your tracked list.");
  };

  const handleDeletePodium = async () => {
    if (!isLoggedIn || !media) return;

    setErrorMessage("");
    setSuccessMessage("");

    const payload = {
      mediaId: media.id,
      mediaType: media.mediaType,
      deletePodiumOnly: true,
    };

    await fetch("/api/media/user-tracked", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.content}>
          <div className={styles.contentTop}>
            <div className={styles.imageSection}>
              <div className={styles.imageWrapper}>
                <Image
                  src={media.imageUrl}
                  alt={media.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            <div className={styles.infoSection}>
              <h2 className={styles.title}>{media.title}</h2>

              <p>
                <strong>Type:</strong> {formatMediaType(media.mediaType)}
              </p>

              <p>
                <strong>Release Date:</strong> {formatDate(media.releaseDate)}
              </p>

              <div className={styles.synopsisBlock}>
                <strong>Synopsis:</strong>
                <p className={styles.synopsisText}>
                  {media.synopsis ?? "No synopsis available."}
                </p>
              </div>
            </div>
          </div>

          <div className={styles.contentBottom}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  disabled={!isLoggedIn}
                >
                  <option value="">Select status</option>
                  {getStatusOptions().map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.formGroup}>
                <label>Score</label>
                <div className={styles.scoreRow}>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    step={0.1}
                    value={score}
                    onChange={(e) => handleScoreChange(e.target.value)}
                    placeholder="-"
                    disabled={!isLoggedIn}
                    className={styles.scoreBox}
                  />

                  <div className={styles.podiumRow}>
                    <button
                      type="button"
                      onClick={handleTogglePodium}
                      disabled={!isLoggedIn}
                      className={styles.favoriteButton}
                    >
                      <Image
                        src={podiumEnabled ? "/heart1.png" : "/heart2.png"}
                        alt={
                          podiumEnabled
                            ? "Remove from favorites"
                            : "Add to favorites"
                        }
                        width={30}
                        height={30}
                      />
                    </button>

                    <select
                      value={podiumRank}
                      onChange={(e) =>
                        setPodiumRank(
                          e.target.value === "" ? "" : Number(e.target.value),
                        )
                      }
                      disabled={!isLoggedIn || !podiumEnabled}
                      className={styles.podiumInput}
                    >
                      <option value="">Add to Favorites</option>
                      <option value="1">No. 1</option>
                      <option value="2">No. 2</option>
                      <option value="3">No. 3</option>
                    </select>
                  </div>
                </div>
              </div>

              {showHoursPlayed && (
                <div className={styles.formGroup}>
                  <label>Hours Played</label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={hoursPlayed}
                    onChange={(e) =>
                      setHoursPlayed(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    placeholder="Enter hours played"
                    disabled={!isLoggedIn}
                  />
                </div>
              )}

              {showReplays && (
                <div className={styles.formGroup}>
                  <label>Replays</label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={repeatCount}
                    onChange={(e) =>
                      setRepeatCount(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    placeholder="Enter times played"
                    disabled={!isLoggedIn}
                  />
                </div>
              )}

              {showEpisodesWatched && (
                <div className={styles.formGroup}>
                  <label>
                    Episodes Watched
                    {media.totalEpisodes != null && ` / ${media.totalEpisodes}`}
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={media.totalEpisodes ?? undefined}
                    step={1}
                    value={episodesWatched}
                    onChange={(e) =>
                      setEpisodesWatched(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    placeholder="0"
                    disabled={!isLoggedIn}
                  />
                </div>
              )}

              {showRewatches && (
                <div className={styles.formGroup}>
                  <label>Rewatches</label>
                  <input
                    type="number"
                    min={0}
                    step={1}
                    value={repeatCount}
                    onChange={(e) =>
                      setRepeatCount(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    placeholder="0"
                    disabled={!isLoggedIn}
                  />
                </div>
              )}

              <div className={styles.formGroup}>
                <label>Start Date</label>
                <input
                  type="date"
                  value={startDate || ""}
                  onChange={(e) => setStartDate(e.target.value)}
                  disabled={!isLoggedIn}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Finish Date</label>
                <input
                  type="date"
                  value={finishDate || ""}
                  onChange={(e) => setFinishDate(e.target.value)}
                  disabled={!isLoggedIn}
                />
              </div>

              <div className={styles.mobilePodium}>
                <label>Add to podium</label>

                <div className={styles.podiumRowMobile}>
                  <button
                    type="button"
                    onClick={handleTogglePodium}
                    disabled={!isLoggedIn}
                    className={styles.favoriteButton}
                  >
                    <Image
                      src={podiumEnabled ? "/heart1.png" : "/heart2.png"}
                      alt={
                        podiumEnabled
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                      width={30}
                      height={30}
                    />
                  </button>

                  <select
                    value={podiumRank}
                    onChange={(e) =>
                      setPodiumRank(
                        e.target.value === "" ? "" : Number(e.target.value),
                      )
                    }
                    disabled={!isLoggedIn || !podiumEnabled}
                    className={styles.podiumInput}
                  >
                    <option value="">Rank</option>
                    <option value="1">No. 1</option>
                    <option value="2">No. 2</option>
                    <option value="3">No. 3</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={styles.notesGroup}>
              <label>Review</label>
              <textarea
                rows={10}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your thoughts here..."
                disabled={!isLoggedIn}
              />
            </div>
          </div>

          <div className={styles.messages}>
            {errorMessage && <p className={styles.errorText}>{errorMessage}</p>}

            {successMessage && (
              <p className={styles.successText}>{successMessage}</p>
            )}

            {!isLoggedIn && (
              <p className={styles.errorText}>Sign in to save changes.</p>
            )}
          </div>

          <div className={styles.buttonRow}>
            <button
              className={styles.saveButton}
              onClick={handleSaveChanges}
              disabled={!isLoggedIn}
            >
              Save
            </button>

            <button
              // type="button"
              className={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>

            {isTracked && (
              <button
                className={styles.saveButton}
                onClick={handleDeleteTracked}
                disabled={!isLoggedIn}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
