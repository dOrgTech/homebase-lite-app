/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from "react"
import { Divider, Grid, Typography, styled } from "@material-ui/core"
import { Dropdown } from "modules/common/Dropdown"
import { ProposalTableRow } from "./ProposalTableRow"
import { ProposalStatus } from "./ProposalTableRowStatusBadge"
import { Poll } from "models/Polls"
import { isProposalActive } from "services/utils"
import { useParams } from "react-router-dom"
import { CommunityToken } from "models/Community"
import { useNotification } from "modules/common/hooks/useNotification"

const ProposalListContainer = styled(Grid)(({ theme }) => ({
  background: theme.palette.primary.main,
  borderRadius: 8
}))

const Header = styled(Grid)({
  paddingLeft: 41,
  paddingRight: 41
})

const StyledDivider = styled(Divider)({
  height: 0
})

const NoProposalsText = styled(Typography)({
  paddingTop: 20,
  paddingBottom: 20
})

export const ProposalList: React.FC<{ polls: Poll[] }> = ({ polls }) => {
  const { id } = useParams<{
    id: string
  }>()
 const communityId = id.toString()
 const openNotification = useNotification()

  useMemo(() => {
    async function formatPolls() {
        if (polls && polls.length > 0) {
          polls.forEach((poll) => {
             poll.timeFormatted = isProposalActive(Number(poll.endTime))
             poll.isActive = !poll.timeFormatted.includes("ago") ? ProposalStatus.ACTIVE : ProposalStatus.CLOSED
             return
          })
        }
    }

    formatPolls()
    return
  }, [polls])

  useMemo(() => {
    async function getPollToken() {
        if (polls && polls.length > 0) {
          polls.forEach(async (poll) => {
              await fetch(`${process.env.REACT_APP_API_URL}/token/${communityId}`).then(async response => {
                if (!response.ok) {
                  openNotification({
                    message: 'An error has occurred',
                    autoHideDuration: 2000,
                    variant: "error"
                  })
                  return
                }
                const record: CommunityToken = await response.json()
                if (!record) {
                  return
                }
                poll.tokenAddress = record.tokenAddress
                poll.tokenSymbol = record.symbol
                poll.tokenDecimals = record.decimals
                return;
              })
          })
        }
    }
    getPollToken()
    return
  }, [polls, communityId])

  return (
    <ProposalListContainer container direction="column">
      <Header container justifyContent="space-between" alignItems="center">
        <Grid item xs={6}>
          <Typography variant={"body2"} color="textPrimary">
            Proposals
          </Typography>
        </Grid>
        <Grid item xs={6} container direction="row" justifyContent="flex-end">
          <Dropdown
            options={[
              { name: "All", value: "all" },
              { name: "Active", value: "active" },
              { name: "Closed", value: "closed" }
            ]}
            value={"all"}
          />
        </Grid>
      </Header>
      <StyledDivider />
      {polls && polls.length > 0 ?
        polls.map((poll, i) => {
          return (
            <div key={`poll-${i}`}>
              <ProposalTableRow poll={poll}/>
              {polls.length - 1 !== i ? <StyledDivider key={`divider-${i}`} /> : null}
            </div>
          )
        }) : (
        <Header>
          <NoProposalsText color="textPrimary">No proposals</NoProposalsText>
        </Header>)}
    </ProposalListContainer>
  )
}
