import React, { useEffect, useState } from "react"
import { Grid, styled, CircularProgress } from "@material-ui/core"
import { ProposalList } from "../../components/ProposalList"
import { DaoCardDetail } from "modules/explorer/components/DaoCardDetail"
import { useParams } from "react-router-dom"
import { Poll } from "models/Polls"
import { useCommunity } from "modules/explorer/hooks/useCommunity"

const CommunityDetailsContainer = styled(Grid)(({ theme }) => ({
  boxSizing: "border-box",
  height: "fit-content",
  [theme.breakpoints.down("md")]: {
    marginTop: 0
  }
}))

const PageContainer = styled("div")({
  marginBottom: 50,
  width: "1000px",
  height: "100%",
  margin: "auto",
  padding: "28px 0",
  boxSizing: "border-box",
  paddingTop: 0,

  ["@media (max-width: 1425px)"]: {},

  ["@media (max-width:1335px)"]: {},

  ["@media (max-width:1167px)"]: {
    width: "86vw"
  },

  ["@media (max-width:1030px)"]: {},

  ["@media (max-width:960px)"]: {},

  ["@media (max-width:645px)"]: {
    flexDirection: "column"
  }
})

export const CommunityDetails: React.FC = () => {
  const { id } = useParams<{
    id: string
  }>()
  const [polls, setPolls] = useState<Poll[]>([])
  const [isUpdated, setIsUpdated] = useState(1)

  const community = useCommunity(isUpdated)

  useEffect(() => {
    async function fetchPoll() {
      const pollList = community?.polls
      if (pollList && pollList.length > 0) {
        pollList.forEach(async elem => {
          await fetch(`${process.env.REACT_APP_API_URL}/polls/${elem}/polls`).then(async response => {
            if (!response.ok) {
              const message = `An error has occurred: ${response.statusText}`
              console.log(message)
              return
            }

            const record: Poll = await response.json()
            if (!record) {
              console.log(`Record with id ${id} not found`)
              return
            }
            setPolls(p => [...p, record])
            return
          })
        })
      }
    }
    fetchPoll()
    return
  }, [id, community])

  return (
    <PageContainer>
      <Grid container spacing={3}>
        <CommunityDetailsContainer item xs={12} lg={4} md={4}>
          <DaoCardDetail community={community} setIsUpdated={setIsUpdated} />
        </CommunityDetailsContainer>
        <CommunityDetailsContainer container justifyContent="center" item xs={12} lg={8} md={8}>
          {polls.length > 0 ? <ProposalList polls={polls} /> : <CircularProgress color="secondary" />}
        </CommunityDetailsContainer>
      </Grid>
    </PageContainer>
  )
}
