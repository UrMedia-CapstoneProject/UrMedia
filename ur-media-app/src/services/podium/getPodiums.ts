import { createClient } from "@/lib/supabase/server";
import { getPosterUrl } from "./getPosterUrl";

type RawPodiumRow = {
    media_id: number;
    podium_group: string;
    placement: number;
    media: {
        source: string;
        media_type: string;
        external_id: string;
    } | null;
};

export type PodiumItem = {
    mediaId: number;
    podiumGroup: string;
    placement: number;
    source: string;
    mediaType: string;
    externalId: string;
    posterUrl: string | null;
};

export default async function getPodiums(): Promise<PodiumItem[]> {
    const supabase = await createClient();

    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
        return [];
    }

    const { data, error } = await supabase
        .from("user_podium")
        .select(`
      media_id,
      podium_group,
      placement,
      media:media_id (
        source,
        media_type,
        external_id
      )
    `)
        .eq("user_id", user.id)
        .order("podium_group", { ascending: true })
        .order("placement", { ascending: true });

    if (error || !data) {
        console.error("Error fetching podiums:", error);
        return [];
    }

    const rows = data as unknown as RawPodiumRow[];

    console.log("rows after cast:", rows);

    const result = await Promise.all(
        rows.map(async (row) => {
            const media = row.media;
            if (!media) return null;
            console.log("media row inside of the result", media)

            const posterUrl = await getPosterUrl({
                source: media.source,
                mediaType: media.media_type,
                externalId: media.external_id,
            });

            return {
                mediaId: row.media_id,
                podiumGroup: row.podium_group,
                placement: row.placement,
                source: media.source,
                mediaType: media.media_type,
                externalId: media.external_id,
                posterUrl,
            };
        })
    );

    return result.filter((item): item is PodiumItem => item !== null);
}