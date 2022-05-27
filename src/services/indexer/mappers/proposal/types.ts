import BigNumber from "bignumber.js"

export enum IndexerStatus {
  CREATED = "created",
  DROPPED = "dropped",
  EXECUTED = "executed",
  REJECTED_AND_FLUSHED = "rejected_and_flushed"
}

export interface Transfer {
  amount: BigNumber
  beneficiary: string
  type: "XTZ" | "FA2"
}
