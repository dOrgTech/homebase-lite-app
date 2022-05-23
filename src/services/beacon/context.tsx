import React, { createContext, useEffect, useReducer } from "react"
import { createTezos, createWallet, getTezosNetwork } from "./utils"
import { INITIAL_STATE, reducer, BeaconState } from "./reducer"
import { BeaconAction, BeaconActionType } from "./actions"

interface TezosProvider {
  state: BeaconState
  dispatch: React.Dispatch<BeaconAction>
}

export const TezosContext = createContext<TezosProvider>({
  state: INITIAL_STATE,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  dispatch: () => {}
})

const getSavedState = async (): Promise<BeaconState> => {
  try {
    const network = getTezosNetwork()
    const tezos = createTezos(network)
    const wallet = createWallet()
    const activeAccount = await wallet.client.getActiveAccount()

    if (!activeAccount?.address) {
      throw new Error("No wallet address found")
    }

    return {
      network,
      tezos,
      wallet,
      address: activeAccount.address
    }
  } catch (error) {
    return INITIAL_STATE
  }
}

type Props = {
  children: JSX.Element
}

export const TezosProvider = (props: Props) => {
  const { children } = props
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  useEffect(() => {
    getSavedState().then(tezosState => {
      dispatch({
        type: BeaconActionType.UPDATE,
        payload: tezosState
      })
    })
  }, [])

  return <TezosContext.Provider value={{ state, dispatch }}>{children}</TezosContext.Provider>
}
