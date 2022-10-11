export interface Community {
    _id?: string
    name: string
    description: string
    linkToTerms: string
    members: string[]
    tokenAddress: string
    polls: string[]
    tokenType?: string
    token_symbol: string
    token_id: string
    picUri: string
    required_token: boolean
    allow_access: boolean
  }