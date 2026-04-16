import styles from "./Catalog.module.css";
import MediaFilters from "@/components/Catalog/MediaFilters";
import Poster from "@/components/Global/Poster";
import { getPopularMovies, getPopularShows } from "@/services/tmdb";
import { getPopularGames } from "@/services/rawg";
import { Game } from "@/types/types";
import { MovieResultItem, TVSeriesResultItem } from "@lorenzopant/tmdb";
import { redirect } from "next/navigation";

export interface CatalogProps {
    searchParams?: {
        page?: string;
        category?: string;
    };
}
interface MediaResultItems {
    movies?: MovieResultItem[];
    shows?: TVSeriesResultItem[];
    games?: Game[]
}

export default async function Catalog({ searchParams }: CatalogProps) {
    const params = await searchParams;
    const category = params?.category;
    const page = Number(params?.page || 1);

    let media: MediaResultItems = {};
    let posters;
    if (!category) {
        redirect("/catalog?category=movies");
    }

    if (category == "movies") {
        const response = await getPopularMovies(page);
        media.movies = response?.results || [];

        posters = media.movies?.map((movie) => (
            <Poster
                key={movie.id}
                title={movie.title}
                imageUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}` || ""}
            />
        ));
    } else if (category == "shows") {
        const response = await getPopularShows(page);
        media.shows = response?.results || [];

        posters = media.shows.map((show) => (
            <Poster
                key={show.id}
                title={show.name}
                imageUrl={`https://image.tmdb.org/t/p/w500/${show.poster_path}` || ""}
            />
        ));
    } else if (category == "games") {
        const response = await getPopularGames(page.toString(), '80,100');
        media.games = response.results

        posters = media.games.map((game) => (
            <Poster
                key={game.id}
                title={game.name}
                imageUrl={game.background_image}
            />
        ));
    }

    return (
        <div className={styles.main}>
            <MediaFilters />
            <div className={styles.mediaGrid}>{posters}</div>
        </div>
    );
}