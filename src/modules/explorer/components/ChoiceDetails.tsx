import React, { useEffect, useState } from "react"
import { Grid, LinearProgress, styled, Typography } from "@material-ui/core"
import { Choice } from "models/Choice"

const LightText = styled(Typography)({
  fontWeight: 300,
  textAlign: "center"
})

export const ChoiceDetails: React.FC<{ choice: Choice; index: number }> = ({ choice, index }) => {

  return (
    <Grid style={{ gap: 19, display: index > 2 ? "none" : "block", marginBottom: 16 }} container key={index}>
      <Grid container direction="row" spacing={2} alignItems="center">
        <Grid item xs={12} lg={5} md={4} sm={4} container direction="row" justifyContent="space-between">
          <Grid item xs>
            <Typography color="textPrimary"> {choice.name} </Typography>
          </Grid>
          <Grid item xs>
            <LightText color="textPrimary"> 0 </LightText>
          </Grid>
          <Grid item xs={2}>
            <LightText color="textPrimary"> TOKN </LightText>
          </Grid>
        </Grid>
        <Grid
          xs={12}
          lg={7}
          md={8}
          sm={8}
          spacing={1}
          container
          direction="row"
          item
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item xs={10}>
            <LinearProgress
              style={{ width: "100%", marginRight: "4px" }}
              color={index & 1 ? "primary" : "secondary"}
              value={1}
              variant="determinate"
            />
          </Grid>
          <Grid item>
            <Typography color="textPrimary">0%</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
