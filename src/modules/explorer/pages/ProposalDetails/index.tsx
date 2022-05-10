import React from "react";
import { Button, Container, Grid } from "@mui/material";
import { BackButton } from "modules/common/BackButton";
import { ProposalDetailCard } from "modules/explorer/components/ProposalDetailCard";
import { GridContainer } from "modules/common/GridContainer";
import { ChoiceItemSelected } from "modules/explorer/components/ChoiceItemSelected";
import { VoteDetails } from "modules/explorer/components/VoteDetails";

export const ProposalDetails: React.FC = () => {
  return (
    <Container>
      <Grid container mx={2} my={3}>
        <BackButton />
      </Grid>
      <ProposalDetailCard />
      <Grid container spacing={3} my={2}>
        <Grid item xs={12} md={6}>
          <GridContainer container style={{ gap: 25 }} px={6} py={5} justifyContent='center'>
            <ChoiceItemSelected description='This is choice 1' />
            <ChoiceItemSelected description='This is choice 2' />
            <Button variant='contained' color='secondary'>
              Cast your vote
            </Button>
          </GridContainer>
        </Grid>
        <Grid item xs={12} md={6}>
          <VoteDetails />
        </Grid>
      </Grid>
    </Container>
  );
};
