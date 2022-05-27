import { Avatar, Button, Grid, styled, Typography } from "@mui/material"
import React, { useMemo } from "react"
import { theme } from "theme"
import { useNavigate } from "react-router-dom"
import { DAOListItem } from "services/indexer"
import { useWallet } from "services/beacon"

const getHashedHexRGB = (str: string) => {
  const colors = ["#FFC2CF", "#FFC839", "#62CEAE", "#DB6C6C", "#56CAE3", "#E99571"]

  let strNumericValue = 0
  for (let i = 0; i < str.length; i++) {
    strNumericValue = str.charCodeAt(i) - 97
  }
  const index = Math.abs(strNumericValue) % (colors.length - 1)
  return colors[index]
}

const DaoCardContainer = styled(Grid)(({ theme }) => ({
  background: theme.palette.primary.main,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column"
}))

type Props = {
  isDetails: boolean
  dao: DAOListItem
}

export const DaoCard = (props: Props) => {
  const { isDetails, dao } = props
  const { address } = useWallet()
  const navigate = useNavigate()

  const navigateToCommunityPage = () => {
    navigate(`/explorer/communities/${dao.address}`)
  }

  const navigateToCommunityProposal = () => {
    navigate(`/explorer/communities/${dao.address}/proposal`)
  }

  const userIsMember = useMemo(
    () => !!dao.ledgers.find(ledger => ledger.holder.address === address),
    [address, dao.ledgers]
  )

  const DaoAvatar = useMemo(() => {
    // @TODO show when dao has linked image
    // <Avatar sx={{ width: isDetails ? 116 : 84, height: isDetails ? 116 : 84 }}> </Avatar>
    return (
      <Avatar sx={{ bgcolor: getHashedHexRGB(dao.address), width: isDetails ? 116 : 84, height: isDetails ? 116 : 84 }}>
        {dao.name.substring(0, 2).toUpperCase()}
      </Avatar>
    )
  }, [dao.address, dao.name, isDetails])

  return (
    <DaoCardContainer container py={isDetails ? 4.5 : 2.8} style={{ gap: 15 }}>
      <Grid item>{DaoAvatar}</Grid>
      <Grid item style={{ cursor: "pointer" }} onClick={navigateToCommunityPage}>
        <Typography variant="body1" color={theme.palette.text.primary}>
          {dao.name}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" color={theme.palette.text.secondary}>
          {dao.ledgers.length}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          // @TODO functionality to join/leave the community
          onClick={() => console.log(userIsMember ? "Leave" : "Join")}
        >
          {userIsMember ? "Leave" : "Join"}
        </Button>
      </Grid>
      {isDetails ? (
        <Grid item>
          <Button variant="contained" color="secondary" size="small" onClick={navigateToCommunityProposal}>
            New Proposal
          </Button>
        </Grid>
      ) : null}
    </DaoCardContainer>
  )
}
