import React from "react"
import { Grid, styled, Typography, Link, useTheme, useMediaQuery } from "@material-ui/core"
import { GridContainer } from "modules/common/GridContainer"
import { ProposalStatus, TableStatusBadge } from "./ProposalTableRowStatusBadge"
import { CreatorBadge } from "./CreatorBadge"
import { MoreHoriz } from "@material-ui/icons"
import Share from "assets/img/share.svg"
import { CommunityBadge } from "./CommunityBadge"
import LinkIcon from "assets/img/link.svg"
import { Poll } from "models/Polls"
import dayjs from "dayjs"

const LogoItem = styled("img")({
  height: 18,
  cursor: "pointer"
})

const TextContainer = styled(Typography)({
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginRight: 8
})

const Divider = styled(Typography)({
  marginLeft: 8,
  marginRight: 8
})

const StyledLink = styled(Link)({
  fontFamily: "Roboto Mono",
  fontWeight: 300,
  fontSize: 16,
  marginLeft: 8
})

export const ProposalDetailCard: React.FC<{ poll: Poll }> = ({ poll }) => {
  const theme = useTheme()
  const isMobileSmall = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <GridContainer container style={{ gap: 50 }}>
      <Grid container style={{ gap: 25 }}>
        <Grid
          item
          container
          alignItems="flex-end"
          direction="row"
          style={{ gap: isMobileSmall ? 25 : 0 }}
          justifyContent="space-between"
        >
          <Grid item>
            <Typography variant="h1" color="textPrimary">
              {poll.name}
            </Typography>
          </Grid>
          <Grid item>
            <Grid container style={{ gap: 18 }} direction="row">
              <Grid style={{ cursor: "pointer" }}>
                <MoreHoriz color="secondary" />
              </Grid>
              <Grid item>
                <Grid container style={{ gap: 12, cursor: "pointer" }} alignItems="center">
                  <LogoItem src={Share} />
                  <Typography color="secondary" variant="h5">
                    Share
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item>
            <Grid container justifyContent={isMobileSmall ? "space-evenly" : "flex-start"} style={{ gap: 23 }}>
              <Grid item>
                <TableStatusBadge status={poll.isActive || ProposalStatus.ACTIVE} />
              </Grid>
              <Grid item>
                <CommunityBadge />
              </Grid>
              <Grid item>
                <CreatorBadge address={poll.author} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item container direction="row" spacing={2} alignItems="center">
            <TextContainer color="textPrimary" variant="body1">
              Start date:{" "}
            </TextContainer>
            <Typography variant="body2" color="textPrimary">
              {" "}
              {dayjs(Number(poll.startTime)).format("ll")}
            </Typography>
            <Divider color="textPrimary">-</Divider>
            <TextContainer color="textPrimary" variant="body1">
              {" "}
              End date:{" "}
            </TextContainer>
            <Typography variant="body2" color="textPrimary">
              {" "}
              {dayjs(Number(poll.endTime)).format("ll")}
            </Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Typography variant="body2" color="textPrimary">
            {poll.description}
          </Typography>
        </Grid>

        {poll.externalLink ? (
          <Grid container alignItems="center">
            <LogoItem src={LinkIcon} />
            <StyledLink color="secondary" href="#">
              {poll.externalLink}
            </StyledLink>
          </Grid>
        ) : null}
      </Grid>
    </GridContainer>
  )
}
