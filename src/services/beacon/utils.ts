import { NetworkType } from "@airgap/beacon-sdk"
export { NetworkType }
import { BeaconWallet } from "@taquito/beacon-wallet"
import { MichelCodecPacker, TezosToolkit } from "@taquito/taquito"
import { Tzip16Module } from "@taquito/tzip16"

export const rpcNodes: Record<Partial<NetworkType>, string> = {
  [NetworkType.MAINNET]: "https://mainnet.smartpy.io",
  [NetworkType.HANGZHOUNET]: "https://hangzhounet.smartpy.io",
  [NetworkType.ITHACANET]: "https://ithacanet.smartpy.io",
  [NetworkType.DELPHINET]: "",
  [NetworkType.EDONET]: "",
  [NetworkType.FLORENCENET]: "",
  [NetworkType.GRANADANET]: "",
  [NetworkType.JAKARTANET]: "",
  [NetworkType.CUSTOM]: ""
}

export const getTezosNetwork = (): NetworkType => {
  const storageNetwork = window.localStorage.getItem("homebase:network")

  if (storageNetwork) {
    return storageNetwork as NetworkType
  }

  const envNetwork = process?.env?.REACT_APP_NETWORK?.toString().toLowerCase() as NetworkType

  if (!envNetwork) {
    throw new Error("No Network ENV set")
  }

  window.localStorage.setItem("homebase:network", envNetwork)

  return envNetwork
}

export const createWallet = () =>
  new BeaconWallet({
    name: "Homebase",
    iconUrl: "https://tezostaquito.io/img/favicon.png"
  })

export const createTezos = (network: NetworkType) => {
  const tezos = new TezosToolkit(rpcNodes[network])
  tezos.setPackerProvider(new MichelCodecPacker())
  tezos.addExtension(new Tzip16Module())
  return tezos
}

export const connectWithBeacon = async (
  envNetwork: NetworkType
): Promise<{
  network: NetworkType | undefined
  wallet: BeaconWallet
}> => {
  try {
    const wallet = createWallet()

    await wallet.requestPermissions({
      network: {
        type: envNetwork
      }
    })

    const activeAccount = await wallet.client.getActiveAccount()

    if (!activeAccount) {
      throw new Error("No active account")
    }

    return {
      network: activeAccount.network.type,
      wallet
    }
  } catch (error) {
    throw error
  }
}
