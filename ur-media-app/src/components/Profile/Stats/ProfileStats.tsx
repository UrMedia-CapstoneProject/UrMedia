import { createClient } from "@/lib/supabase/server";
import {
  getProfileStats,
  ProfileStatsResponse,
} from "@/services/profile/stats/getProfileStats";
import ProfileStatsClient from "./ProfileStatsClient";

const emptyStats: ProfileStatsResponse = {
  // Empty return for if the user isn't logged in
  cards: {
    all: {
      totalTrackedCount: 0,
      plannedCount: 0,
      inProgressCount: 0,
      completedCount: 0,
      pausedCount: 0,
      droppedCount: 0,
      averageScore: null,
      completionRate: 0,
    },
    movies: {
      totalTrackedCount: 0,
      plannedCount: 0,
      inProgressCount: 0,
      completedCount: 0,
      pausedCount: 0,
      droppedCount: 0,
      averageScore: null,
      completionRate: 0,
    },
    shows: {
      totalTrackedCount: 0,
      plannedCount: 0,
      inProgressCount: 0,
      completedCount: 0,
      pausedCount: 0,
      droppedCount: 0,
      averageScore: null,
      completionRate: 0,
    },
    games: {
      totalTrackedCount: 0,
      plannedCount: 0,
      inProgressCount: 0,
      completedCount: 0,
      pausedCount: 0,
      droppedCount: 0,
      averageScore: null,
      completionRate: 0,
    },
    books: {
      totalTrackedCount: 0,
      plannedCount: 0,
      inProgressCount: 0,
      completedCount: 0,
      pausedCount: 0,
      droppedCount: 0,
      averageScore: null,
      completionRate: 0,
    },
  },
  formatDistribution: [
    { label: "Movie", count: 0, percent: 0 },
    { label: "Show", count: 0, percent: 0 },
    { label: "Game", count: 0, percent: 0 },
    { label: "Book", count: 0, percent: 0 },
  ],
  scoreDistribution: {
    all: [],
    movies: [],
    shows: [],
    games: [],
    books: [],
  },
};

export default async function ProfileStats() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div>
        <ProfileStatsClient stats={emptyStats} isLoggedIn={false} />
      </div>
    );
  }

  const stats = await getProfileStats(user.id);

  return (
    <div>
      <ProfileStatsClient stats={stats} isLoggedIn={true} />
    </div>
  );
}
