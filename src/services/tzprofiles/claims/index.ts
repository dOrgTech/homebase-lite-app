import { NetworkType } from "services/beacon"
import { API_URL } from ".."
import { Claim, ClaimsDTO } from "./types"

export const getProfileClaim = async (tzAddress: string, network: NetworkType): Promise<Claim | null> => {
  try {
    const response = await fetch(`${API_URL}/${tzAddress}/${network}`)

    if (!response.ok) {
      throw new Error("Failed to fetch Profile Claim from TZProfile API")
    }

    const result: ClaimsDTO = await response.json()
    const profileClaim = result
      .map(claimArray => JSON.parse(claimArray[1]) as Claim)
      .find(claim => claim.type.includes("BasicProfile"))

    if (!profileClaim) {
      throw new Error(`Address ${tzAddress} has no profile in network ${network}`)
    }

    return profileClaim
  } catch (error) {
    return null
  }
}
