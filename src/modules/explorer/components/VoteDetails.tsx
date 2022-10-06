import React from "react"
import { Grid, LinearProgress, styled, Typography, useMediaQuery, useTheme } from "@material-ui/core"
import { GridContainer } from "modules/common/GridContainer"
import { VotesDialog } from "./VotesDialog"

const Container = styled(Grid)(({ theme }) => ({
  background: theme.palette.primary.light,
  borderRadius: 8
}))

const TitleContainer = styled(Grid)(({ theme }) => ({
  paddingTop: 18,
  paddingLeft: 46,
  paddingRight: 46,
  paddingBottom: 18,
  borderBottom: `0.3px solid ${theme.palette.primary.light}`,
  [theme.breakpoints.down("sm")]: {
    padding: "18px 25px"
  }
}))

const LinearContainer = styled(GridContainer)({
  paddingBottom: 0,
  minHeight: 110
})

const LegendContainer = styled(GridContainer)({
  minHeight: 30,
  paddingBottom: 0
})

const GraphicsContainer = styled(Grid)({
  paddingBottom: 25
})

export const VoteDetails: React.FC = () => {
  const theme = useTheme()
  const isMobileSmall = useMediaQuery(theme.breakpoints.down("xs"))
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))


  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    if (!isMobile) {
      setOpen(true)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Container container direction="column">
      <TitleContainer item>
        <Typography variant={"body2"} color="textPrimary">
          Results
        </Typography>
      </TitleContainer>
      <GraphicsContainer container>
        <LinearContainer container direction="column" style={{ gap: 20 }}>
          <Grid item container direction="row" alignItems="center">
            <Grid item xs={12} lg={6} sm={6}>
              <Typography color="textPrimary" variant="body2">
                Option 1
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6} sm={6} container justifyContent={isMobileSmall ? "flex-start" : "flex-end"}>
              <Typography color="textPrimary" variant="body2">
                15 Voters - 150k TOKN
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" alignItems="center">
            <Grid item xs={10} lg={11} sm={11}>
              <LinearProgress
                style={{ width: "100%", marginRight: "4px" }}
                color="secondary"
                value={60}
                variant="determinate"
              />
            </Grid>
            <Grid item xs={2} lg={1} sm={1} container justifyContent="flex-end">
              <Typography color="textPrimary" variant="body2">
                60%
              </Typography>
            </Grid>
          </Grid>
        </LinearContainer>

        <LinearContainer container direction="column" style={{ gap: 20 }}>
          <Grid item container direction="row">
            <Grid item xs={12} lg={6} sm={6}>
              <Typography color="textPrimary" variant="body2">
                Option 2
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6} sm={6} container justifyContent={isMobileSmall ? "flex-start" : "flex-end"}>
              <Typography color="textPrimary" variant="body2">
                14 Voters - 140k TOKN
              </Typography>
            </Grid>
          </Grid>
          <Grid item container direction="row" alignItems="center">
            <Grid item xs={10} lg={11} md={11} sm={11}>
              <LinearProgress
                style={{ width: "100%", marginRight: "4px" }}
                color="primary"
                value={40}
                variant="determinate"
              />
            </Grid>
            <Grid item xs={2} lg={1} md={1} sm={1} container justifyContent="flex-end">
              <Typography color="textPrimary" variant="body2">
                40%
              </Typography>
            </Grid>
          </Grid>
        </LinearContainer>

        <LegendContainer container direction="row">
          <Grid item container direction="row" xs={12} sm={6} md={6} lg={6} style={{ gap: 10 }}>
            <Typography color="secondary" variant="body1" onClick={() => handleClickOpen()}>
              30
            </Typography>
            <Typography color="textPrimary" variant="body1">
              Votes
            </Typography>
            <Typography color="textPrimary" variant="body2">
              (44% Turnout)
            </Typography>
          </Grid>

          <Grid
            item
            container
            direction="row"
            xs={12}
            md={6}
            sm={6}
            lg={6}
            style={{ gap: 10 }}
            justifyContent={isMobileSmall ? "flex-start" : "flex-end"}
          >
            <Typography color="textPrimary" variant="body1">
              300k
            </Typography>
            <Typography color="textPrimary" variant="body1">
              TOKN
            </Typography>
            <Typography color="textPrimary" variant="body2">
              (19% of Treasury)
            </Typography>
          </Grid>
        </LegendContainer>

        <VotesDialog open={open} handleClose={handleClose} />
      </GraphicsContainer>
    </Container>
  )
}
