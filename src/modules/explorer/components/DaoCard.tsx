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

const DaoCardContainer = styled(Grid)(({ theme }) => ({
  background: theme.palette.primary.main,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  height: 245,
  marginBottom: 15,
  cursor: "pointer"
}))

export const DaoCard: React.FC = () => {
  const navigate = useHistory()
  return (
    <DaoCardContainer container style={{ gap: 10 }} onClick={() => navigate.push("/explorer/community/1")}>
      <Grid item>
        <StyledAvatar> </StyledAvatar>
      </Grid>
      <Grid item style={{ cursor: "pointer" }}>
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
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={e => {
            console.log("Button")
            if (!e) {
              const e = window.event;
              if (e) {
                e.cancelBubble = true
              }
            }
            if (e.stopPropagation) e.stopPropagation()
          }}
        >
          Join
        </Button>
      </Grid>
    </DaoCardContainer>
  )
}
