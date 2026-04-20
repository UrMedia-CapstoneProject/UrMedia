import Poster from "@/components/Global/Poster"
import styles from "./PodiumPoster.module.css"
import { PosterPodiumProps } from "@/types/types"


export default function PosterPodium({title, imageUrl}: PosterPodiumProps) {
    return (
        <div>
            <Poster title={title} imageUrl={imageUrl} hoverEnabled={false}/>
        </div>
    )
}