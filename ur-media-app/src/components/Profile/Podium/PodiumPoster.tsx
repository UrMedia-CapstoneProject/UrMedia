import Poster from "@/components/Global/Poster"
import styles from "./PodiumPoster.module.css"

type PosterPodiumProps = {
  title: string
  imageUrl: string
}

export default function PosterPodium({title, imageUrl}: PosterPodiumProps) {
    return (
        <div>
            <Poster title = {title} imageUrl = {imageUrl}/>
        </div>
    )
}

// Old code
// import Poster from "@/components/Global/Poster"
// import styles from "./PodiumPoster.module.css"

// export default function() {
//     return (
//         <div>
//             <Poster title = {"The Odyssey"} imageUrl = {"/test-images/the-odyssey.jpg"}/>
//         </div>
//     )
// }