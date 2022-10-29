import React, { useContext, useEffect, useState } from "react"
import { Button, Grid, styled, useMediaQuery, useTheme } from "@material-ui/core"
import { BackButton } from "modules/common/BackButton"
import { ProposalDetailCard } from "modules/explorer/components/ProposalDetailCard"
import { GridContainer } from "modules/common/GridContainer"
import { ChoiceItemSelected } from "modules/explorer/components/ChoiceItemSelected"
import { VoteDetails } from "modules/explorer/components/VoteDetails"
import { useHistory, useLocation, useParams } from "react-router-dom"
import { Poll } from "models/Polls"
import { Choice } from "models/Choice"
import { useTezos } from "services/beacon/hooks/useTezos"
import { getCurrentBlock, getSignature, getUserTotalSupplyAtReferenceBlock } from "services/utils"
import { useNotification } from "modules/common/hooks/useNotification"
import { DashboardContext } from "modules/explorer/context/ActionSheets/explorer"
import { useHasVoted } from "modules/explorer/hooks/useHasVoted"
import { usePollChoices } from "modules/explorer/hooks/usePollChoices"
import { useCommunity } from "modules/explorer/hooks/useCommunity"
import { useIsMembers } from "modules/explorer/hooks/useIsMember"

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
  const { id } = useParams<{
    id: string
  }>()
  const theme = useTheme()
  const isMobileSmall = useMediaQuery(theme.breakpoints.down("sm"))
  const navigate = useHistory()
  const { state } = useLocation<{ poll: Poll; choices: Choice[] }>()
  const [selectedVote, setSelectedVote] = useState<Choice>()
  const { network, account, wallet } = useTezos()
  const openNotification = useNotification()
  const [refresh, setRefresh] = useState<number>()
  const { hasVoted, vote } = useHasVoted(refresh)
  const poll = state.poll
  const choices = usePollChoices(poll, refresh)
  const community = useCommunity()
  const isMember = useIsMembers(account, community?.members)

  useEffect(() => {
    if (state === undefined) {
      navigate.push(`/explorer/community/${id}`)
    }
  })

  useEffect(() => {
    choices.map(elem => {
      return (elem.selected = false)
    })
  })

  const saveVote = async () => {
    if (!wallet) {
      return
    }

    const { signature, payloadBytes } = await getSignature(account, wallet)
    const publicKey = (await wallet?.client.getActiveAccount())?.publicKey
    if (!signature) {
      openNotification({
        message: `Issue with Signature`,
        autoHideDuration: 3000,
        variant: "error"
      })
      return
    }
    const block = await getCurrentBlock(network)
    // eslint-disable-next-line
    const total = await getUserTotalSupplyAtReferenceBlock(network, poll.tokenAddress!, block, account)

    const walletVote = {
      address: account,
      balanceAtReferenceBlock: total
    }
    if (!hasVoted) {
      await fetch(`${process.env.REACT_APP_API_URL}/update/${selectedVote?._id}/choice`, {
        method: "POST",
        body: JSON.stringify({
          walletAddresses: walletVote,
          signature,
          userAddress: account,
          publicKey,
          payloadBytes
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(resp => {
        if (resp.ok) {
          openNotification({
            message: "Your vote has been submitted",
            autoHideDuration: 3000,
            variant: "success"
          })
          setRefresh(Math.random())
        } else {
          openNotification({
            message: `Something went wrong!!`,
            autoHideDuration: 3000,
            variant: "error"
          })
          return
        }
      })
    } else {
      const data = {
        oldVote: vote,
        newVote: walletVote
      }
      await fetch(`${process.env.REACT_APP_API_URL}/choices/${selectedVote?._id}/add`, {
        method: "POST",
        body: JSON.stringify({
          data,
          signature,
          userAddress: account,
          publicKey,
          payloadBytes
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(resp => {
        if (resp.ok) {
          openNotification({
            message: "Your vote has been submitted",
            autoHideDuration: 3000,
            variant: "success"
          })
          setRefresh(Math.random())
        } else {
          openNotification({
            message: `Something went wrong!!`,
            autoHideDuration: 3000,
            variant: "error"
          })
          return
        }
      })
    }
  }

  return (
    <PageContainer style={{ gap: 30 }}>
      <Grid container>
        <BackButton />
      </Grid>
      <Grid container style={{ gap: 30 }}>
        <Grid item>
          <ProposalDetailCard poll={poll} />
        </Grid>
        <Grid container item xs={12}>
          <GridContainer container style={{ gap: 32 }} direction="row" justifyContent="center">
            <Grid
              container
              item
              justifyContent={isMobileSmall ? "center" : "space-between"}
              direction="row"
              style={{ gap: 30 }}
            >
              {choices.map((choice, index) => {
                return <ChoiceItemSelected key={index} choice={choice} setSelectedVote={setSelectedVote} />
              })}
            </Grid>
            {isMember ? (
              <Button variant="contained" color="secondary" onClick={() => saveVote()}>
                Cast your vote
              </Button>
            ) : null}
          </GridContainer>
        </Grid>
        <Grid item xs={12}>
          <VoteDetails poll={poll} choices={choices} />
        </Grid>
      </Grid>
    </PageContainer>
  )
}
