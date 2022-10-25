import { Community } from "models/Community"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const useCommunity = (isUpdated?: number) => {
  const [community, setCommunity] = useState<Community>()

  const { id } = useParams<{
    id: string
  }>()

  useEffect(() => {
    async function fetchData() {
      const communityId = id.toString()
      await fetch(`${process.env.REACT_APP_API_URL}/daos/${communityId}`).then(async response => {
        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`
          console.log(message)
          return
        }

        const record = await response.json()
        if (!record) {
          console.log(`Record with id ${id} not found`)
          return
        }
        setCommunity(record)
      })
    }
    fetchData()

    return
  }, [id, isUpdated, setCommunity])
  return community
}
