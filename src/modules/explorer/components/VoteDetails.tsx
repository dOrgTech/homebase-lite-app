import React from "react";
import { Divider, Grid, Typography } from "@mui/material";
import { GridContainer } from "modules/common/GridContainer";
import { theme } from "theme";
import { ProposalStatus, TableStatusBadge } from "./ProposalTableRowStatusBadge";
import { LinearChart } from "modules/common/LinearChart";

export const VoteDetails: React.FC = () => {
  return (
    <GridContainer container flexDirection='column'>
      <Grid item px={5} py={2.5}>
        <Typography variant={"body2"} color={theme.palette.text.secondary}>
          Information
        </Typography>
      </Grid>
      <Divider />
      <Grid container px={5} py={3} style={{ gap: 25 }}>
        <Grid item>
          <Grid container style={{ gap: 32 }} alignItems='center'>
            <TableStatusBadge status={ProposalStatus.ACTIVE} />
            <Typography variant={"body1"} color={theme.palette.text.primary} fontWeight={300}>
              Dec 19, 2020. 11:09 AM PST
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container style={{ gap: 15 }}>
            <Typography variant={"body1"} color={theme.palette.text.primary} fontWeight={500}>
              Current Votes:
            </Typography>
            <Typography variant={"body1"} color={theme.palette.text.primary} fontWeight={300}>
              10
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container px={5} pb={3}>
        <LinearChart
          items={[
            { name: "choice 1:", percent: 50, votes: 6 },
            { name: "choice 2:", percent: 20, votes: 2 },
            { name: "choice 3:", percent: 20, votes: 2 },
            { name: "choice 4:", percent: 10, votes: 1 },
          ]}
        />
      </Grid>
    </GridContainer>
  );
};
