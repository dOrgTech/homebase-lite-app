import BigNumber from "bignumber.js"
import { NFT, Token } from "models/Token"
import { Network } from "services/beacon"
import { networkNameMap } from ".."
import { DAOToken, NFTDTO } from "./types"

const isNFTDTO = (value: DAOToken): value is NFTDTO => value.hasOwnProperty("artifact_uri")

export interface DAOHolding {
  balance: BigNumber
  token: Token
}

export interface NFTDAOHolding extends DAOHolding {
  token: NFT
}


export const getTokenMetadata = async (contractAddress: string, network: Network) => {
  const url = `https://api.${networkNameMap[network]}.tzkt.io/v1/tokens?contract=${contractAddress}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch proposals from BakingBad API")
  }

  const resultingTokens: DAOToken[] = await response.json()
  const result = resultingTokens[0]
  return isNFTDTO(result) ? new NFT(result) : result
}

