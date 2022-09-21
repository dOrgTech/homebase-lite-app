export interface Proposal {
    id?: string
    title: string
    description: string
    link: string
    choices: Array<string>
    start_date: string
    end_date: string
  }