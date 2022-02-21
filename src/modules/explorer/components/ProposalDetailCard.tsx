import React from "react";
import { Grid, Typography } from "@mui/material";
import { GridContainer } from "modules/common/GridContainer";
import { ProposalStatus, TableStatusBadge } from "./ProposalTableRowStatusBadge";
import { CreatorBadge } from "./CreatorBadge";
import IosShareIcon from "@mui/icons-material/IosShare";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const ProposalDetailCard: React.FC = () => {
  return (
    <GridContainer container px={5.5} py={5} style={{ gap: 50 }}>
      <Grid container style={{ gap: 25 }}>
        <Typography variant='h1' color='textPrimary' fontWeight={500}>
          Should the DAO fund a new project?
        </Typography>
        <Grid
          container
          justifyContent={"space-between"}
          alignItems={"center"}
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item>
            <Grid container style={{ gap: 20 }}>
              <Grid item>
                <TableStatusBadge status={ProposalStatus.ACTIVE} />
              </Grid>
              <Grid item>
                <CreatorBadge address='tz1WF58LWoYY5SqSNiAQMp6nw2PHjSEAwjWy' />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container style={{ gap: 18 }}>
              <Grid item alignItems='center' style={{ cursor: "pointer" }}>
                <MoreHorizIcon color='secondary' />
              </Grid>
              <Grid item>
                <Grid container style={{ gap: 16, cursor: "pointer" }} alignItems='center'>
                  <IosShareIcon color='secondary' />
                  <Typography color='secondary' variant='h5'>
                    Share
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Typography variant='body1' color='textPrimary'>
          This Proposal was created to fund a new project as the governing body of such and such and such and other can
          go here.
        </Typography>
      </Grid>
    </GridContainer>
  );
};
