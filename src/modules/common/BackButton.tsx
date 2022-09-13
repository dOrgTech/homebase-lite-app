import React from "react"
import { Grid, Typography } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { ArrowBackIosOutlined } from "@material-ui/icons"

export const BackButton: React.FC = () => {
  const navigate = useHistory()
  return (
    <Grid container style={{ gap: 16, cursor: "pointer" }} onClick={() => navigate.goBack()} alignItems="center">
      <ArrowBackIosOutlined color="secondary" />
      <Typography color="secondary">Back</Typography>
    </Grid>
  )
}
