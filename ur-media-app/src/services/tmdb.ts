import { TMDBError } from "@lorenzopant/tmdb";
import { tmdb } from "../lib/tmdb";

export async function getMovieDetails(id: number) {
  try {
    const res = await tmdb.movies.details({movie_id: id})
    return res
  } catch (err) {
    if (err instanceof TMDBError) {
      console.log(err.message);
      console.log(err.http_status_code);
      console.log(err.tmdb_status_code);
    }
  }
}

export async function searchMovies(title: string, page: number) {
  try {
    const res = await tmdb.search.movies({query: title, page: page});
    return res;
  } catch (err) {
    if (err instanceof TMDBError) {
      console.log(err.message);
      console.log(err.http_status_code);
      console.log(err.tmdb_status_code);
    }
  }
}

export async function getPopularMovies(page: number) {
  try {
    const res = await tmdb.movie_lists.popular({ page });
    return res
  } catch (err) {
    if (err instanceof TMDBError) {
      console.log(err.message);
      console.log(err.http_status_code);
      console.log(err.tmdb_status_code);
    }
  }
}

export async function getShowDetails(id: number) {
  try {
    const res = await tmdb.tv_series.details({series_id: id})
    return res
  } catch (err) {
    if (err instanceof TMDBError) {
      console.log(err.message);
      console.log(err.http_status_code);
      console.log(err.tmdb_status_code);
    }
  }
}

export async function searchShows(title: string, page: number) {
  try {
    const res = await tmdb.search.tv_series({query: title, page: page});
    return res;
  } catch (err) {
    if (err instanceof TMDBError) {
      console.log(err.message);
      console.log(err.http_status_code);
      console.log(err.tmdb_status_code);
    }
  }
}

export async function getPopularShows(page: number) {
  try {
    const res = await tmdb.tv_lists.popular({ page });
    return res;
  } catch (err) {
    if (err instanceof TMDBError) {
      console.log(err.message);
      console.log(err.http_status_code);
      console.log(err.tmdb_status_code);
    }
  }
}
