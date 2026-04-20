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

    if (file) {
        const fileExt = file.name.split(".").pop();
        const filePath = `${userId}/profile_pictures.${fileExt}`;
        console.log("uploading to database", filePath);

        const { error: uploadError } = await supabase.storage
            .from("profile_pics")
            .upload(filePath, file, { upsert: true });

        if (uploadError) {
            console.log(uploadError.message)
            throw new Error(uploadError.message)
        }

        await supabase
            .from("profiles")
            .update({ profile_picture: filePath })
            .eq("id", userId);
    }

    const { error } = await supabase
        .from("profiles")
        .update({
            username: username,
            birthday: birthday,
            biography: bio
        })
        .eq("id", userId)

    if (error) throw new Error(error.message);
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