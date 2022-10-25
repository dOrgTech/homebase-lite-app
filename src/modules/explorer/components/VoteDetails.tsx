/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useMemo, useState } from "react"
import { Grid, LinearProgress, styled, Typography, useMediaQuery, useTheme } from "@material-ui/core"
import { GridContainer } from "modules/common/GridContainer"
import { VotesDialog } from "./VotesDialog"
import { Poll } from "models/Polls"
import { Choice } from "models/Choice"
import {
  calculateChoiceTotal,
  calculateProposalTotal,
  calculateWeight,
  getTotalVoters,
  getTreasuryPercentage,
  getTurnoutValue
} from "services/utils"
import { useTezos } from "services/beacon/hooks/useTezos"

const Container = styled(Grid)(({ theme }) => ({
  background: theme.palette.primary.light,
  borderRadius: 8
}))

const TitleContainer = styled(Grid)(({ theme }) => ({
  paddingTop: 18,
  paddingLeft: 46,
  paddingRight: 46,
  paddingBottom: 18,
  borderBottom: `0.3px solid ${theme.palette.primary.light}`,
  [theme.breakpoints.down("sm")]: {
    padding: "18px 25px"
  }
}))

const LinearContainer = styled(GridContainer)({
  paddingBottom: 0,
  minHeight: 110
})

const LegendContainer = styled(GridContainer)({
  minHeight: 30,
  paddingBottom: 0
})

const GraphicsContainer = styled(Grid)({
  paddingBottom: 25
})

export const VoteDetails: React.FC<{ poll: Poll; choices: Choice[] }> = ({ poll, choices }) => {
  const theme = useTheme()
  const isMobileSmall = useMediaQuery(theme.breakpoints.down("xs"))
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const [open, setOpen] = React.useState(false)
  const { network } = useTezos()
  const [turnout, setTurnout] = useState(0)
  const handleClickOpen = () => {
    if (!isMobile) {
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  useMemo(async () => {
    const value = await getTurnoutValue(
      network,
      poll.tokenAddress!,
      Number(poll.referenceBlock),
      getTotalVoters(choices)
    )
    setTurnout(value)
  }, [poll, choices, network])

  return (
    <Container container direction="column">
      <TitleContainer item>
        <Typography variant={"body2"} color="textPrimary">
          Results
        </Typography>
      </TitleContainer>
      <GraphicsContainer container>
        {choices &&
          choices.map((choice: Choice, index) => (
            <LinearContainer container direction="column" style={{ gap: 20 }} key={`'option-'${index}`}>
              <Grid item container direction="row" alignItems="center">
                <Grid item xs={12} lg={6} sm={6}>
                  <Typography color="textPrimary" variant="body2">
                    {choice.name}
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={6} sm={6} container justifyContent={isMobileSmall ? "flex-start" : "flex-end"}>
                  <Typography color="textPrimary" variant="body2">
                    {choice.walletAddresses.length} Voters -{" "}
                    {calculateChoiceTotal(choice.walletAddresses).toLocaleString()} {poll.tokenSymbol}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container direction="row" alignItems="center">
                <Grid item xs={10} lg={11} sm={11}>
                  <LinearProgress
                    style={{ width: "100%", marginRight: "4px" }}
                    color="secondary"
                    value={calculateWeight(
                      poll.totalSupplyAtReferenceBlock!,
                      String(calculateChoiceTotal(choice.walletAddresses))
                    )}
                    variant="determinate"
                  />
                </Grid>
                <Grid item xs={2} lg={1} sm={1} container justifyContent="flex-end">
                  <Typography color="textPrimary" variant="body2">
                    {calculateWeight(
                      poll.totalSupplyAtReferenceBlock!,
                      String(calculateChoiceTotal(choice.walletAddresses))
                    ).toFixed(1)}
                    %
                  </Typography>
                </Grid>
              </Grid>
            </LinearContainer>
          ))}

        <LegendContainer container direction="row">
          <Grid item container direction="row" xs={12} sm={6} md={6} lg={6} style={{ gap: 10 }}>
            <Typography color="secondary" variant="body1" onClick={() => handleClickOpen()}>
              {getTotalVoters(choices)}
            </Typography>
            <Typography color="textPrimary" variant="body1">
              Votes
            </Typography>
            <Typography color="textPrimary" variant="body2">
              ({turnout.toFixed(2)} % Turnout)
            </Typography>
          </Grid>

          <Grid
            item
            container
            direction="row"
            xs={12}
            md={6}
            sm={6}
            lg={6}
            style={{ gap: 10 }}
            justifyContent={isMobileSmall ? "flex-start" : "flex-end"}
          >
            <Typography color="textPrimary" variant="body1">
              {calculateProposalTotal(choices).toLocaleString()}
            </Typography>
            <Typography color="textPrimary" variant="body1">
              {poll.tokenSymbol}
            </Typography>
            <Typography color="textPrimary" variant="body2">
              (
              {getTreasuryPercentage(calculateProposalTotal(choices), Number(poll.totalSupplyAtReferenceBlock)).toFixed(
                2
              )}
              % of Treasury)
            </Typography>
          </Grid>
        </LegendContainer>

        <VotesDialog open={open} handleClose={handleClose} />
      </GraphicsContainer>
    </Container>
  )
}
