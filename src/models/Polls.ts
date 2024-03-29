import { ProposalStatus } from "modules/explorer/components/ProposalTableRowStatusBadge"

export interface Poll {
  _id?: string
  daoID: string
  description: string
  name: string
  referenceBlock?: string
  startTime: string
  endTime: string
  totalSupplyAtReferenceBlock?: any
  choices: string[]
  externalLink: ""
  author: string
  isActive?: ProposalStatus
  timeFormatted?: string
  tokenSymbol?: string
  tokenAddress?: string
  tokenDecimals?: string
  votes?: Vote[]
}

export interface Vote {
  address: string
  balanceAtReferenceBlock: string
}
