import { TezosToolkit } from "@taquito/taquito"
import { BeaconWallet } from "@taquito/beacon-wallet"
import { NetworkType } from "./utils"

export enum BeaconActionType {
  UPDATE = "UPDATE",
  RESET = "RESET"
}

interface Update {
  type: BeaconActionType.UPDATE
  payload: {
    tezos: TezosToolkit
    network: NetworkType
    wallet: BeaconWallet | undefined
    address: string
  }
}

interface Reset {
  type: BeaconActionType.RESET
}

export type BeaconAction = Update | Reset
