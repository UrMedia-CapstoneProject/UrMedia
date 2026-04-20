import Podiums from "./Podiums";
import getPodiums from "@/services/podium/getPodiums.ts" //not implemented yet

export default async function ServerPodiums() {
    const podiums = await getPodiums()

    return(
        <Podiums />
    )
}