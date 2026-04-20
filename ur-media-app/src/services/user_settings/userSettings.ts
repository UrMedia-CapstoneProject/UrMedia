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
}: {
    supabase: any;
    userId: string;
}) {
    const { data: data, error: settingsError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

    if (settingsError) {
        throw new Error(settingsError.message);
    }

    return data
}

export async function deleteUserData ({
    supabase,
    userId
} : {
    supabase: any,
    userId: string
}) {
    await supabase
        .from("profiles")
        .delete()
        .eq("id", userId)
}