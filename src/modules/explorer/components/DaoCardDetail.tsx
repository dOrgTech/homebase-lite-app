import { Avatar, Button, Grid, styled, Typography } from "@material-ui/core"
import React from "react"
import { useHistory } from "react-router"

const StyledAvatar = styled(Avatar)({
  height: 159,
  width: 159
})

const MembersText = styled(Typography)({
  fontWeight: 300,
  fontSize: 18,
  letterSpacing: "-0.01em"
})

const CommunityText = styled(Typography)({
  fontWeight: 500,
  fontSize: 34,
  lineHeight: "146.3%"
})

const JoinButton = styled(Button)(({ theme }) => ({
  width: 74,
  padding: 7,
  fontSize: 15,
  [theme.breakpoints.down("md")]: {
    marginTop: 8,
    marginBottom: 4
  }
}))

const CommunityDescription = styled(Typography)({
  marginBottom: 22,
  maxHeight: 124,
  overflowY: "scroll"
})

const ProposalButton = styled(Button)({
  padding: 8,
  fontSize: 15
})

const DaoCardContainer = styled(Grid)(({ theme }) => ({
  background: theme.palette.primary.main,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  marginBottom: 15,
  padding: "33px 43px"
}))

export const DaoCardDetail: React.FC = () => {
  const navigate = useHistory();

  return (
    <DaoCardContainer container style={{ gap: 10 }} direction="column">
      <Grid item>
        <StyledAvatar> </StyledAvatar>
      </Grid>
      <Grid item container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item direction="column" container xs={12} md={12} lg={6}>
          <CommunityText color="textPrimary">TEZDAO</CommunityText>
          <MembersText variant={"body1"} color="textPrimary">
            300 members
          </MembersText>
        </Grid>
        <Grid item>
          <JoinButton variant="contained" color="secondary" size="small" onClick={() => console.log("Button")}>
            Join
          </JoinButton>
        </Grid>
      </Grid>

      <Grid container direction="row">
        <CommunityDescription variant="body2" color="textPrimary">
          The TezDAO was founded as a partnership between some of the most known Tezos Influencers. The purpose of this
          DAO is allow creativity.
        </CommunityDescription>
      </Grid>

        <Grid item>
          <ProposalButton
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => navigate.push("/explorer/community/1/proposal")}
          >
            New Proposal
          </ProposalButton>
        </Grid>

    </DaoCardContainer>
  )
}
