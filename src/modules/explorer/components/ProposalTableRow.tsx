import React, { useEffect, useState } from "react"
import { styled, Grid, Typography, useTheme, useMediaQuery, LinearProgress } from "@material-ui/core"
import { RowContainer } from "./tables/RowContainer"
import { ProposalStatus, TableStatusBadge } from "./ProposalTableRowStatusBadge"
import { useHistory } from "react-router"
import { Blockie } from "modules/common/Blockie"
import { toShortAddress } from "services/contracts/utils"
import { Choice } from "models/Choice"
import { Poll } from "models/Polls"

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
  [theme.breakpoints.down("sm")]: {
    fontSize: 16
  }
}))

const LightText = styled(Typography)({
  fontWeight: 300,
  textAlign: "center"
})

export const ProposalTableRow: React.FC<{ proposal: ProposalStatus; poll: Poll }> = ({ proposal, poll }) => {
  const navigate = useHistory()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"))
  const isMobileSmall = useMediaQuery(theme.breakpoints.down("sm"))
  console.log(poll)
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

  return (
    <RowContainer item container alignItems="center" onClick={() => navigate.push("/explorer/community/1/proposal/1")}>
      <BlockieContainer container direction="row">
        <Blockie address={"tz1bQgEea45ciBpYdFj4y4P3hNyDM8aMF6WB"} size={24} />
        <Address color="textPrimary" variant="subtitle2">
          {toShortAddress(poll.author)}
        </Address>
      </BlockieContainer>
      <Grid container item style={{ gap: 25 }} xs={12} md={12} justifyContent={isMobile ? "center" : "flex-start"}>
        <Typography variant="h4" color="textSecondary" align={isMobile ? "center" : "left"}>
          {poll.name}
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
          <DescriptionText color="textPrimary">{poll.description}</DescriptionText>
        </Grid>
      </Grid>

      {choices && choices.length > 0
        ? choices.map((choice: Choice, index: number) => (
            <Grid style={{ gap: 19, display: index > 2 ? "none" : "block", marginBottom: 16 }} container key={index}>
              <Grid container direction="row" spacing={2} alignItems="center">
                <Grid item xs={12} lg={5} md={4} sm={4} container direction="row" justifyContent="space-between">
                  <Grid item xs>
                    <Typography color="textPrimary"> {choice.name} </Typography>
                  </Grid>
                  <Grid item xs>
                    <LightText color="textPrimary"> 0 </LightText>
                  </Grid>
                  <Grid xs={2}>
                    <LightText color="textPrimary"> TOKN </LightText>
                  </Grid>
                </Grid>
                <Grid
                  xs={12}
                  lg={7}
                  md={8}
                  sm={8}
                  spacing={1}
                  container
                  direction="row"
                  item
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Grid item xs={10}>
                    <LinearProgress
                      style={{ width: "100%", marginRight: "4px" }}
                      color={index & 1 ? "primary" : "secondary"}
                      value={1}
                      variant="determinate"
                    />
                  </Grid>
                  <Grid item>
                    <Typography color="textPrimary">0%</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          ))
        : null}
    </RowContainer>
  )
}
