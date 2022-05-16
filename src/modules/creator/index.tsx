import React from "react"
import { Grid, TextField, styled, Container } from "@mui/material"
import { UploadAvatar } from "./components/UploadAvatar"
import { Plugins } from "./components/Plugins"
import { BackButton } from "../common/BackButton"

const CommunityContainer = styled(Grid)(({ theme }) => ({
  boxSizing: "border-box",
  padding: "0px 15px",
  [theme.breakpoints.down("md")]: {
    marginTop: 30
  }
}))

export const CommunityCreator: React.FC = () => {
  return (
    <Container>
      <Grid container mx={2} my={3}>
        <BackButton />
      </Grid>

      <Grid container>
        <CommunityContainer container flexDirection={"column"} style={{ gap: 30 }} xs={12} md={6} lg={8}>
          <Grid item>
            <TextField placeholder="Community Name*" />
          </Grid>
          <Grid item>
            <TextField placeholder="About" multiline minRows={7} maxRows={Infinity} />
          </Grid>
          <Grid item>
            <TextField placeholder="Link to Terms" />
          </Grid>
          <Grid item>
            <TextField placeholder="Admin Addresses" multiline minRows={4} maxRows={Infinity} />
          </Grid>
          <Grid item>
            <TextField placeholder="Author Addresses" multiline minRows={4} maxRows={Infinity} />
          </Grid>
        </CommunityContainer>
        <CommunityContainer container flexDirection={"column"} style={{ gap: 30 }} item xs={12} md={6} lg={4}>
          <Grid item>
            <TextField placeholder="Symbol Acronym*" />
          </Grid>
          <Grid item>
            <UploadAvatar />
          </Grid>
          <Grid item>
            <Plugins />
          </Grid>
          <Grid item>
            <TextField placeholder="Proposal threshold" />
          </Grid>
        </CommunityContainer>
      </Grid>
    </Container>
  )
}
