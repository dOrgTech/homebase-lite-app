import React from "react"
import { Button, Grid, styled, useMediaQuery, useTheme } from "@material-ui/core"
import { BackButton } from "modules/common/BackButton"
import { ProposalDetailCard } from "modules/explorer/components/ProposalDetailCard"
import { GridContainer } from "modules/common/GridContainer"
import { ChoiceItemSelected } from "modules/explorer/components/ChoiceItemSelected"
import { VoteDetails } from "modules/explorer/components/VoteDetails"

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

export const ProposalDetails: React.FC = () => {

  const theme = useTheme()
  const isMobileSmall = useMediaQuery(theme.breakpoints.down("sm"))
  
  return (
    <PageContainer style={{ gap: 30 }}>
      <Grid container>
        <BackButton />
      </Grid>
      <Grid container style={{ gap: 30 }}>
        <Grid item>
          <ProposalDetailCard />
        </Grid>
        <Grid container item xs={12}>
          <GridContainer container style={{ gap: 32 }} direction="row" justifyContent="center">
            <Grid container item justifyContent={isMobileSmall ? "center" : "space-between"} direction="row" style={{ gap: 30 }}>
              <ChoiceItemSelected description="This is choice 1" />
              <ChoiceItemSelected description="This is choice 2" />
              <ChoiceItemSelected description="This is choice 3" />
            </Grid>
            <Button variant="contained" color="secondary">
              Cast your vote
            </Button>
          </GridContainer>
        </Grid>
        <Grid item xs={12}>
          <VoteDetails />
        </Grid>
      </Grid>
    </PageContainer>
  )
}
