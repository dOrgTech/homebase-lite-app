import { Avatar, Button, Grid, styled, Typography } from "@material-ui/core"
import React from "react"
import { useHistory } from "react-router"


const StyledAvatar = styled(Avatar)({
  height: 84,
  width: 84
})

const MembersText = styled(Typography)({
  fontWeight: 200,
  fontSize: 16,
  marginTop: -8,
  marginBottom: 8
})

type DaoCardProps = {
  isDetails: boolean
}

const DaoCardContainer = styled(Grid)(({ theme }) => ({
  background: theme.palette.primary.main,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  height: 245,
  marginBottom: 15
}))

export const DaoCard: React.FC<DaoCardProps> = ({ isDetails }) => {
  const navigate = useHistory()
  return (
    <DaoCardContainer container style={{ gap: 10 }}>
      <Grid item>
        <StyledAvatar> </StyledAvatar>
      </Grid>
      <Grid item style={{ cursor: "pointer" }} onClick={() => navigate.push("/explorer/communities/1")}>
        <Typography variant={"body1"} color="textPrimary">
          TEZDAO
        </Typography>
      </Grid>
      <Grid item>
        <MembersText variant={"body2"} color="textPrimary">
          300 members
        </MembersText>
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
            onClick={() => navigate.push("/explorer/communities/1/proposal")}
          >
            New Proposal
          </Button>
        </Grid>
      )}
    </DaoCardContainer>
  )
}
