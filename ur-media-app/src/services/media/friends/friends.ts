import { FriendTrackedMedia } from "@/types/types";

export type addFriendPayload = {
    friend: string
}

export async function getFriendInfo ({
    supabase,
    userId
}: {
    supabase: any;
    userId: string;
}): Promise<FriendTrackedMedia[]> {

    const { data: friendIds, error: friendError } = await supabase
        .from("friends")
        .select("following_id")
        .eq("follower_id", userId)
    
    if (friendError) {throw new Error(friendError.message)}

    const friendInfo: FriendTrackedMedia[] = await Promise.all(
        friendIds.map(async ({ following_id }: { following_id: string }) => {
            const { data: username, error: usernameError } = await supabase
                .from("profiles")
                .select("username")
                .eq("id", following_id)
                .single()

            if (usernameError) {throw new Error(usernameError.message)}

            const { data: animes, error: animeError } = await supabase
                .from("user_tracked_animes")
                .select("watch_status", "rating", "episodes_watched", "review", "updated_at")
                .eq("user_id", following_id)
                .order("updated_at", { ascending: false }).limit(1)

            if (animeError) {throw new Error(animeError.message)}

            const { data: books, error: bookError } = await supabase
                .from("user_tracked_books")
                .select("watch_status", "rating", "repeat_count", "review", "updated_at")
                .eq("user_id", following_id)
                .order("updated_at", { ascending: false }).limit(1)

            if (bookError) {throw new Error(bookError.message)}

            const { data: games, error: gameError } = await supabase
                .from("user_tracked_games")
                .select("watch_status", "rating", "hours_played", "review", "updated_at")
                .eq("user_id", following_id)
                .order("updated_at", { ascending: false }).limit(1)

            if (gameError) {throw new Error(gameError.message)}

            const { data: movies, error: movieError } = await supabase
                .from("user_tracked_movies")
                .select("watch_status", "rating", "repeat_count", "review", "updated_at")
                .eq("user_id", following_id)
                .order("updated_at", { ascending: false }).limit(1)

            if (movieError) {throw new Error(movieError.message)}

            const { data: shows, error: showError } = await supabase
                .from("user_tracked_shows")
                .select("watch_status", "rating", "episodes_watched", "review", "updated_at")
                .eq("user_id", following_id)
                .order("updated_at", { ascending: false }).limit(1)

            if (showError) {throw new Error(showError.message)}

            if (animes.updated_at > books.updated_at 
                && animes.updated_at > games.updated_at 
                && animes.updated_at > movies.updated_at 
                && animes.updated_at > shows.updated_at) {
                    return {
                        username: username,
                        status: animes.watch_status,
                        date: animes.updated_at,
                        rating: animes.rating,
                        review: animes.review,
                        quantityConsumed: animes.episodes_watched
                    };
                }
            if (books.updated_at > animes.updated_at 
                && books.updated_at > games.updated 
                && books.updated_at > movies.updated_at 
                && books.updated_at > shows.updated_at) {
                    return {
                        username: username,
                        status: books.watch_status,
                        date: books.updated_at,
                        rating: books.rating,
                        review: books.review,
                        quantityConsumed: books.repeat_count
                    }
                }
            if (games.updated_at > animes.updated_at 
                && games.updated_at > books.updated_at 
                && games.updated_at > movies.updated_at 
                && games.updated_at > shows.updated_at) {
                    return {
                        username: username,
                        status: games.watch_status,
                        date: games.updated_at,
                        rating: games.rating,
                        review: games.review,
                        quantityConsumed: games.hours_played
                    }
                }
            if (movies.updated_at > animes.updated_at 
                && movies.updated_at > books.updated_at 
                && movies.updated_at > games.updated_at 
                && movies.updated_at > shows.updated_at) {
                    return {
                        username: username,
                        status: movies.watch_status,
                        date: movies.updated_at,
                        rating: movies.rating,
                        review: movies.review,
                        quantityConsumed: movies.repeat_count
                    }
                }
            if (shows.updated_at > animes.updated_at 
                && shows.updated_at > books.updated_at 
                && shows.updated_at > games.updated_at 
                && shows.updated_at > movies.updated_at) {
                    return {
                        username: username,
                        status: shows.watch_status,
                        date: shows.updated_at,
                        rating: shows.rating,
                        review: shows.review,
                        quantityConsumed: shows.episodes_watched
                    }
                }
        })
    )
    return friendInfo;
}

export async function addFriend ({
    supabase,
    userId,
    payload
}: {
    supabase: any;
    userId: string;
    payload: addFriendPayload;
}) {
    const { data: friendData, error: findError } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", payload.friend)
        .maybeSingle()

    if (findError) {
        throw new Error(findError.message);
    }

    const { error: addError } = await supabase
        .from("friends")
        .insert({
            follower_id: userId,
            following_id: friendData.id
        })

    if (addError) {
        throw new Error(addError.message);
    }
}