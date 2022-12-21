/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react"
import { Divider, Grid, Typography, styled } from "@material-ui/core"
import { Dropdown } from "modules/common/Dropdown"
import { ProposalTableRow } from "./ProposalTableRow"
import { ProposalStatus } from "./ProposalTableRowStatusBadge"
import { Poll } from "models/Polls"
import { useParams } from "react-router-dom"
import { CommunityToken } from "models/Community"
import { useNotification } from "modules/common/hooks/useNotification"
import dayjs from "dayjs"

export enum ProposalPopularity {
  RECENT = "recent",
  POPULAR = "popular"
}

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
  const [communityPolls, setCommunityPolls] = useState<Poll[]>()

  const sortByRecent = () => {
    return polls.sort((a, b) => (dayjs(a.startTime).isAfter(dayjs(b.startTime)) ? 1 : -1))
    // return polls.sort((a,b)=>(new Date(b.startTime).getTime()) - (new Date(a.startTime).getTime()));
  }

  const sortByPopularity = () => {
    // polls.map((poll) => !poll.votes ? poll.votes = [] : null)
    return polls.sort((a, b) =>
      (a.votes && a.votes.length > 0 ? a.votes.length : (a.votes = [])) >
      (b.votes && b.votes.length > 0 ? b.votes.length : (b.votes = []))
        ? -1
        : 1
    )
  }

  useEffect(() => {
    setCommunityPolls(sortByRecent())
    console.log(polls)
  }, [polls])

  useMemo(() => {
    async function getPollToken() {
      if (polls && polls.length > 0) {
        polls.forEach(async poll => {
          await fetch(`${process.env.REACT_APP_API_URL}/token/${communityId}`).then(async response => {
            if (!response.ok) {
              openNotification({
                message: "An error has occurred",
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
            return
          })
        })
      }
    }
    getPollToken()
    return
  }, [polls, communityId])

  const filterProposals = (status: any) => {
    if (status === "all") {
      setCommunityPolls(polls)
      return
    }
    const formatted = polls.filter((poll: Poll) => poll.isActive === status)
    setCommunityPolls(formatted)
  }

  const filterProposalByPopularity = (status: string | undefined) => {
    status === ProposalPopularity.RECENT ? sortByRecent() : sortByPopularity()
  }

  return (
    <ProposalListContainer container direction="column">
      <Header container justifyContent="space-between" alignItems="center">
        <Grid item xs>
          <Typography variant={"body2"} color="textPrimary">
            Proposals
          </Typography>
        </Grid>
        {/* <Grid item xs={4} container direction="row" justifyContent="flex-end">
          <Dropdown
            options={[
              { name: "Most recent", value: "recent" },
              { name: "Most popular", value: "popular" }
            ]}
            value={"recent"}
            onSelected={filterProposalByPopularity}
          />
        </Grid> */}
        <Grid item xs={3} container direction="row" justifyContent="flex-end">
          <Dropdown
            options={[
              { name: "All", value: "all" },
              { name: "Active", value: "active" },
              { name: "Closed", value: "closed" }
            ]}
            value={"all"}
            onSelected={filterProposals}
          />
        </Grid>
      </Header>
      <StyledDivider />
      {communityPolls && communityPolls.length > 0 ? (
        communityPolls.map((poll, i) => {
          return (
            <div key={`poll-${i}`}>
              <ProposalTableRow poll={poll} />
              {communityPolls.length - 1 !== i ? <StyledDivider key={`divider-${i}`} /> : null}
            </div>
          )
        })
      ) : (
        <Header>
          <NoProposalsText color="textPrimary">No proposals</NoProposalsText>
        </Header>
      )}
    </ProposalListContainer>
  )
}
