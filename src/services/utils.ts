
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale'
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