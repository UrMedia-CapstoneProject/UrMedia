import Poster from "@/components/Global/Poster"
import { PosterPodiumProps } from "@/types/types"


export default function PosterPodium({ imageUrl }: PosterPodiumProps) {
    if (!imageUrl) {
        return <Poster title={""} imageUrl={"/default-images/generic-stock.png"} hoverEnabled={false} />
    }
    return (
        <div>
            <Poster title={""} imageUrl={imageUrl} hoverEnabled={false} />
        </div>
    )
}