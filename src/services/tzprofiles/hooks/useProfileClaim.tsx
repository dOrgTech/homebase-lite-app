import { useQuery } from "react-query"
import { useWallet } from "services/beacon"
import { getProfileClaim } from "../claims"
import { Claim } from "../claims/types"

export const useProfileClaim = (tzAddress: string) => {
  const { network } = useWallet()

  return useQuery<Claim | null, Error>(
    ["tzProfile_profile_claim", tzAddress, network],
    () => getProfileClaim(tzAddress, network),
    {
      enabled: !!network && !!tzAddress,
      cacheTime: Infinity,
      refetchOnWindowFocus: false
    }
  )
}
