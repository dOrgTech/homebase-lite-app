import { char2Bytes } from "@taquito/tzip16"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale"
import { Choice } from "models/Choice"
import { networkNameMap } from "./bakingBad"
import { Network } from "./beacon"
import { BeaconWallet } from "@taquito/beacon-wallet"
import { RequestSignPayloadInput, SigningType } from "@airgap/beacon-sdk"

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

export const getUserTotalSupplyAtReferenceBlock = async (
  network: Network,
  address: string,
  level: number,
  userAddress: string
) => {
  const url = `https://api.${networkNameMap[network]}.tzkt.io/v1/contracts/${address}/bigmaps/ledger/historical_keys/${level}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch contract current block")
  }

  const result = await response.json()

  let userBalance

  if (result && result.length > 0) {
    userBalance = result.find((elem: any) => elem.key.address === userAddress)
    return userBalance.value
  }
  return 0
}

export const hasTokenBalance = async (network: Network, account: string, contract: any) => {
  const url = `https://api.${networkNameMap[network]}.tzkt.io/v1/tokens/balances?account=${account}&token.contract=${contract}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch contract current block")
  }

  const result = await response.json()

  let hasBalance = false

  if (result && result[0]) {
    if (result[0].balance > 0) {
      hasBalance = true
    } else {
      hasBalance = false
    }
  } else {
    hasBalance = false
  }

  return hasBalance
}

export const getTurnoutValue = async (network: Network, address: string, level: number, voters: number) => {
  const url = `https://api.${networkNameMap[network]}.tzkt.io/v1/contracts/${address}/bigmaps/ledger/historical_keys/${level}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch contract current block")
  }
  const result = await response.json()

  if (result) {
    return (voters * 100) / result.length
  }

  return 0
}

export const isProposalActive = (date: number) => {
  const config = {
    rounding: Math.floor
  }
  dayjs.extend(relativeTime, config)
  dayjs.extend(updateLocale)
  dayjs.updateLocale("en", {
    relativeTime: {
      future: "%s left",
      past: "%s ago",
      s: "a few seconds",
      m: "1 minute",
      mm: "%d minutes",
      h: "1 hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      M: "1 month",
      MM: "%d months",
      y: "1 year",
      yy: "%d years"
    }
  })
  const remainingDate = dayjs(date).fromNow()
  return remainingDate
}

export const calculateWeight = (totalSupply: string, balance: string, decimals: any) => {
  const formattedTotalSupply = Number(totalSupply) / Number(decimals) ** 10
  return (Number(balance) * 100) / formattedTotalSupply
}

export const calculateChoiceTotal = (choices: any[], decimals: any) => {
  let total = 0
  choices.map((choice: any) => {
    total += Number(choice.balanceAtReferenceBlock)
  })
  const result = total / Number(decimals) ** 10

  return result
}

export const calculateProposalTotal = (choices: Choice[], decimals: any) => {
  let total = 0
  choices.map((choice: any) => {
    choice.walletAddresses.map((elem: any) => {
      total += Number(elem.balanceAtReferenceBlock)
    })
  })
  const result = total / Number(decimals) ** 10

  return result
}

export const getTotalVoters = (choices: Choice[]) => {
  let votersTotal = 0
  choices.map((choice: Choice) => {
    votersTotal += choice.walletAddresses.length
  })
  return votersTotal
}

export const getTreasuryPercentage = (proposalTotal: number, totalSupply: number) => {
  const value = (Number(proposalTotal) * 100) / Number(totalSupply)

  return value
}

export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"]

export const nFormatter = (num: number, digits: number) => {
  // what tier? (determines SI symbol)
  const tier = (Math.log10(Math.abs(num)) / 3) | 0

  // if zero, we don't need a suffix
  if (tier == 0) return num.toFixed(1)

  // get suffix and determine scale
  const suffix = SI_SYMBOL[tier]
  const scale = Math.pow(10, tier * 3)

  // scale the number
  const scaled = num / scale

  // format number and add suffix
  return scaled.toFixed(1) + suffix
}

export const formatByDecimals = (value: string, decimals: string) => {
  return nFormatter(Number(value) / Number(decimals) ** 10, 1)
}

export const getSignature = async (userAddress: string, wallet: BeaconWallet) => {
  const formattedInput: string = [
    "Tezos Signed Message:",
    process.env.BASE_URL,
    new Date().toISOString(),
    `Tezos Homebase Lite - I am ${userAddress}`
  ].join(" ")

  const bytes = char2Bytes(formattedInput)
  const payloadBytes = "05" + "0100" + char2Bytes(bytes.length.toString()) + bytes

  const payload: RequestSignPayloadInput = {
    signingType: SigningType.MICHELINE,
    payload: payloadBytes,
    sourceAddress: userAddress
  }

  const signedPayload = await wallet?.client.requestSignPayload(payload)
  const { signature } = signedPayload

  return { signature, payloadBytes }
}
