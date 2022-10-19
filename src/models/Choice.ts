export interface Choice {
    _id?: string
    name: string
    pollID: string
    walletAddresses: WalletAddress[]
}

export interface WalletAddress {
    address: string
    balanceAtReferenceBlock: string
}