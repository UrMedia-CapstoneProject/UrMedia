"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import styles from "./MediaDetailModal.module.css"
import type { MediaItem } from "../Media/MediaGrid"
import { createClient } from "@/lib/supabase/client"

type MediaDetailModalProps = {
  media: MediaItem | null
  isOpen: boolean
  onClose: () => void
}

export function formatMediaType(mediaType?: string) {
  switch (mediaType) {
    case "movie": {
      return "Movie"
    }
    case "show": {
      return "Show"
    }
    case "anime_movie": {
      return "Anime Movie"
    }
    case "anime_show": {
      return "Anime Show"
    }
    case "game": {
      return "Game"
    }
    case "book": {
      return "Book"
    }
  }
}

export function formatDate(releaseDate?: string | null) {
  if (!releaseDate) return "N/A" // This handles the issue with Date() can't take a null or undefined value. This is will act as default value.
  const date = new Date(releaseDate)

  return date.toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default function MediaDetailModal({
  media,
  isOpen,
  onClose,
}: MediaDetailModalProps) {
  const supabase = createClient()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isTracked, setIsTracked] = useState(false)

  const [status, setStatus] = useState("")
  const [score, setScore] = useState("")
  const [hoursPlayed, setHoursPlayed] = useState<number | "">("")
  const [episodesWatched, setEpisodesWatched] = useState<number | "">("")
  const [rewatches, setRewatches] = useState<number | "">("")
  const [startDate, setStartDate] = useState("")
  const [finishDate, setFinishDate] = useState("")
  const [review, setReview] = useState("")
  const [podiumEnabled, setPodiumEnabled] = useState(false)
  const [podiumRank, setPodiumRank] = useState<number | "">("")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    if (!media || !isOpen || !media.mediaType) return

    const loadTrackedData = async () => {
      try {
        const response = await fetch(
          `/api/media/user-tracked?mediaId=${media.id}&mediaType=${media.mediaType}`
        )

        const data = await response.json()

        if (!response.ok) {
          setErrorMessage(data.error || "Failed to load tracked data.")
          return
        }
        console.log(data)

        setIsTracked(true)
        setStatus(data.status ?? "")
        setScore(data.score ?? "")
        setHoursPlayed(data.hoursPlayed ?? "")
        setEpisodesWatched(data.episodesWatched ?? "")
        setRewatches(data.rewatches ?? "")
        setStartDate(data.startDate ?? "")
        setFinishDate(data.finishDate ?? "")
        setReview(data.review ?? "")
        setPodiumEnabled(data.podiumEnabled ?? false) // how do i return 'true' or 'false' for if media item is a favorite or not?
        setPodiumRank(data.podiumRank ?? "")
        //setSuccessMessage()
      } catch (error) {
        console.error("Failed to laod the user tracked data", error)
        setErrorMessage("Failed to load the user tracked data.")
      }

    }


    loadTrackedData()
  }, [media, isOpen])

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      setIsLoggedIn(!!data.user)
    }

    checkUser()
  }, [supabase])

  // useEffect(() => {
  //   if (!media) return

  //   setStatus("")
  //   setScore("")
  //   setHoursPlayed("")
  //   setEpisodesWatched("")
  //   setRewatches("")
  //   setStartDate("")
  //   setFinishDate("")
  //   setReview("")
  //   setPodiumRank("")
  //   setPodiumEnabled(false)
  //   setErrorMessage("")
  //   setSuccessMessage("")
  //   setIsTracked(false)

  //   // Later, grab the data from supabase

  // }, [media])

  if (!isOpen || !media) return null

  const isGame = media.mediaType === "game"
  const isBook = media.mediaType === "book"
  const isShow =
    media.mediaType === "show" || media.mediaType === "anime_show"
  const isMovie =
    media.mediaType === "movie" || media.mediaType === "anime_movie"

  const showHoursPlayed = isGame
  const showEpisodesWatched = isShow
  const showRewatches = isMovie || isShow

  const getStatusOptions = () => {
    if (isGame) {
      return [
        { value: "plan", label: "Plan to Play" },
        { value: "playing", label: "Playing" },
        { value: "replaying", label: "Replaying" },
        { value: "paused", label: "Paused" },
        { value: "completed", label: "Completed" },
        { value: "dropped", label: "Dropped" },
      ]
    }

    if (isBook) {
      return [
        { value: "plan", label: "Plan to Read" },
        { value: "reading", label: "Reading" },
        { value: "rereading", label: "Rereading" },
        { value: "paused", label: "Paused" },
        { value: "completed", label: "Completed" },
        { value: "dropped", label: "Dropped" },
      ]
    }

    if (isMovie) {
      return [
        { value: "plan", label: "Plan to Watch" },
        { value: "paused", label: "Paused" },
        { value: "completed", label: "Completed" },
        { value: "dropped", label: "Dropped" },
      ]
    }

    return [
      { value: "plan", label: "Plan to Watch" },
      { value: "watching", label: "Watching" },
      { value: "rewatching", label: "Rewatching" },
      { value: "paused", label: "Paused" },
      { value: "completed", label: "Completed" },
      { value: "dropped", label: "Dropped" },
    ]
  }

  const handleScoreChange = (value: string) => {
    if (value === "") {
      setScore("")
      return
    }

    const num = Number(value)

    if (isNaN(num)) return
    if (num < 1 || num > 10) return

    setScore(value)
  }

  const formatScore = () => {
    if (score === "") return

    const num = Number(score)
    if (isNaN(num)) return
    setScore(num.toFixed(1))
  }

  const validateForm = () => {
    if (score !== "") {
      const num = Number(score)

      if (isNaN(num) || num < 1 || num > 10) {
        return "Score must be between 1.0 and 10.0."
      }

      const decimalPart = score.split(".")[1]
      if (decimalPart && decimalPart.length > 1) {
        return "Score can only have one decimal place."
      }
    }

    if (hoursPlayed !== "" && Number(hoursPlayed) < 0) {
      return "Hours played cannot be negative."
    }

    if (episodesWatched !== "" && Number(episodesWatched) < 0) {
      return "Episodes watched cannot be negative."
    }

    if (rewatches !== "" && Number(rewatches) < 0) {
      return "Rewatches cannot be negative."
    }

    if (
      showEpisodesWatched &&
      episodesWatched !== "" &&
      media.totalEpisodes != null &&
      Number(episodesWatched) > media.totalEpisodes
    ) {
      return `Episodes watched cannot be more than ${media.totalEpisodes}.`
    }

    if (
      startDate &&
      finishDate &&
      new Date(finishDate) < new Date(startDate)
    ) {
      return "Finish date cannot be before start date."
    }

    if (podiumEnabled && podiumRank === "") {
      return "Please select a podium rank."
    }
  }

  const handleTogglePodium = () => {
    if (!isLoggedIn) return

    if (podiumEnabled) {
      setPodiumEnabled(false)
      setPodiumRank("")
    } else {
      setPodiumEnabled(true)

      if (podiumRank === "") {
        setPodiumRank(1)
      }
    }
  }


  const handleSaveChanges = async () => {
    if (!isLoggedIn) return

    const validationError = validateForm()

    if (validationError) {
      setErrorMessage(validationError)
      setSuccessMessage("")
      return
    }

    setErrorMessage("")
    setSuccessMessage("")

    const payload = {
      mediaId: media.id,
      mediaType: media.mediaType,
      status: status || null,
      score: score === "" ? null : Number(score).toFixed(1),
      hoursPlayed: hoursPlayed === "" ? null : hoursPlayed,
      episodesWatched: episodesWatched === "" ? null : episodesWatched,
      rewatches: rewatches === "" ? null : rewatches,
      startDate: startDate || null,
      finishDate: finishDate || null,
      review: review || null,
      podiumEnabled,
      podiumRank: podiumEnabled ? podiumRank : null,
    }

    console.log("Save Changes payload:", payload)

    // Later, save the changes
     // await fetch("/api/media/untrack", { ... })

    setIsTracked(true)
    setSuccessMessage("Added to your tracked list.")
  }

  const handleCancel = () => {
    setErrorMessage("")
    setSuccessMessage("")
    onClose()
  }

  const handleDeleteTracked = async () => {
    if (!isLoggedIn || !media) return

    setErrorMessage("")
    setSuccessMessage("")

    const payload = {
      mediaId: media.id,
      mediaType: media.mediaType,
    }

    console.log("Delete tracked payload:", payload)

    // Later:
    // await fetch("/api/media/untrack", { ... })

    setStatus("")
    setScore("")
    setHoursPlayed("")
    setEpisodesWatched("")
    setRewatches("")
    setStartDate("")
    setFinishDate("")
    setReview("")
    setPodiumRank("")
    setPodiumEnabled(false)
    setIsTracked(false)

    setSuccessMessage("Removed from your tracked list.")
  }

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
                {/* <strong>Release Date:</strong> {media.releaseDate ?? "N/A"} */}
                <strong>Release Date:</strong> {formatDate(media.releaseDate)}
              </p>

              <div className={styles.synopsisBlock}>
                <strong>Synopsis:</strong>
                <p className={styles.synopsisText}>{media.synopsis ?? "No synopsis available."}</p>
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
                        alt={podiumEnabled ? "Remove from favorites" : "Add to favorites"}
                        width={30}
                        height={30}
                      />
                    </button>


                    <select
                      value={podiumRank}
                      onChange={(e) =>
                        setPodiumRank(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                      disabled={!isLoggedIn || !podiumEnabled}
                      className={styles.podiumInput}
                    >
                      <option value="">Add to Favorites</option>
                      <option value="1">Top 1</option>
                      <option value="2">Top 2</option>
                      <option value="3">Top 3</option>
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
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    placeholder="Enter hours played"
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
                        e.target.value === "" ? "" : Number(e.target.value)
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
                    value={rewatches}
                    onChange={(e) =>
                      setRewatches(
                        e.target.value === "" ? "" : Number(e.target.value)
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
            {errorMessage && (
              <p className={styles.errorText}>{errorMessage}</p>
            )}

            {successMessage && (
              <p className={styles.successText}>{successMessage}</p>
            )}

            {!isLoggedIn && (
              <p className={styles.errorText}>
                Sign in to save changes.
              </p>
            )}
          </div>

          <div className={styles.buttonRow}>
            <button
              className={styles.saveButton}
              onClick={handleSaveChanges}
              disabled={!isLoggedIn}
            >
              Save Changes
            </button>

            <button
              // type="button"
              className={styles.saveButton}
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
  )
}