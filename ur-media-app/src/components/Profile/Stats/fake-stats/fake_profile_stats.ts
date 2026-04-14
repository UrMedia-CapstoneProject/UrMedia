export type ScoreDistributionItem = {
  label: string
  value: number
}

export type RangeDistributionItem = {
  label: string
  value: number
}

export type PieDistributionItem = {
  label: string
  value: number
}

export type ReleaseYearItem = {
  year: number
  titlesWatched: number
}

export type MediaStats = {
  mediaType: "movies" | "shows" | "games" | "books"
  summary: {
    totalCount: number
    totalLabel: string
    timeValue: number
    timeLabel: string
    meanScore: number
    progressPercent: number
  }
  scoreDistribution: ScoreDistributionItem[]
  lengthDistribution: RangeDistributionItem[]
  formatDistribution: PieDistributionItem[]
  statusDistribution: PieDistributionItem[]
  countryDistribution: PieDistributionItem[]
  releaseYearDistribution: ReleaseYearItem[]
}

export const profileStatsDemoData: Record<"movies" | "shows" | "games" | "books", MediaStats> = {
  shows: {
    mediaType: "shows",
    summary: {
      totalCount: 120,
      totalLabel: "Total Anime",
      timeValue: 72.4,
      timeLabel: "Days Watched",
      meanScore: 7.8,
      progressPercent: 56,
    },
    scoreDistribution: [
      { label: "6", value: 1 },
      { label: "7", value: 2 },
      { label: "8", value: 10 },
      { label: "9", value: 5 },
    ],
    lengthDistribution: [
      { label: "1", value: 15 },
      { label: "2-6", value: 7 },
      { label: "7-16", value: 55 },
      { label: "17-28", value: 30 },
      { label: "56-100", value: 2 },
      { label: "101+", value: 8 },
    ],
    formatDistribution: [
      { label: "Show", value: 60 },
      { label: "Movie", value: 27 },
      { label: "Game", value: 8 },
      { label: "Book", value: 5 },
    ],
    statusDistribution: [
      { label: "Completed", value: 70 },
      { label: "Planning", value: 27 },
      { label: "Paused", value: 2 },
      { label: "Dropped", value: 1 },
    ],
    countryDistribution: [
      { label: "Japan", value: 99 },
      { label: "South Korea", value: 1 },
    ],
    releaseYearDistribution: [
      { year: 2008, titlesWatched: 2 },
      { year: 2009, titlesWatched: 1 },
      { year: 2010, titlesWatched: 1 },
      { year: 2011, titlesWatched: 2 },
      { year: 2012, titlesWatched: 3 },
      { year: 2013, titlesWatched: 5 },
      { year: 2014, titlesWatched: 6 },
      { year: 2015, titlesWatched: 5 },
      { year: 2016, titlesWatched: 7 },
      { year: 2017, titlesWatched: 4 },
      { year: 2018, titlesWatched: 7 },
      { year: 2019, titlesWatched: 9 },
      { year: 2020, titlesWatched: 6 },
      { year: 2021, titlesWatched: 11 },
      { year: 2022, titlesWatched: 10 },
      { year: 2023, titlesWatched: 9 },
      { year: 2024, titlesWatched: 7 },
      { year: 2025, titlesWatched: 8 },
      { year: 2026, titlesWatched: 3 },
    ],
  },
  movies: {
    mediaType: "movies",
    summary: {
      totalCount: 84,
      totalLabel: "Total Movies",
      timeValue: 18.6,
      timeLabel: "Days Watched",
      meanScore: 8.1,
      progressPercent: 80,
    },
    scoreDistribution: [
      { label: "5", value: 2 },
      { label: "6", value: 7 },
      { label: "7", value: 18 },
      { label: "8", value: 32 },
      { label: "9", value: 20 },
      { label: "10", value: 5 },
    ],
    lengthDistribution: [
      { label: "<90m", value: 5 },
      { label: "90-109m", value: 23 },
      { label: "110-129m", value: 31 },
      { label: "130-149m", value: 17 },
      { label: "150-179m", value: 6 },
      { label: "180m+", value: 2 },
    ],
    formatDistribution: [
      { label: "Live Action", value: 72 },
      { label: "Animated", value: 18 },
      { label: "Anime Movie", value: 10 },
    ],
    statusDistribution: [
      { label: "Completed", value: 88 },
      { label: "Planning", value: 9 },
      { label: "Paused", value: 0 },
      { label: "Dropped", value: 3 },
    ],
    countryDistribution: [
      { label: "USA", value: 61 },
      { label: "Japan", value: 21 },
      { label: "UK", value: 10 },
      { label: "Other", value: 8 },
    ],
    releaseYearDistribution: [
      { year: 2008, titlesWatched: 1 },
      { year: 2009, titlesWatched: 2 },
      { year: 2010, titlesWatched: 2 },
      { year: 2011, titlesWatched: 1 },
      { year: 2012, titlesWatched: 3 },
      { year: 2013, titlesWatched: 4 },
      { year: 2014, titlesWatched: 3 },
      { year: 2015, titlesWatched: 6 },
      { year: 2016, titlesWatched: 5 },
      { year: 2017, titlesWatched: 7 },
      { year: 2018, titlesWatched: 8 },
      { year: 2019, titlesWatched: 6 },
      { year: 2020, titlesWatched: 4 },
      { year: 2021, titlesWatched: 8 },
      { year: 2022, titlesWatched: 9 },
      { year: 2023, titlesWatched: 7 },
      { year: 2024, titlesWatched: 5 },
      { year: 2025, titlesWatched: 2 },
      { year: 2026, titlesWatched: 1 },
    ],
  },
  games: {
    mediaType: "games",
    summary: {
      totalCount: 46,
      totalLabel: "Total Games",
      timeValue: 1240,
      timeLabel: "Hours Played",
      meanScore: 8.5,
      progressPercent: 68,
    },
    scoreDistribution: [
      { label: "6", value: 2 },
      { label: "7", value: 5 },
      { label: "8", value: 16 },
      { label: "9", value: 18 },
      { label: "10", value: 5 },
    ],
    lengthDistribution: [
      { label: "<10h", value: 4 },
      { label: "10-24h", value: 10 },
      { label: "25-49h", value: 12 },
      { label: "50-99h", value: 11 },
      { label: "100-199h", value: 6 },
      { label: "200h+", value: 3 },
    ],
    formatDistribution: [
      { label: "RPG", value: 39 },
      { label: "Action", value: 28 },
      { label: "Shooter", value: 17 },
      { label: "Other", value: 16 },
    ],
    statusDistribution: [
      { label: "Completed", value: 54 },
      { label: "Playing", value: 22 },
      { label: "Planning", value: 18 },
      { label: "Dropped", value: 6 },
    ],
    countryDistribution: [
      { label: "Japan", value: 45 },
      { label: "USA", value: 32 },
      { label: "Europe", value: 16 },
      { label: "Other", value: 7 },
    ],
    releaseYearDistribution: [
      { year: 2008, titlesWatched: 1 },
      { year: 2009, titlesWatched: 1 },
      { year: 2010, titlesWatched: 2 },
      { year: 2011, titlesWatched: 1 },
      { year: 2012, titlesWatched: 2 },
      { year: 2013, titlesWatched: 3 },
      { year: 2014, titlesWatched: 3 },
      { year: 2015, titlesWatched: 4 },
      { year: 2016, titlesWatched: 2 },
      { year: 2017, titlesWatched: 4 },
      { year: 2018, titlesWatched: 5 },
      { year: 2019, titlesWatched: 4 },
      { year: 2020, titlesWatched: 3 },
      { year: 2021, titlesWatched: 5 },
      { year: 2022, titlesWatched: 4 },
      { year: 2023, titlesWatched: 3 },
      { year: 2024, titlesWatched: 2 },
      { year: 2025, titlesWatched: 1 },
      { year: 2026, titlesWatched: 0 },
    ],
  },
  books: {
    mediaType: "books",
    summary: {
      totalCount: 63,
      totalLabel: "Total Books",
      timeValue: 14820,
      timeLabel: "Pages Read",
      meanScore: 7.9,
      progressPercent: 61,
    },
    scoreDistribution: [
      { label: "5", value: 3 },
      { label: "6", value: 8 },
      { label: "7", value: 19 },
      { label: "8", value: 22 },
      { label: "9", value: 9 },
      { label: "10", value: 2 },
    ],
    lengthDistribution: [
      { label: "<200", value: 6 },
      { label: "200-299", value: 15 },
      { label: "300-399", value: 18 },
      { label: "400-499", value: 12 },
      { label: "500-699", value: 9 },
      { label: "700+", value: 3 },
    ],
    formatDistribution: [
      { label: "Novel", value: 58 },
      { label: "Manga", value: 21 },
      { label: "Light Novel", value: 14 },
      { label: "Other", value: 7 },
    ],
    statusDistribution: [
      { label: "Completed", value: 63 },
      { label: "Reading", value: 14 },
      { label: "Planning", value: 19 },
      { label: "Dropped", value: 4 },
    ],
    countryDistribution: [
      { label: "USA", value: 49 },
      { label: "Japan", value: 28 },
      { label: "UK", value: 14 },
      { label: "Other", value: 9 },
    ],
    releaseYearDistribution: [
      { year: 2008, titlesWatched: 1 },
      { year: 2009, titlesWatched: 1 },
      { year: 2010, titlesWatched: 2 },
      { year: 2011, titlesWatched: 2 },
      { year: 2012, titlesWatched: 3 },
      { year: 2013, titlesWatched: 4 },
      { year: 2014, titlesWatched: 4 },
      { year: 2015, titlesWatched: 5 },
      { year: 2016, titlesWatched: 4 },
      { year: 2017, titlesWatched: 5 },
      { year: 2018, titlesWatched: 6 },
      { year: 2019, titlesWatched: 5 },
      { year: 2020, titlesWatched: 3 },
      { year: 2021, titlesWatched: 6 },
      { year: 2022, titlesWatched: 5 },
      { year: 2023, titlesWatched: 4 },
      { year: 2024, titlesWatched: 2 },
      { year: 2025, titlesWatched: 1 },
      { year: 2026, titlesWatched: 0 },
    ],
  },
}

export const mediaTypeTabs = ["movies", "shows", "games", "books"] as const
