
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale'
import { Choice } from 'models/Choice';
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

export const getUserTotalSupplyAtReferenceBlock = async (network: Network, address: string, level: number, userAddress: string) => {
  const url = `https://api.${networkNameMap[network]}.tzkt.io/v1/contracts/${address}/bigmaps/ledger/historical_keys/${level}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch contract current block")
  }

  const result = await response.json()

  let userBalance;

  if (result && result.length > 0) {
    userBalance = result.find((elem: any) => elem.key.address === userAddress)
    return userBalance.value;
  }

  return 0;

}

export const getTurnoutValue = async (network: Network, address: string, level: number, voters: number) => {
  const url = `https://api.${networkNameMap[network]}.tzkt.io/v1/contracts/${address}/bigmaps/ledger/historical_keys/${level}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch contract current block")
  }
  const result = await response.json()

  if (result) {
    return (voters * 100) / result.length;
  }

  return 0;

}

export const isProposalActive = (date: number) => {
  const config = {
    rounding: Math.floor
  }
  dayjs.extend(relativeTime, config);
  dayjs.extend(updateLocale)
  dayjs.updateLocale('en', {
    relativeTime: {
      future: "%s left",
      past: "%s ago",
      s: 'a few seconds',
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
  const remainingDate = dayjs(date).fromNow();
  return remainingDate;
}

export const calculateWeight = (totalSupply: string, balance: string) => {
  return (Number(balance) * 100) / Number(totalSupply)
}

export const calculateChoiceTotal = (choices: any[]) => {
  let total = 0;
  choices.map((choice: any) => {
    total += Number(choice.balanceAtReferenceBlock)
  })
  return total;
}

export const calculateProposalTotal = (choices: Choice[]) => {
  let total = 0;
  choices.map((choice: any) => {
    choice.walletAddresses.map((elem: any) => {
      total += Number(elem.balanceAtReferenceBlock)
    })
  })
  return total;
}

export const getTotalVoters = (choices: Choice[]) => {
  let votersTotal = 0;
  choices.map((choice: Choice) => {
    votersTotal += choice.walletAddresses.length;
  })
  return votersTotal;
}

export const getTreasuryPercentage = (proposalTotal: number, totalSupply: number) => {
  return (Number(proposalTotal) * 100) / Number(totalSupply)
}

export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

export const nFormatter = (num: number, digits: number) => {
  // what tier? (determines SI symbol)
  const tier = Math.log10(Math.abs(num)) / 3 | 0;

  // if zero, we don't need a suffix
  if (tier == 0) return num;

  // get suffix and determine scale
  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);

  // scale the number
  const scaled = num / scale;

  // format number and add suffix
  return scaled.toFixed(1) + suffix;
}