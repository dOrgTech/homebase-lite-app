/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { Grid, styled, CircularProgress, Typography } from "@material-ui/core"
import { ProposalList } from "../../components/ProposalList"
import { DaoCardDetail } from "modules/explorer/components/DaoCardDetail"
import { useParams } from "react-router-dom"
import { Poll } from "models/Polls"
import { useCommunity } from "modules/explorer/hooks/useCommunity"
import { useNotification } from "modules/common/hooks/useNotification"
import { usePolls } from "modules/explorer/hooks/usePolls"

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
  const [isUpdated, setIsUpdated] = useState(1)
  const community = useCommunity(isUpdated)
  const polls = usePolls(community?.polls, id, community)

  return (
    <PageContainer>
      <Grid container spacing={3}>
        <CommunityDetailsContainer item xs={12} lg={4} md={4}>
          <DaoCardDetail community={community} setIsUpdated={setIsUpdated} />
        </CommunityDetailsContainer>
        <CommunityDetailsContainer container justifyContent="center" item xs={12} lg={8} md={8}>
          {polls.length > 0 ? (
            <ProposalList polls={polls} />
          ) : (
            <Typography style={{ width: "inherit" }} color="textPrimary">
              0 proposals found
            </Typography>
          )}
        </CommunityDetailsContainer>
      </Grid>
    </PageContainer>
  )
}
