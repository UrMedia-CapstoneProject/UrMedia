import Image from "next/image"
import styles from "./MobileMediaCard.module.css"
import { MobileMediaCardProps } from "@/types/types"

export default function MobileMediaCard({ item, onClick }: MobileMediaCardProps) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.image}>
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      <div className={styles.info}>
        <p className={styles.title}>{item.title}</p>
      </div>
    </div>
  )
}