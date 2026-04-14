"use client"

import { useMemo, useState } from "react"
import styles from "./fake-stats/fake_profile_stats.module.css"
import { profileStatsDemoData } from "./fake-stats/fake_profile_stats"

type StatsFilter = "all" | "movies" | "shows" | "games" | "books"

type DistributionItem = {
  label: string
  value: number
}

type ReleaseYearItem = {
  year: number
  titlesWatched: number
}

function getLengthChartTitle(mediaType: StatsFilter) {
  switch (mediaType) {
    case "movies":
      return "Runtime Distribution"
    case "shows":
      return "Episode Count"
    case "games":
      return "Hours Played Range"
    case "books":
      return "Page Count"
    default:
      return "Length Distribution"
  }
}

function getSummaryLabel(filter: StatsFilter) {
  switch (filter) {
    case "movies":
      return "Total Movies"
    case "shows":
      return "Total Shows"
    case "games":
      return "Total Games"
    case "books":
      return "Total Books"
    default:
      return "Total Media"
  }
}

function combineByLabel(items: DistributionItem[]) {
  const map = new Map<string, number>()

  for (const item of items) {
    map.set(item.label, (map.get(item.label) ?? 0) + item.value)
  }

  return Array.from(map.entries()).map(([label, value]) => ({
    label,
    value,
  }))
}

function combineReleaseYears(items: ReleaseYearItem[]) {
  const map = new Map<number, number>()

  for (const item of items) {
    map.set(item.year, (map.get(item.year) ?? 0) + item.titlesWatched)
  }

  return Array.from(map.entries())
    .map(([year, titlesWatched]) => ({
      year,
      titlesWatched,
    }))
    .sort((a, b) => a.year - b.year)
}

export default function Stats() {
  const [selectedFilter, setSelectedFilter] = useState<StatsFilter>("all")

  const tabs: StatsFilter[] = ["all", "movies", "shows", "games", "books"]

  const data = useMemo(() => {
    if (selectedFilter !== "all") {
      return profileStatsDemoData[selectedFilter]
    }

    const allGroups = Object.values(profileStatsDemoData)

    const totalCount = allGroups.reduce(
      (sum, group) => sum + group.summary.totalCount,
      0
    )

    const totalTimeValue = allGroups.reduce(
      (sum, group) => sum + group.summary.timeValue,
      0
    )

    const meanScoreAverage =
      allGroups.reduce((sum, group) => sum + group.summary.meanScore, 0) /
      allGroups.length

    const progressAverage =
      allGroups.reduce((sum, group) => sum + group.summary.progressPercent, 0) /
      allGroups.length

    return {
      mediaType: "all",
      summary: {
        totalCount,
        totalLabel: "Total Media",
        timeValue: Number(totalTimeValue.toFixed(1)),
        timeLabel: "Combined Time",
        meanScore: Number(meanScoreAverage.toFixed(1)),
        progressPercent: Number(progressAverage.toFixed(1)),
      },
      scoreDistribution: combineByLabel(
        allGroups.flatMap((group) => group.scoreDistribution)
      ),
      lengthDistribution: combineByLabel(
        allGroups.flatMap((group) => group.lengthDistribution)
      ),
      formatDistribution: combineByLabel(
        allGroups.flatMap((group) => group.formatDistribution)
      ),
      statusDistribution: combineByLabel(
        allGroups.flatMap((group) => group.statusDistribution)
      ),
      countryDistribution: combineByLabel(
        allGroups.flatMap((group) => group.countryDistribution)
      ),
      releaseYearDistribution: combineReleaseYears(
        allGroups.flatMap((group) => group.releaseYearDistribution)
      ),
    }
  }, [selectedFilter])

  const scoreMax = Math.max(...data.scoreDistribution.map((item) => item.value), 1)
  const lengthMax = Math.max(...data.lengthDistribution.map((item) => item.value), 1)
  const releaseYearMax = Math.max(
    ...data.releaseYearDistribution.map((item) => item.titlesWatched),
    1
  )

  return (
    // Original Return
    // <div className={styles.statBox}>
    //     <h1>Stats section</h1>
    // </div>
    <div className={styles.statsPanel}>
      <div className={styles.statsTopRow}>
        <h2 className={styles.statsSectionTitle}>Stats</h2>

        <div className={styles.statsFilterTabs}>
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              className={
                selectedFilter === tab
                  ? styles.statsFilterTabActive
                  : styles.statsFilterTab
              }
              onClick={() => setSelectedFilter(tab)}
            >
              {tab === "all"
                ? "All"
                : tab === "movies"
                  ? "Movies"
                  : tab === "shows"
                    ? "Shows"
                    : tab === "games"
                      ? "Games"
                      : "Books"}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.statsPageSection}>
        <div className={styles.statsSummaryCard}>
          <div className={styles.statsSummaryTop}>
            <div className={styles.statsSummaryMetric}>
              <div className={styles.statsSummaryValue}>
                {data.summary.totalCount}
              </div>
              <div className={styles.statsSummaryLabel}>
                {getSummaryLabel(selectedFilter)}
              </div>
            </div>

            <div className={styles.statsSummaryMetric}>
              <div className={styles.statsSummaryValue}>
                {data.summary.timeValue}
              </div>
              <div className={styles.statsSummaryLabel}>
                {data.summary.timeLabel}
              </div>
            </div>

            <div className={styles.statsSummaryMetric}>
              <div className={styles.statsSummaryValue}>
                {data.summary.meanScore}
              </div>
              <div className={styles.statsSummaryLabel}>Mean Score</div>
            </div>
          </div>

          <div className={styles.statsSummaryBottom}>
            <div className={styles.statsProgressHeader}>
              <span className={styles.statsProgressTitle}>Completion Rate</span>
            </div>

            {/* <div className={styles.statsSummaryScale}>
              <div className={styles.statsSummaryScaleMark}>0</div>
              <div className={styles.statsSummaryScaleMark}>50</div>
              <div className={styles.statsSummaryScaleMark}>100</div>
            </div> */}

            <div className={styles.statsSummaryTrack}>
              <div
                className={styles.statsSummaryFill}
                style={{ width: `${data.summary.progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className={styles.statsMiniGridCompact}>
          <div className={styles.statsMiniCard}>
            <h4 className={styles.statsMiniTitle}>Status</h4>

            <div className={styles.statsLegendList}>
              {data.statusDistribution.slice(0, 4).map((item) => (
                <div key={item.label} className={styles.statsLegendRow}>
                  <span className={styles.statsLegendLabel}>{item.label}</span>
                  <span className={styles.statsLegendValue}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.statsMiniCard}>
            <h4 className={styles.statsMiniTitle}>Format</h4>

            <div className={styles.statsLegendList}>
              {data.formatDistribution.slice(0, 4).map((item) => (
                <div key={item.label} className={styles.statsLegendRow}>
                  <span className={styles.statsLegendLabel}>{item.label}</span>
                  <span className={styles.statsLegendValue}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.statsChartCard}>
          <div className={styles.statsChartHeader}>
            <h3 className={styles.statsChartTitle}>Score</h3>
          </div>

          <div className={styles.statsBarChartCompact}>
            {data.scoreDistribution.map((item) => (
              <div key={item.label} className={styles.statsBarGroup}>
                <div className={styles.statsBarValue}>{item.value}</div>

                <div
                  className={styles.statsBar}
                  style={{
                    height: `${(item.value / scoreMax) * 95}px`,
                  }}
                />

                <div className={styles.statsBarLabel}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.statsChartCard}>
          <div className={styles.statsChartHeader}>
            <h3 className={styles.statsChartTitle}>
              {getLengthChartTitle(selectedFilter)}
            </h3>
          </div>

          <div className={styles.statsBarChartCompact}>
            {data.lengthDistribution.map((item) => (
              <div key={item.label} className={styles.statsBarGroup}>
                <div className={styles.statsBarValue}>{item.value}</div>

                <div
                  className={styles.statsBar}
                  style={{
                    height: `${(item.value / lengthMax) * 95}px`,
                  }}
                />

                <div className={styles.statsBarLabel}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.statsLineChartCard}>
          <div className={styles.statsChartHeader}>
            <h3 className={styles.statsChartTitle}>Release Year</h3>
          </div>

          <div className={styles.statsLineChartCompact}>
            {data.releaseYearDistribution.map((item) => (
              <div key={item.year} className={styles.statsLinePointGroup}>
                <div className={styles.statsLineValue}>{item.titlesWatched}</div>

                <div
                  className={styles.statsLineStub}
                  style={{
                    height: `${(item.titlesWatched / releaseYearMax) * 70}px`,
                  }}
                />

                <div className={styles.statsLineDot}></div>

                <div className={styles.statsLineYear}>{item.year}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}