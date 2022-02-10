import React from "react";
import { Container, Grid, styled } from "@mui/material";
import { DaoCard } from "../../components/DaoCard";
import { ProposalList } from "../../components/ProposalList";

const CommunityDetailsContainer = styled(Grid)(({ theme }) => ({
  boxSizing: "border-box",
  padding: "0px 15px",
  [theme.breakpoints.down("md")]: {
    marginTop: 30,
  },
}));

export const CommunityDetails: React.FC = () => {
  return (
    <Container>
      <Grid container>
        <CommunityDetailsContainer xs={12} md={4} lg={3}>
          <DaoCard isDetails={true} />
        </CommunityDetailsContainer>
        <CommunityDetailsContainer xs={12} md={8} lg={9}>
          <ProposalList />
        </CommunityDetailsContainer>
      </Grid>
    </Container>
  );
};
