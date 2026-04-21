/*Handles tab switching between each media group*/

"use client";

import { useState } from "react";
import styles from "./Countdown.module.css";
import CountdownGrid from "./CountdownGrid";
import type { CountdownItemsByTab, CountdownTab } from "@/services/media/countdown/getCountdownFollowedMediaForUser";

type CountdownClientProps = {
  countdownItems: CountdownItemsByTab;
};

const COUNTDOWN_TABS: CountdownTab[] = [
  "movies",
  "shows",
  "games",
  "books"
];

const TAB_LABELS: Record<CountdownTab, string> = {
  movies: "Movies",
  shows: "Shows",
  games: "Games",
  books: "Books",
};

export default function CountdownClient({
  countdownItems,
}: CountdownClientProps) {
  const [activeTab, setActiveTab] =
    useState<CountdownTab>("movies");

  const activeItems = countdownItems[activeTab];

  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <div className={styles.main}>
      <h2 className={styles.sectionHeader}>Countdown</h2>

      <div className={styles.content}>
        <div className={styles.tabBar}>
          {COUNTDOWN_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`${styles.tabLink} ${
                activeTab === tab ? styles.active : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {TAB_LABELS[tab]}
            </button>
          ))}
        </div>

        <h3 className={styles.upcomingHeader}>
          Upcoming {capitalize(TAB_LABELS[activeTab])}
        </h3>

        <div className={styles.tabContent}>
          <CountdownGrid items={activeItems} />
        </div>
      </div>
    </div>
  );
}