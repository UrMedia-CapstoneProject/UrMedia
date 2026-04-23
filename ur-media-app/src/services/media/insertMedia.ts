interface mediaPayload {
    source: string,
    media_type: string,
    external_id: string
    title: string,
    image_url?: string,
    release_date?: Date,
    next_release_date?: Date,
    synopsis?: string,
}

export async function insertMedia({
    supabase,
    payload,
}: {
    supabase: any,
    payload: mediaPayload
}) {
    console.log("Inserting media into media table")
    const { error } = await supabase.from('media').insert(payload, {
        ignoreDuplicates: true
    })

    if (error) throw new error(error.message);
}