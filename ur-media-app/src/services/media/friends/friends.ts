export type addFriendPayload = {
    friend: string
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