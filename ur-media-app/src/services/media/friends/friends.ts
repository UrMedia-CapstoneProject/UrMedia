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
                .select("watch_status, rating, episodes_watched, review, updated_at, media(source, media_type, external_id)")
                .eq("user_id", following_id)
                .order("updated_at", { ascending: false })
                .limit(1)

            if (animeError) {throw new Error(animeError.message)}

            const { data: books, error: bookError } = await supabase
                .from("user_tracked_books")
                .select("watch_status, rating, repeat_count, review, updated_at, media(source, media_type, external_id)")
                .eq("user_id", following_id)
                .order("updated_at", { ascending: false })
                .limit(1)

            if (bookError) {throw new Error(bookError.message)}

            const { data: games, error: gameError } = await supabase
                .from("user_tracked_games")
                .select("watch_status, rating, hours_played, review, updated_at, media(source, media_type, external_id)")
                .eq("user_id", following_id)
                .order("updated_at", { ascending: false })
                .limit(1)

            if (gameError) {throw new Error(gameError.message)}

            const { data: movies, error: movieError } = await supabase
                .from("user_tracked_movies")
                .select("watch_status, rating, repeat_count, review, updated_at, media(source, media_type, external_id)")
                .eq("user_id", following_id)
                .order("updated_at", { ascending: false })
                .limit(1)

            if (movieError) {throw new Error(movieError.message)}

            const { data: shows, error: showError } = await supabase
                .from("user_tracked_shows")
                .select("watch_status, rating, episodes_watched, review, updated_at, media(source, media_type, external_id)")
                .eq("user_id", following_id)
                .order("updated_at", { ascending: false })
                .limit(1)

            if (showError) {throw new Error(showError.message)}

            const allMedia = [
                animes[0] && {username: username.username,
                    status: animes[0].watch_status, 
                    date: animes[0].updated_at, 
                    rating: animes[0].rating, 
                    review: animes[0].review, 
                    quantityConsumed: animes[0].episodes_watched,
                    media: {
                        source: animes[0].media.source,
                        media_type: animes[0].media.media_type,
                        external_id: animes[0].media.external_id
                    }},
                books[0] && {username: username.username, 
                    status: books[0].watch_status,
                    date: books[0].updated_at,
                    rating: books[0].rating,
                    review: books[0].review,
                    quantityConsumed: books[0].repeat_count,
                    media: {
                        source: books[0].media.source,
                        media_type: books[0].media.media_type,
                        external_id: books[0].media.external_id
                    }},
                games[0] && {username: username.username,
                    status: games[0].watch_status,
                    date: games[0].updated_at,
                    rating: games[0].rating,
                    review: games[0].review,
                    quantityConsumed: games[0].hours_played,
                    media: {
                        source: games[0].media.source,
                        media_type: games[0].media.media_type,
                        external_id: games[0].media.external_id
                    }},
                movies[0] && {username: username.username,
                    status: movies[0].watch_status,
                    date: movies[0].updated_at,
                    rating: movies[0].rating,
                    review: movies[0].review,
                    quantityConsumed: movies[0].repeat_count,
                    media: {
                        source: movies[0].media.source,
                        media_type: movies[0].media.media_type,
                        external_id: movies[0].media.external_id
                    }},
                shows[0] && {username: username.username,
                    status: shows[0].watch_status,
                    date: shows[0].updated_at,
                    rating: shows[0].rating,
                    review: shows[0].review,
                    quantityConsumed: shows[0].episodes_watched,
                    media: {
                        source: shows[0].media.source,
                        media_type: shows[0].media.media_type,
                        external_id: shows[0].media.external_id
                    }}
            ].filter(Boolean);

            const mostRecent = allMedia.sort((a, b) => 
                new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
            )[0];

            if (!mostRecent) {
                return ""
            }

            return {
                username: username.username,
                status: mostRecent.status,
                date: mostRecent.date,
                rating: mostRecent.rating,
                review: mostRecent.review,
                quantityConsumed: mostRecent.quantityConsumed,
                media: {
                    source: mostRecent.media.source,
                    media_type: mostRecent.media.media_type,
                    external_id: mostRecent.media.external_id
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