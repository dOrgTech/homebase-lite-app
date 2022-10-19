import BigNumber from "bignumber.js"
import { networkNameMap } from "./bakingBad"
import { Network } from "./beacon"

export const getCurrentBlock = async (network: Network) => {
    const url = `https://api.${networkNameMap[network]}.tzkt.io/v1/head`
    const response = await fetch(url)
  
    if (!response.ok) {
      throw new Error("Failed to fetch contract current block")
    }
  
    const result = await response.json()
  
    return result.level
}

export const getTotalSupplyAtReferenceBlock = async (network: Network, address: string, level: number) => {
    const url = `https://api.${networkNameMap[network]}.tzkt.io/v1/contracts/${address}/bigmaps/token_total_supply/historical_keys/${level}`
    const response = await fetch(url)
  
    if (!response.ok) {
      throw new Error("Failed to fetch contract current block")
    }
  
    const result = await response.json()
    
    return result[0].value
}