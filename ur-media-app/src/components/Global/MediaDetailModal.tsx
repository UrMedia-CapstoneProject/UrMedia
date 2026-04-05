"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import styles from "./MediaDetailModal.module.css"
import type { MediaItem } from "../Media/MediaGrid"
import { createClient } from "@/lib/supabase/client"

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

type MediaDetailModalProps = {
  media: MediaItem | null
  isOpen: boolean
  onClose: () => void
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
  const [notes, setNotes] = useState("")
  const [podiumRank, setPodiumRank] = useState<number | "">("")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser()
      setIsLoggedIn(!!data.user)
    }

    checkUser()
  }, [supabase])

  useEffect(() => {
    if (!media) return

    setStatus("")
    setScore("")
    setHoursPlayed("")
    setEpisodesWatched("")
    setRewatches("")
    setStartDate("")
    setFinishDate("")
    setNotes("")
    setPodiumRank("")
    setErrorMessage("")
    setSuccessMessage("")
    setIsTracked(false)

    // Later, grab the data from supabase

  }, [media])

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

    const decimalPart = value.split(".")[1]
    if (decimalPart && decimalPart.length > 1) return

    setScore(value)
  }

  const changeScoreByStep = (amount: number) => {
    const current = score === "" ? 1 : Number(score)
    let next = current + amount

    if (next < 1) next = 1
    if (next > 10) next = 10

    setScore(next.toFixed(1))
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

    return ""
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
      notes: notes || null,
    }

    console.log("Save Changes payload:", payload)

    // Later, save the changes

    setIsTracked(true)
    setSuccessMessage("Added to your tracked list.")
  }

  const handleSavePodium = async () => {
    if (!isLoggedIn) return

    setErrorMessage("")
    setSuccessMessage("")

    const payload = {
      mediaId: media.id,
      mediaType: media.mediaType,
      podiumRank: podiumRank === "" ? null : podiumRank,
    }

    console.log("Save Podium payload:", payload)

    // Later: await fetch("/api/media/podium", { ... })

    setSuccessMessage(
      podiumRank === ""
        ? "Removed from podium."
        : `Saved as Top ${podiumRank}.`
    )
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

    setIsTracked(false)
    setStatus("")
    setScore("")
    setHoursPlayed("")
    setEpisodesWatched("")
    setRewatches("")
    setStartDate("")
    setFinishDate("")
    setNotes("")
    setSuccessMessage("Removed from your tracked list.")
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.content}>
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
              <strong>Release Date:</strong> {media.releaseDate ?? "N/A"}
            </p>

            <div className={styles.synopsisBlock}>
              <strong>Synopsis:</strong>
              <p>{media.synopsis ?? "No synopsis available."}</p>
            </div>

            {!isLoggedIn && (
              <p className={styles.errorText}>
                Sign in to save changes or update your podium.
              </p>
            )}

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
                    placeholder="1.0 - 10.0"
                    disabled={!isLoggedIn}
                  />
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
                    placeholder="Enter episodes watched"
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
                    placeholder="Enter rewatches"
                    disabled={!isLoggedIn}
                  />
                </div>
              )}

              <div className={styles.formGroup}>
                <label>Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  disabled={!isLoggedIn}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Finish Date</label>
                <input
                  type="date"
                  value={finishDate}
                  onChange={(e) => setFinishDate(e.target.value)}
                  disabled={!isLoggedIn}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Podium Rank</label>
                <select
                  value={podiumRank}
                  onChange={(e) =>
                    setPodiumRank(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  disabled={!isLoggedIn}
                >
                  <option value="">Not in Podium</option>
                  <option value="1">Top 1</option>
                  <option value="2">Top 2</option>
                  <option value="3">Top 3</option>
                </select>
              </div>
            </div>

            <div className={styles.notesGroup}>
              <label>Notes / Review</label>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write your thoughts here..."
                disabled={!isLoggedIn}
              />
            </div>

            {errorMessage && (
              <p className={styles.errorText}>{errorMessage}</p>
            )}

            {successMessage && (
              <p className={styles.successText}>{successMessage}</p>
            )}

            <div className={styles.buttonRow}>
              <button
                className={styles.saveButton}
                onClick={handleSaveChanges}
                disabled={!isLoggedIn}
              >
                Save Changes
              </button>

              <button
                className={styles.saveButton}
                onClick={handleSavePodium}
                disabled={!isLoggedIn}
              >
                Save Podium
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
    </div>
  )
}