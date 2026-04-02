'use client'

import { useState } from 'react'

type Props = {
  tmdbId: number
  title: string
  imageUrl?: string | null
  releaseDate?: string | null
}

export default function AddMovieTrackerButton({
  tmdbId,
  title,
  imageUrl,
  releaseDate,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleAddMovie = async () => {
    try {
      setLoading(true)
      setMessage(null)

      const res = await fetch('/api/tracked/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          externalId: tmdbId,
          title,
          imageUrl,
          releaseDate,
          watchStatus: 'Plan to Watch',
          follow: true,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage(data.error ?? 'Failed to add movie')
        return
      }

      setMessage('Added to tracker ✅')
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'Something went wrong'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button onClick={handleAddMovie} disabled={loading}>
        {loading ? 'Adding...' : 'Add Movie'}
      </button>

      {message && <p>{message}</p>}
    </div>
  )
}