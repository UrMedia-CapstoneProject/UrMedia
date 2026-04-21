export type UserSettingsPayload = {
    username: string;
    birthday: string | null;
    bio: string | null;
}

export async function updateUserSettings({
    supabase,
    userId,
    username,
    birthday,
    bio,
    file,
}: {
    supabase: any;
    userId: string;
    username: string;
    birthday: string;
    bio: string;
    file: File | null;
}) {
    let profilePicturePath: string | undefined;

    let oldProfilePicturePath: string | null = null;

    if (file) {
        const { data: currentProfile, error: fetchError } = await supabase
            .from("profiles")
            .select("profile_picture")
            .eq("id", userId)
            .single();

        if (fetchError) {
            throw new Error(fetchError.message);
        }

        oldProfilePicturePath = currentProfile?.profile_picture ?? null;

        const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
        profilePicturePath = `${userId}/avatar-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from("profile_pics")
            .upload(profilePicturePath, file, { upsert: false });

        if (uploadError) {
            throw new Error(uploadError.message);
        }
    }

    const updateData: Record<string, any> = {
        username,
        birthday,
        biography: bio,
    };

    if (profilePicturePath) {
        updateData.profile_picture = profilePicturePath;
    }

    const { error: updateError } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", userId);

    if (updateError) {
        throw new Error(updateError.message);
    }

    if (profilePicturePath && oldProfilePicturePath) {
        const { error: removeError } = await supabase.storage
            .from("profile_pics")
            .remove([oldProfilePicturePath]);

        if (removeError) {
            console.log("Failed to delete old avatar:", removeError.message);
        }
    }
}

export async function getUserSettings({
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

    let avatarUrl = null;

    if (data.profile_picture) {
        const { data: publicUrlData } = supabase
            .storage
            .from("profile_pics")
            .getPublicUrl(data.profile_picture);

        avatarUrl = publicUrlData.publicUrl;
    }

    return {
        ...data,
        avatarUrl,
    };
}

export async function deleteUserData({
    supabase,
    userId
}: {
    supabase: any,
    userId: string
}) {
    await supabase
        .from("profiles")
        .delete()
        .eq("id", userId)
}