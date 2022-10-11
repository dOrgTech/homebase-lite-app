import React, { useEffect, useState } from "react"
import { Grid, styled } from "@material-ui/core"
import { ProposalList } from "../../components/ProposalList"
import { DaoCardDetail } from "modules/explorer/components/DaoCardDetail"
import { useParams } from "react-router-dom"
import { Community } from "models/Community"

const CommunityDetailsContainer = styled(Grid)(({ theme }) => ({
  boxSizing: "border-box",
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

  const [community, setCommunity] = useState<Community>()
  const [isUpdated, setIsUpdated] = useState(1)

  useEffect(() => {
    async function fetchData() {
      const communityId = id.toString()
      await fetch(`http://localhost:5001/daos/${communityId}`).then(async response => {
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
    fetchData();

    return
  }, [id, isUpdated])


  return (
    <PageContainer>
      <Grid container spacing={3}>
        <CommunityDetailsContainer item xs={12} lg={4} md={4}>
          <DaoCardDetail community={community} setIsUpdated={setIsUpdated} />
        </CommunityDetailsContainer>
        <CommunityDetailsContainer item xs={12} lg={8} md={8}>
          <ProposalList />
        </CommunityDetailsContainer>
      </Grid>
    </PageContainer>
  )
}
