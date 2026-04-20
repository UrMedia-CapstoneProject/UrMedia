import Podiums from "./Podiums";
import getPodiums from "@/services/podium/getPodiums"

export default async function ServerPodiums() {
    const podiums = await getPodiums()
    //console.log("ServerPodiums podiums:", podiums);

    return(
        <Podiums podiums={podiums}/>
    )
}