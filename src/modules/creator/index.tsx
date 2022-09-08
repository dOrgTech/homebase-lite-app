import React from "react"
import { Grid, TextField, styled, Container, Typography, Checkbox, Button } from "@mui/material"
import { UploadAvatar } from "./components/UploadAvatar"
import { BackButton } from "../common/BackButton"

const CommunityContainer = styled(Grid)(({ theme }) => ({
  boxSizing: "border-box",
  padding: "0px 15px",
  [theme.breakpoints.down("md")]: {
    marginTop: 30
  }
}))

const CommunityContainerBottom = styled(Grid)(({ theme }) => ({
  boxSizing: "border-box",
  padding: "0px 15px",
  [theme.breakpoints.down("md")]: {
    marginTop: 30
  },
  marginTop: 30
}))

const TitleContainer = styled(Grid)(({ theme }) => ({
  boxSizing: "border-box",
  padding: "0px 15px",
  [theme.breakpoints.down("md")]: {
    marginTop: 30
  },
  marginBottom: 26
}))

const AvatarContainer = styled(Grid)({
  height: "100%"
})

const SmallTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& input": {
      width: 310,
      [theme.breakpoints.down("md")]: {
        minWidth: 310
      }
    }
  }
}))

const StyledContainer = styled(Container)({
  marginBottom: 100
})

export const CommunityCreator: React.FC = () => {
  return (
    <StyledContainer>
      <Grid container mx={2} my={3}>
        <BackButton />
      </Grid>

      <Grid container>
        <TitleContainer container direction="row">
          <Typography variant="subtitle1" color="textPrimary">
            Create a Community
          </Typography>
        </TitleContainer>
        <CommunityContainer container flexDirection={"column"} style={{ gap: 30 }} xs={12} md={6} lg={9}>
          <Grid item>
            <TextField placeholder="Community Name*" />
          </Grid>
          <Grid item>
            <TextField placeholder="Short description" multiline minRows={2} maxRows={Infinity} />
          </Grid>
          <Grid item>
            <TextField placeholder="Link to Terms" />
          </Grid>
          <Grid item>
            <TextField placeholder="Token Contract Address" />
          </Grid>
        </CommunityContainer>
        <CommunityContainer container flexDirection={"column"} style={{ gap: 30 }} item xs={12} md={6} lg={3}>
          <AvatarContainer item>
            <UploadAvatar />
          </AvatarContainer>
        </CommunityContainer>

        <CommunityContainerBottom container justifyContent="space-between" spacing={"16"}>
          <Grid item container xs={12} md={4}>
            <SmallTextField placeholder="Token Symbol" />
          </Grid>
          <Grid item container xs={12} md={4}>
            <SmallTextField placeholder="Token ID" />
          </Grid>
          <Grid item container xs={12} md={4}>
            <SmallTextField placeholder="Token Standard" />
          </Grid>
        </CommunityContainerBottom>

        <CommunityContainerBottom container flexDirection="column">
          <Grid container direction="row" alignItems="center">
            <Checkbox color="secondary" disableRipple />

            <Typography variant="h2" color="textPrimary">
              Require token ownership to create proposals
            </Typography>
          </Grid>
          <Grid container direction="row" alignItems="center">
            <Checkbox color="secondary" disableRipple />
            <Typography variant="h2" color="textPrimary">
              Allow public read access to this community
            </Typography>
          </Grid>
        </CommunityContainerBottom>
        <CommunityContainerBottom>
          <Button variant="contained" color="secondary">
            Create Community
          </Button>
        </CommunityContainerBottom>
      </Grid>
    </StyledContainer>
  )
}
