import { useQueryClient } from "react-query"
import { useCallback, useContext } from "react"
import { MichelCodecPacker, TezosToolkit } from "@taquito/taquito"
import { Tzip16Module } from "@taquito/tzip16"
import { connectWithBeacon, NetworkType, rpcNodes, BeaconActionType } from "services/beacon"
import { TezosContext } from "services/beacon/context"

type WalletConnectReturn = {
  tezos: TezosToolkit
  connect: () => Promise<TezosToolkit>
  changeNetwork: (network: NetworkType) => void
  reset: () => void
  address: string
  network: NetworkType
}

export const useWallet = (): WalletConnectReturn => {
  const {
    state: { tezos, network, address, wallet },
    dispatch
  } = useContext(TezosContext)

  const queryClient = useQueryClient()

  const connect = useCallback(
    async (newNetwork?: NetworkType) => {
      const { wallet } = await connectWithBeacon(newNetwork || network)

      const newTezos = new TezosToolkit(rpcNodes[newNetwork || network])
      newTezos.setPackerProvider(new MichelCodecPacker())
      newTezos.addExtension(new Tzip16Module())

      newTezos.setProvider({ wallet })
      const address = await newTezos.wallet.pkh()

      dispatch({
        type: BeaconActionType.UPDATE,
        payload: {
          network: newNetwork || network,
          tezos: newTezos,
          wallet,
          address
        }
      })

      return newTezos
    },
    [dispatch, network]
  )

  return {
    tezos,
    connect,
    reset: useCallback(async () => {
      if (!wallet) {
        throw new Error("No Wallet Connected")
      }

      await wallet.disconnect()

      dispatch({
        type: BeaconActionType.RESET
      })
    }, [dispatch, wallet]),
    changeNetwork: async (newNetwork: NetworkType) => {
      localStorage.setItem("homebase:network", newNetwork)

      if (!("_pkh" in tezos.wallet)) {
        const Tezos = new TezosToolkit(rpcNodes[newNetwork])
        Tezos.setPackerProvider(new MichelCodecPacker())
        Tezos.addExtension(new Tzip16Module())

        dispatch({
          type: BeaconActionType.UPDATE,
          payload: {
            network: newNetwork,
            tezos: Tezos,
            wallet: undefined,
            address
          }
        })
      } else {
        await connect(newNetwork)
      }
      queryClient.resetQueries()
    },
    address,
    network
  }
}
