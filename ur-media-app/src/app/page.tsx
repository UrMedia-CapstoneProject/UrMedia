import styles from "./page.module.css";
import PopularMedia from "@/components/Media/PopularMedia";
import ProfileCountdown from "@/components/Media/Countdown/ProfileCountdown";
import Friends from "@/components/Media/Friends/Friends";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  let hasProfile = false;
  let userId;
  let username

  const supabase = await createClient();
  const { data: authorizedUser, error: authorizedError } =
    await supabase.auth.getUser();

  if (authorizedUser && !authorizedError) {
    userId = authorizedUser.user.id;
    username = authorizedUser.user.email?.split('@')[0] ?? null;
  }

  const { data } = await supabase
    .from("profile")
    .select()
    .eq("user_id", userId);
  
  if (data) {
    hasProfile = true
  }
  
  if (!hasProfile) {
    await supabase.from('profiles').upsert({
      id: userId,
      username: username
    })
  }

  return (
    <div className={styles.main}>
      <PopularMedia />
      <div className={styles.sidebar}>
        <ProfileCountdown />
        <Friends />
      </div>
    </div>
  );
}
