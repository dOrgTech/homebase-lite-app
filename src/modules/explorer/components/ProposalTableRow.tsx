import React from "react"
import { styled, Grid, Typography, useTheme, useMediaQuery, LinearProgress } from "@material-ui/core"
import { RowContainer } from "./tables/RowContainer"
import { ProposalStatus, TableStatusBadge } from "./ProposalTableRowStatusBadge"
import { useHistory } from "react-router"
import { Blockie } from "modules/common/Blockie"
import { toShortAddress } from "services/contracts/utils"

export interface ProposalTableRowData {
  daoId?: string
  id: string
}

const ArrowContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    display: "none"
  }
}))

const StatusText = styled(Typography)({
  textTransform: "uppercase",
  marginLeft: 10,
  marginRight: 30
})

const ArrowInfo = styled(Typography)(({ theme }) => ({
  fontFamily: "Roboto Mono",
  fontWeight: 500,
  fontSize: 16,
  [theme.breakpoints.down("xs")]: {
    marginTop: 5
  }
}))

const Address = styled(Typography)({
  marginLeft: 12
})

const BlockieContainer = styled(Grid)({
  marginBottom: 19
})

const DescriptionText = styled(Typography)(({ theme }) => ({
  fontWeight: 300,
  fontSize: 18,
  marginBottom: 25,
  [theme.breakpoints.down("sm")] : {
    fontSize: 16
  }
}))

const LightText = styled(Typography)({
  fontWeight: 300
})

export const ProposalTableRow: React.FC<{ proposal: ProposalStatus }> = ({ proposal }) => {
  const navigate = useHistory()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"))
  const isMobileSmall = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <RowContainer item container alignItems="center" onClick={() => navigate.push("/explorer/community/1/proposal/1")}>
      <BlockieContainer container direction="row">
        <Blockie address={"tz1bQgEea45ciBpYdFj4y4P3hNyDM8aMF6WB"} size={24} />
        <Address color="textPrimary" variant="subtitle2">
          {toShortAddress("tz1bQgEea45ciBpYdFj4y4P3hNyDM8aMF6WB")}
        </Address>
      </BlockieContainer>
      <Grid container item style={{ gap: 25 }} xs={12} md={12} justifyContent={isMobile ? "center" : "flex-start"}>
        <Typography variant="h4" color="textSecondary" align={isMobile ? "center" : "left"}>
          Contribute to the fund
        </Typography>

        <Grid
          container
          direction={isMobile ? "column" : "row"}
          alignItems={isMobileSmall ? "center" : "flex-start"}
          wrap="nowrap"
          style={{ gap: 18 }}
        >
          <TableStatusBadge status={proposal} />
          <ArrowInfo color="textSecondary"> 2 days left</ArrowInfo>
        </Grid>

        <Grid>
          <DescriptionText color="textPrimary">
            This Proposal was created to fund a new project as the governing body
          </DescriptionText>
        </Grid>
      </Grid>

      <Grid style={{ gap: 19 }} container>
        <Grid container direction="row" spacing={2} alignItems="center">
          <Grid item xs={12} lg={3} md={4} sm={4} container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color="textPrimary"> Yes </Typography>
            </Grid>
            <Grid item>
              <LightText color="textPrimary"> 100k </LightText>
            </Grid>
            <Grid>
              <LightText color="textPrimary"> TOKN </LightText>
            </Grid>
          </Grid>
          <Grid xs={12} lg={9} md={8} sm={8} spacing={1} container direction="row" item justifyContent="space-around" alignItems="center">
            <Grid item xs={10}>
              <LinearProgress
                style={{ width: "100%", marginRight: "4px" }}
                color="secondary"
                value={60}
                variant="determinate"
              />
            </Grid>
            <Grid item>
              <Typography color="textPrimary">60%</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid container direction="row" spacing={2} alignItems="center">
          <Grid item xs={12} lg={3} md={4} sm={4} container direction="row" justifyContent="space-between">
            <Grid item>
              <Typography color="textPrimary"> No </Typography>
            </Grid>
            <Grid item>
              <LightText color="textPrimary"> 80k </LightText>
            </Grid>
            <Grid>
              <LightText color="textPrimary"> TOKN </LightText>
            </Grid>
          </Grid>
          <Grid xs={12} lg={9} spacing={1} md={8} sm={8} container item direction="row" justifyContent="space-around" alignItems="center">
            <Grid item xs={10}>
              <LinearProgress
                style={{ width: "100%", marginRight: "4px" }}
                color="primary"
                value={40}
                variant="determinate"
              />
            </Grid>
            <Grid item>
              <Typography color="textPrimary">40%</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </RowContainer>
  )
}
