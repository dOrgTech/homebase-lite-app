/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { Poll } from "models/Polls"
import { useNotification } from "modules/common/hooks/useNotification"
import { isProposalActive } from "services/utils"
import { ProposalStatus } from "../components/ProposalTableRowStatusBadge"

export const usePolls = (pollList: string[] | undefined, id?: any, community?: any) => {
    const [polls, setPolls] = useState<Poll[]>([])
    const openNotification = useNotification()

    useEffect(() => {
        async function fetchPoll() {
          if (pollList && pollList.length > 0) {
            pollList.forEach(async elem => {
              await fetch(`${process.env.REACT_APP_API_URL}/polls/${elem}/polls`).then(async response => {
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

                record.timeFormatted = isProposalActive(Number(record.endTime))
                record.isActive = !record.timeFormatted.includes("ago") ? ProposalStatus.ACTIVE : ProposalStatus.CLOSED

                setPolls(p => [...p, record])
                return
              })
            })
          }
        }
        fetchPoll()
        return
      }, [id, community])
  return polls
}
