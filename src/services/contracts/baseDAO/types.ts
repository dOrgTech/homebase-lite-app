import { BigNumber } from "bignumber.js"

import { Token as TokenModel } from "models/Token"

export interface XTZTransferParams {
  amount: number
  recipient: string
  type: "XTZ"
}

export interface FA2TransferParams {
  amount: number
  recipient: string
  type: "FA2"
  asset: TokenModel
}

export type TransferParams = XTZTransferParams | FA2TransferParams

export interface Extra {
  frozenExtraValue: BigNumber
  slashExtraValue: BigNumber
  minXtzAmount: BigNumber
  maxXtzAmount: BigNumber
  frozenScaleValue: BigNumber
  slashDivisionScale: BigNumber
}
