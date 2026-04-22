"use client";

import { useState } from "react";
import styles from "./fake-stats/fake_profile_stats.module.css";
import type { ProfileStatsResponse, StatsTab } from "@/services/profile/stats/getProfileStats";

// type ProfileStatsSectionProps = {
//   stats: ProfileStatsResponse;
// };

/*
  Labels what text should be shown for each tab
*/
const TAB_LABELS: Record<StatsTab, string> = {
  all: "All",
  movies: "Movies",
  shows: "Shows",
  games: "Games",
  books: "Books",
};

/*
  Ordered list of tabs used to render the tab buttons
*/
const STATS_TABS: StatsTab[] = ["all", "movies", "shows", "games", "books"];

function getTrackedCountLabel(tab: StatsTab): string {
  switch (tab) {
    case "all":
      return "Total Media";
    case "movies":
      return "Total Movies";
    case "shows":
      return "Total Shows";
    case "games":
      return "Total Games";
    case "books":
      return "Total Books";
    default:
      return "Total Media";
  }
}

export default function ProfileStatsClient({
  stats,
}: {stats: ProfileStatsResponse}) {
  const [activeTab, setActiveTab] = useState<StatsTab>("all");

  const { cards, formatDistribution, scoreDistribution } = stats;

  const activeTabStats = cards[activeTab];
  const activeScoreDistribution = scoreDistribution[activeTab];

  /*
    Find the largest score count so the tallest bar can be scaled
    to the chart's maximum height.The fallback value of 1 prevents Math.max 
    from failing if the current score array is empty.
  */
  const maxScoreCount = Math.max(
    ...activeScoreDistribution.map((scoreItem) => scoreItem.count),
    1,
  );

  return (
    <div className={styles.statsPanel}>
      {/* Section title and tab buttons */}
      <div className={styles.statsTopRow}>
        <h2 className={styles.statsSectionTitle}>Stats</h2>

        <div className={styles.statsFilterTabs}>
          {STATS_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              className={
                activeTab === tab
                  ? styles.statsFilterTabActive
                  : styles.statsFilterTab
              }
              onClick={() => setActiveTab(tab)}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.statsPageSection}>
        {/* Main summary card */}
        <div className={styles.statsSummaryCard}>
          <div className={styles.statsSummaryTop}>
            <div className={styles.statsSummaryMetric}>
              <div className={styles.statsSummaryValue}>
                {activeTabStats.totalTrackedCount}
              </div>
              <div className={styles.statsSummaryLabel}>
                {getTrackedCountLabel(activeTab)}
              </div>
            </div>

            <div className={styles.statsSummaryMetric}>
              <div className={styles.statsSummaryValue}>
                {activeTabStats.inProgressCount}
              </div>
              <div className={styles.statsSummaryLabel}>In Progress</div>
            </div>

            <div className={styles.statsSummaryMetric}>
              <div className={styles.statsSummaryValue}>
                {activeTabStats.averageScore !== null
                  ? activeTabStats.averageScore.toFixed(1)
                  : "-"}
              </div>
              <div className={styles.statsSummaryLabel}>Mean Score</div>
            </div>
          </div>

          {/* Completion-rate progress bar */}
          <div className={styles.statsSummaryBottom}>
            <div className={styles.statsProgressHeader}>
              <span className={styles.statsProgressTitle}>Completion Rate</span>
              <span className={styles.statsProgressValue}>
                {activeTabStats.completionRate.toFixed(1)}%
              </span>
            </div>

            <div className={styles.statsSummaryTrack}>
              <div
                className={styles.statsSummaryFill}
                style={{ width: `${activeTabStats.completionRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Smaller detail cards */}
        <div className={styles.statsMiniGridCompact}>
          {/* Status breakdown for the active tab */}
          <div className={styles.statsMiniCard}>
            <h4 className={styles.statsMiniTitle}>Status</h4>

            <div className={styles.statsLegendList}>
              <div className={styles.statsLegendRow}>
                <span className={styles.statsLegendLabel}>Completed</span>
                <span className={styles.statsLegendValue}>
                  {activeTabStats.completedCount}
                </span>
              </div>

              <div className={styles.statsLegendRow}>
                <span className={styles.statsLegendLabel}>Planning</span>
                <span className={styles.statsLegendValue}>
                  {activeTabStats.plannedCount}
                </span>
              </div>

              <div className={styles.statsLegendRow}>
                <span className={styles.statsLegendLabel}>In Progress</span>
                <span className={styles.statsLegendValue}>
                  {activeTabStats.inProgressCount}
                </span>
              </div>

              <div className={styles.statsLegendRow}>
                <span className={styles.statsLegendLabel}>Paused</span>
                <span className={styles.statsLegendValue}>
                  {activeTabStats.pausedCount}
                </span>
              </div>

              <div className={styles.statsLegendRow}>
                <span className={styles.statsLegendLabel}>Dropped</span>
                <span className={styles.statsLegendValue}>
                  {activeTabStats.droppedCount}
                </span>
              </div>
            </div>
          </div>

          {/* Overall format distribution across the user's tracked media */}
          <div className={styles.statsMiniCard}>
            <h4 className={styles.statsMiniTitle}>Format</h4>

            <div className={styles.statsLegendList}>
              {formatDistribution.map((formatItem) => (
                <div key={formatItem.label} className={styles.statsLegendRow}>
                  <span className={styles.statsLegendLabel}>
                    {formatItem.label}
                  </span>
                  <span className={styles.statsLegendValue}>
                    {formatItem.percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Score distribution for the active tab */}
          <div className={styles.statsChartCard}>
            <div className={styles.statsChartHeader}>
              <h3 className={styles.statsChartTitle}>Score</h3>
            </div>

            <div className={styles.statsBarChartCompact}>
              {activeScoreDistribution.map((scoreItem) => (
                <div key={scoreItem.score} className={styles.statsBarGroup}>
                  <div className={styles.statsBarValue}>{scoreItem.count}</div>

                  <div
                    className={styles.statsBar}
                    style={{
                      height: `${(scoreItem.count / maxScoreCount) * 95}px`,
                    }}
                  />

                  <div className={styles.statsBarLabel}>{scoreItem.score}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
