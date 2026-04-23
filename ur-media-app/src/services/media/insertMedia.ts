interface mediaPayload {
    source: string,
    media_type: string,
    external_id: string
}

export async function insertMedia({
    supabase,
    payload,
}: {
    supabase: any,
    payload: mediaPayload
}) {
    console.log("Inserting media into media table")
    console.log(payload)
    const { data, error } = await supabase
        .from('media')
        .insert(payload)
        .select('id')
        .single();
        
    if (!error && data) {
        return data.id
    }

    const {data: existing, error: fetchError} = await supabase
        .from('media')
        .select('id')
        .eq('external_id', payload.external_id)
        .eq('media_type', payload.media_type)
        .single()

    if (fetchError) throw new Error(fetchError.message);
    return existing.id
}