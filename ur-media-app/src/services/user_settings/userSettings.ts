export type UserSettingsPayload = {
    username: string;
    birthday: string | null;
    bio: string | null;
}

export async function updateUserSettings ({
    supabase,
    userId,
    payload
}: {
    supabase: any;
    userId: string;
    payload: UserSettingsPayload;
}) {

    const { error } = await supabase
    .from("profiles")
    .update({
        username: payload.username,
        birthday: payload.birthday,
        biography: payload.bio
    })
    .eq("id", userId)

    if (error) throw new Error(error.message);
}

export async function getUserSettings ({
    supabase,
    userId,
}:
)