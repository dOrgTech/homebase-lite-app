import { Avatar, Button, Grid, styled, Typography } from "@mui/material"
import React from "react"
import { theme } from "theme"
import { useNavigate } from "react-router-dom"

const DaoCardContainer = styled(Grid)(({ theme }) => ({
  background: theme.palette.primary.main,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column"
}))

type Props = {
  isDetails: boolean
}

export const DaoCard = (props: Props) => {
  const { isDetails } = props
  const navigate = useNavigate()

  return (
    <DaoCardContainer container py={isDetails ? 4.5 : 2.8} style={{ gap: 15 }}>
      <Grid item>
        <Avatar sx={{ width: isDetails ? 116 : 84, height: isDetails ? 116 : 84 }}> </Avatar>
      </Grid>
      <Grid item style={{ cursor: "pointer" }} onClick={() => navigate("/explorer/communities/1")}>
        <Typography variant="body1" color={theme.palette.text.primary}>
          TEZDAO
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" color={theme.palette.text.secondary}>
          300 members
        </Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" color="secondary" size="small" onClick={() => console.log("Button")}>
          Join
        </Button>
      </Grid>
      {isDetails && (
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => navigate("/explorer/communities/1/proposal")}
          >
            New Proposal
          </Button>
        </Grid>
      )}
    </DaoCardContainer>
  )
}
