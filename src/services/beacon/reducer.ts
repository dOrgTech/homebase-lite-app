import { TezosToolkit } from "@taquito/taquito"
import { BeaconWallet } from "@taquito/beacon-wallet"
import { createTezos, getTezosNetwork, NetworkType } from "./utils"
import { BeaconAction, BeaconActionType } from "services/beacon/actions"

export interface BeaconState {
  network: NetworkType
  tezos: TezosToolkit
  wallet: BeaconWallet | undefined
  address: string
}

const network = getTezosNetwork()
const tezos = createTezos(network)

export const INITIAL_STATE: BeaconState = {
  tezos,
  network,
  wallet: undefined,
  address: ""
}

export const reducer = (state: BeaconState, action: BeaconAction): BeaconState => {
  switch (action.type) {
    case BeaconActionType.UPDATE:
      return {
        ...state,
        tezos: action.payload.tezos,
        network: action.payload.network,
        address: action.payload.address,
        wallet: action.payload.wallet
      }
    case BeaconActionType.RESET:
      return INITIAL_STATE
  }
}
