import { createServiceRoleClient } from "@/lib/supabase/service-role";
import { isMetaDataOld } from "./isMetadataOld";
import { refreshMediaMetadata } from "@/services/media/refresh_popular_media/refreshMediaMetadata";
import type { MediaSource, MediaType } from "@/types/types";
import type { PopularMediaGroup, PopularTimeframe } from "@/types/types"

type PopularCacheJoinedRowRaw = {
  media_id: number;
  source: MediaSource;
  media_type: MediaType;
  external_id: string;
  media:
    | {
        metadata_updated_at: string | null;
      }[]
    | null;
};

type PopularCacheJoinedRow = {
  media_id: number;
  source: MediaSource;
  media_type: MediaType;
  external_id: string;
  media: {
    metadata_updated_at: string | null;
  } | null;
};

type RefreshPopularMediaCacheParams = {
  mediaGroup: PopularMediaGroup;
  timeframe: PopularTimeframe;
  staleAfterHours?: number;
};

export async function refreshPopularMediaCache({
  mediaGroup,
  timeframe,
  staleAfterHours = 24,
}: RefreshPopularMediaCacheParams) {
  const supabase = createServiceRoleClient();

  const { error: initialRefreshError } = await supabase.rpc(
    "refresh_popular_media_cache_new_copy",
    {
      target_media_group: mediaGroup,
      target_timeframe: timeframe,
    },
  );

  if (initialRefreshError) {
    throw new Error(
      `Initial popular_media_cache refresh failed: ${initialRefreshError.message}`,
    );
  }

  const { data: rows, error: rowsError } = await supabase
    .from("popular_media_cache_copy")
    .select(
      `
      media_id,
      source,
      media_type,
      external_id,
      media:media_id (
        metadata_updated_at
      )
    `,
    )
    .eq("media_group", mediaGroup)
    .eq("timeframe", timeframe);

  if (rowsError) {
    throw new Error(
      `Failed to load popular_media_cache rows: ${rowsError.message}`,
    );
  }

  const rawRows = (rows ?? []) as PopularCacheJoinedRowRaw[];

  const typedRows: PopularCacheJoinedRow[] = rawRows.map((row) => ({
    media_id: row.media_id,
    source: row.source,
    media_type: row.media_type,
    external_id: row.external_id,
    media: Array.isArray(row.media)
      ? (row.media[0] ?? null)
      : (row.media ?? null),
  }));

  let refreshedCount = 0;

  for (const row of typedRows) {
    const metadataUpdatedAt = row.media?.metadata_updated_at ?? null;

    // See data being pulled and verified
    // console.log("row:", row);
    // console.log("media_id:", row.media_id);
    // console.log("metadataUpdatedAt:", metadataUpdatedAt);
    // console.log("is stale:", isMetaDataOld(metadataUpdatedAt, staleAfterHours));

    if (isMetaDataOld(metadataUpdatedAt, staleAfterHours)) {
      await refreshMediaMetadata({
        supabase,
        media: {
          id: row.media_id,
          external_id: row.external_id,
          source: row.source,
          media_type: row.media_type,
        },
      });

      refreshedCount += 1;
    }
  }

  const { error: finalRefreshError } = await supabase.rpc(
    "refresh_popular_media_cache_new_copy",
    {
      target_media_group: mediaGroup,
      target_timeframe: timeframe,
    },
  );

  if (finalRefreshError) {
    throw new Error(
      `Final popular_media_cache refresh failed: ${finalRefreshError.message}`,
    );
  }

  return {
    success: true,
    mediaGroup,
    timeframe,
    checkedCount: typedRows.length,
    refreshedCount,
  };
}
