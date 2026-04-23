/*Handles auth and server-side data fetching */

import { createClient } from "@/lib/supabase/server";
import { getCountdownFollowedMediaForUser } from "@/services/media/countdown/getCountdownFollowedMediaForUser"; 
import CountdownClient from "./CountdownClient";
import styles from "./Countdown.module.css";

export default async function ProfileCountdown() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    return (
      <div className={styles.main}>
        <h2 className={styles.sectionHeader}>Countdown</h2>

        <div className={styles.content}>
          <div className={styles.emptyMessage}>
            Please log in to see countdowns.
          </div>
        </div>
      </div>
    );
  }

  const countdownItems = await getCountdownFollowedMediaForUser(user.id);

  return <CountdownClient countdownItems={countdownItems} />;
}