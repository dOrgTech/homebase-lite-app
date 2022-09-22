export interface Proposal {
    id?: string
    title: string
    description: string
    link: string
    choices: string[]
    start_date: string
    end_date: string
  }

interface Choice {
  index: number
  description: string
}