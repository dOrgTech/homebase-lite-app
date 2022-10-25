import React, { useEffect, useMemo } from "react"
import { Divider, Grid, Typography, styled } from "@material-ui/core"
import { Dropdown } from "modules/common/Dropdown"
import { ProposalTableRow } from "./ProposalTableRow"
import { ProposalStatus } from "./ProposalTableRowStatusBadge"
import { Poll } from "models/Polls"
import { isProposalActive } from "services/utils"
import { useParams } from "react-router-dom"
import { CommunityToken } from "models/Community"

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
                  const message = `An error has occurred: ${response.statusText}`
                  console.log(message)
                  return
                }
          
                const record: CommunityToken = await response.json()
                if (!record) {
                  console.log(`Record with id ${id} not found`)
                  return
                }

                poll.tokenAddress = record.tokenAddress
                poll.tokenSymbol = record.symbol
                return;
              })
          })
        }
    }
    getPollToken()
    return
  }, [polls, id, communityId])

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
              <ProposalTableRow poll={poll} proposal={ProposalStatus.ACTIVE} />
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
