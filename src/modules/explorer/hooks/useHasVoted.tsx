import { Choice } from "models/Choice"
import React, { useEffect, useState } from "react"
import { useTezos } from "services/beacon/hooks/useTezos"

export const useHasVoted = (refresh?: number) => {
  const [hasVoted, setHasVoted] = useState(false)
  const [vote, setVote] = useState<Choice>()

  const { account } = useTezos()

  useEffect(() => {
    async function fetchHasVoted() {
      await fetch(`${process.env.REACT_APP_API_URL}/choices/${String(account)}/user`).then(async response => {
        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`
          console.log(message)
          return
        }

        const record = await response.json()
        if (!record) {
          setHasVoted(false)
          return
        }
        if (record === null) {
          setHasVoted(false)
          return
        }
        setVote(record)
        setHasVoted(true)
        return
      })
    }
    fetchHasVoted()

    return
  }, [account, refresh])
  return { hasVoted, vote }
}
