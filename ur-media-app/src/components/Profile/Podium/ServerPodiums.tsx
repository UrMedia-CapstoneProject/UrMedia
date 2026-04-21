import Podiums from "./Podiums";
import getPodiums from "@/services/podium/getPodiums"

export default async function ServerPodiums() {
    const podiums = await getPodiums()

    return(
        <Podiums podiums={podiums}/>
    )
}