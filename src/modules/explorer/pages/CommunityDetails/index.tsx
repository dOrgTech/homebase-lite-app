import React from "react"
import { Grid, styled } from "@material-ui/core"
import { ProposalList } from "../../components/ProposalList"
import { DaoCardDetail } from "modules/explorer/components/DaoCardDetail"

const CommunityDetailsContainer = styled(Grid)(({ theme }) => ({
  boxSizing: "border-box",
  [theme.breakpoints.down("md")]: {
    marginTop: 30
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
  return (
    <PageContainer>
      <Grid container spacing={3}>
        <CommunityDetailsContainer item xs={12} lg={4} md={4}>
          <DaoCardDetail />
        </CommunityDetailsContainer>
        <CommunityDetailsContainer item xs={12} lg={8} md={8}>
          <ProposalList />
        </CommunityDetailsContainer>
      </Grid>
    </PageContainer>
  )
}
