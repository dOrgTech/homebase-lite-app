export interface Poll {
    _id?: string
    daoID: string
    description: string
    endTime: number
    name: string
    referenceBlock: string
    startTime: number
    totalSupplyAtReferenceBlock: string
    choices: string[]
  }