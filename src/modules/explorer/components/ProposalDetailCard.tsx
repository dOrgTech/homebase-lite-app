import React from "react"
import { Grid, Typography } from "@material-ui/core"
import { GridContainer } from "modules/common/GridContainer"
import { ProposalStatus, TableStatusBadge } from "./ProposalTableRowStatusBadge"
import { CreatorBadge } from "./CreatorBadge"
import { ShareOutlined, MoreHoriz } from "@material-ui/icons"

export const ProposalDetailCard: React.FC = () => {
  return (
    <GridContainer container style={{ gap: 50 }}>
      <Grid container style={{ gap: 25 }}>
        <Typography variant="h1" color="textPrimary">
          Should the DAO fund a new project?
        </Typography>
        <Grid
          container
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item>
            <Grid container style={{ gap: 20 }}>
              <Grid item>
                <TableStatusBadge status={ProposalStatus.ACTIVE} />
              </Grid>
              <Grid item>
                <CreatorBadge address="tz1WF58LWoYY5SqSNiAQMp6nw2PHjSEAwjWy" />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container style={{ gap: 18 }}>
              <Grid item alignItems="center" style={{ cursor: "pointer" }}>
                <MoreHoriz color="secondary" />
              </Grid>
              <Grid item>
                <Grid container style={{ gap: 16, cursor: "pointer" }} alignItems="center">
                  <ShareOutlined color="secondary" />
                  <Typography color="secondary" variant="h5">
                    Share
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Typography variant="body1" color="textPrimary">
          This Proposal was created to fund a new project as the governing body of such and such and such and other can
          go here.
        </Typography>
      </Grid>
    </GridContainer>
  )
}
