import React, { Fragment } from "react"
import { Grid, Typography, IconButton, Divider } from "@material-ui/core"
import { theme } from "theme"
import { RemoveCircleOutline } from "@material-ui/icons"

type ChoiceItemProps = {
  index: number
  description: string
}

export const ChoiceItem: React.FC<ChoiceItemProps> = ({ index, description }) => {
  return (
    <Fragment>
      <Grid container justifyContent={"space-between"} alignItems={"center"}>
        <Grid item>
          <Typography variant={"body2"} color="primary">
            {index}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant={"body2"} color="secondary">
            {description}
          </Typography>
        </Grid>

        <Grid item>
          <IconButton size="small">
            <RemoveCircleOutline htmlColor={theme.palette.error.main} />
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
    </Fragment>
  )
}
