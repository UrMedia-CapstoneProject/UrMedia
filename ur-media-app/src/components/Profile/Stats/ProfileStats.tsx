import { createClient } from "@/lib/supabase/server";
import { getNormalizedProfileStatsRow } from "@/services/profile/stats/getProfileStats";
import ProfileStatsClient from "./ProfileStatsClient";

export default async function ProfileStats() {
  const supabase = await createClient();

  const { data: authorizedUser, error: authorizedError } =
    await supabase.auth.getUser();

  if (!authorizedUser || authorizedError) {
    return <div>Please Log in to view stats. </div>;
  }

  const stats = await getNormalizedProfileStatsRow(authorizedUser.user.id)

  return (
    <div>
      <ProfileStatsClient stats={stats} />
    </div>
  )
}
