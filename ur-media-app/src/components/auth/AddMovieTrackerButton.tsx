'use client'

import { createClient } from '@/lib/supabase/client'

export default function TestMovies() {
  const supabase = createClient()

  const addMovie = async () => {
    const { data: userData } = await supabase.auth.getUser()
    console.log(userData.user?.id)

    if (!userData.user) {
      console.log('No user logged in')
      return
    }

    const { error } = await supabase.from('UserTrackedMovies').insert({
      user_id: userData.user.id,
      MovieID: 12345, // test ID
      watch_status: 'Watching',
    })

    if (error) {
      console.error('Insert error:', error.message)
    } else {
      console.log('Movie added!')
    }
  }

  const getMovies = async () => {
    const { data, error } = await supabase
      .from('UserTrackedMovies')
      .select('*')

    if (error) {
      console.error('Fetch error:', error.message)
    } else {
      console.log('Your movies:', data)
    }
  }

  return (
    <div className="mt-6 space-y-2">
      <button onClick={addMovie} className="px-4 py-2 bg-green-500 text-white">
        Add Test Movie
      </button>

      <button onClick={getMovies} className="px-4 py-2 bg-blue-500 text-white">
        Get My Movies
      </button>
    </div>
  )
}