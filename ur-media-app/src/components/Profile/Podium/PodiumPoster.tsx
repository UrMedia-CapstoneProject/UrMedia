import Poster from "@/components/Global/Poster"
import styles from "./PodiumPoster.module.css"
import { PosterPodiumProps } from "@/types/types"


export default function PosterPodium({ imageUrl }: PosterPodiumProps) {
    if (!imageUrl) {
        return <div className="podium-empty" />;
    }
    return (
        <div>
            <Poster title={""} imageUrl={imageUrl} hoverEnabled={false} />
        </div>
    )
}