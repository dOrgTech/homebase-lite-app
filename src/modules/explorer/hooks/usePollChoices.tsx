import { Choice } from "models/Choice"
import { Poll } from "models/Polls"
import React, { useEffect, useState } from "react"

export const usePollChoices = (poll: Poll) => {
    const [choices, setChoices] = useState<Choice[]>([])
    
  useEffect(() => {
    async function fetchChoices() {
        await fetch(`${process.env.REACT_APP_API_URL}/choices/${poll._id}/find`).then(async response => {
          if (!response.ok) {
            const message = `An error has occurred: ${response.statusText}`
            console.log(message)
            return
          }
          const records: Choice[] = await response.json()
          setChoices(records)
          return
        })
      }
      fetchChoices()
    return
  }, [poll])
  return choices
}
