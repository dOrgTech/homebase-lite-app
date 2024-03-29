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
  const [isFilter, setIsFilter] = useState(false)
  const [isFilterByStatus, setIsFilterByStatus] = useState(1)
  const [statusFilter, setStatusFilter] = useState("")
  const [shouldFilter, setShowFilter] = useState(false)

  useEffect(() => {
    setCommunityPolls(polls)
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
    setStatusFilter(status)
    if (status === "all") {
      setIsFilterByStatus(Math.random())
      if (isFilter) {
        sortByPopularity
        return
      }
      setCommunityPolls(polls)
      return
    }
    if (status !== "all") {
      setIsFilterByStatus(Math.random())

      if (isFilter) {
        sortByPopularity
        return
      }
      const formatted = polls.filter((poll: Poll) => poll.isActive === status)
      setCommunityPolls(formatted)
    }
  }

  const filterProposalByPopularity = (status: string | undefined) => {
    status === ProposalPopularity.RECENT ? setIsFilter(false) : setIsFilter(true)
  }

  const sortByRecent = useMemo(() => {
    if (!isFilter) {
      if (!isFilterByStatus || statusFilter === "") {
        setCommunityPolls(polls)
        setIsFilter(false)
      } else {
        if (statusFilter !== 'all') {
          const formatted = polls.filter((poll: Poll) => poll.isActive === statusFilter)
          setCommunityPolls(formatted)
        } else {
          setCommunityPolls(polls)
        }

        setIsFilter(false)
      }
    }
  }, [isFilter, statusFilter])

  const sortByPopularity = useMemo(
    (status?: string) => {
      if (isFilter) {
        if (status !== ProposalStatus.ACTIVE && status !== ProposalStatus.CLOSED && status !== undefined) {
          const formatted = polls
            .slice()
            .sort((a, b) =>
              (a.votes && a.votes.length > 0 ? a.votes.length : 0) >
              (b.votes && b.votes.length > 0 ? b.votes.length : 0)
                ? -1
                : 1
            )
          setCommunityPolls(formatted)
          setIsFilter(true)
        } else {
          let formatted
          if (statusFilter === "all" || statusFilter === "") {
            formatted = polls
          } else {
            formatted = polls.filter((poll: Poll) => poll.isActive === statusFilter)
          }
          setCommunityPolls(formatted)
          const formattedByPopularity = formatted
            .slice()
            .sort((a, b) =>
              (a.votes && a.votes.length > 0 ? a.votes.length : 0) >
              (b.votes && b.votes.length > 0 ? b.votes.length : 0)
                ? -1
                : 1
            )
          setCommunityPolls(formattedByPopularity)
          setIsFilter(true)
        }
      }
    },
    [isFilter, statusFilter]
  )

  return (
    <ProposalListContainer container direction="column">
      <Header container justifyContent="space-between" alignItems="center">
        <Grid item xs>
          <Typography variant={"body2"} color="textPrimary">
            Proposals
          </Typography>
        </Grid>
        <Grid item xs={4} container direction="row" justifyContent="flex-end">
          <Dropdown
            options={[
              { name: "Most recent", value: "recent" },
              { name: "Most popular", value: "popular" }
            ]}
            value={"recent"}
            onSelected={filterProposalByPopularity}
          />
        </Grid>
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
