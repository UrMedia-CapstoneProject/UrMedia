export function isMetaDataOld (
    metadataUpdatedAt?: string | null,
    maxAgeHours = 24
) {
     if (!metadataUpdatedAt) return true

     const updatedTime = new Date(metadataUpdatedAt).getTime()
     const nowTime = Date.now()
     const maxAgeMiliseconds = maxAgeHours * 60 * 60 * 1000

    //  console.log("updatedTime", updatedTime)
    //  console.log("nowTime", nowTime)
    //  console.log("maxAgeMiliseconds", maxAgeMiliseconds)
    //  console.log(((nowTime - updatedTime) > maxAgeMiliseconds))

     return ((nowTime - updatedTime) > maxAgeMiliseconds)
}

