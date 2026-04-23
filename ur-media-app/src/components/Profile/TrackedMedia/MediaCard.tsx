"use client";
import styles from "./MediaCard.module.css";
import { useState } from "react";
import Poster from "@/components/Global/Poster";

type MediaCardProps = {
  title: string;
  imageUrl: string;
  epWatched: string;
  score?: string;
};

export default function MediaCard({
  title,
  imageUrl,
  epWatched,
  score,
}: MediaCardProps) {
  return (
    <div className={styles.main}>
      <div className={styles.poster}>
        <Poster title={title} imageUrl={imageUrl} hoverEnabled={false} />
        <div className={styles.mediaInfo}>
          <div>
            <p className={styles.title}>
              <span className={styles.titleText}>{title}</span>
            </p>
          </div>

          <div className={styles.userStats}>
            <p className={styles.score}>{score}</p>
            <p className={styles.epWatched}>{epWatched}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client"
// import styles from "./MediaCard.module.css"
// import { useState } from "react"
// import Poster from "@/components/Global/Poster";

// export default function () {
//     return (
//         <div className={styles.main}>
//             <div className={styles.poster}>
//                 <Poster title={"The Odyssey"} imageUrl={"/test-images/the-odyssey.jpg"} />
//                 <div className={styles.mediaInfo}>
//                     <div>
//                         <p className={styles.title}>
//                             <span className={styles.titleText}>
//                                 {"The Odyssey and what if the name is a little longer? and what if the name is a little longer?"}
//                             </span>
//                         </p>

//                     </div>

//                     <div className={styles.userStats}>
//                         <p className={styles.epWatched}>0</p>
//                         <p className={styles.score}>7/10</p>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     )
// }
