export interface Community {
    _id?: string
    name: string
    description: string
    link: string
    members?: string[]
    tokenAddress: string
    tokenType?: string
    token_symbol: string
    token_id: string
    token_standard: string
    picUri: string
    required_token: boolean
    allow_access: boolean
  }