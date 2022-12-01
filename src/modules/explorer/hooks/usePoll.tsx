/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { Poll } from "models/Polls"
import { useNotification } from "modules/common/hooks/useNotification"

export const useSinglePoll = (pollId: string | undefined, id?: any, community?: any) => {
  const [poll, setPoll] = useState<Poll>()
  const openNotification = useNotification()

  useEffect(() => {
    async function fetchPoll() {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/polls/${pollId}/polls`).then(async response => {
          if (!response.ok) {
            openNotification({
              message: "An error has occurred",
              autoHideDuration: 2000,
              variant: "error"
            })
            return
          }

          const record: Poll = await response.json()
          if (!record) {
            return
          }
          setPoll(record)
          return
        })
      } catch (error) {
        setPoll(undefined)
        openNotification({
          message: "An error has occurred",
          autoHideDuration: 2000,
          variant: "error"
        })
        return
      }
    }
    fetchPoll()
    return
  }, [id, community])
  return poll
}