import { Network } from "services/beacon"
import { networkNameMap } from ".."

export const getTokenMetadata = async (contractAddress: string, network: Network) => {
  const url = `https://api.${networkNameMap[network]}.tzkt.io/v1/tokens?contract=${contractAddress}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch proposals from BakingBad API")
  }

  const resultingTokens: any[] = await response.json()
  const result = resultingTokens[0]
  return result;
}

