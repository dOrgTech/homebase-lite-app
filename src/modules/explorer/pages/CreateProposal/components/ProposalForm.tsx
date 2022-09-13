import React from "react"
import { Grid, TextField, styled, Container } from "@material-ui/core"
import { BackButton } from "modules/common/BackButton"
import { Choices } from "modules/explorer/components/Choices"

const ProposalContainer = styled(Grid)(({ theme }) => ({
  boxSizing: "border-box",
  padding: "0px 15px",
  [theme.breakpoints.down("md")]: {
    marginTop: 30
  }
}))

const ProposalChoices = styled(Grid)({
  flexGrow: 1,
  minHeight: 250
})

export const ProposalForm: React.FC = () => {
  return (
    <Container>
      <Grid container>
        <BackButton />
      </Grid>
      <Grid container>
        <ProposalContainer container direction={"column"} style={{ gap: 30 }} xs={12} md={6} lg={8}>
          <Grid item>
            <TextField placeholder="Proposal Title" />
          </Grid>
          <Grid item>
            <TextField placeholder="Proposal Details" multiline minRows={15} maxRows={Infinity} />
          </Grid>
        </ProposalContainer>
        <ProposalContainer container direction={"column"} style={{ gap: 30 }} item xs={12} md={6} lg={4}>
          <Grid item>
            <TextField placeholder="Proposal Title" />
          </Grid>
          <Grid item>
            <TextField placeholder="Proposal Title" />
          </Grid>
          <ProposalChoices>
            <Choices />
          </ProposalChoices>
        </ProposalContainer>
      </Grid>
    </Container>
  )
}
