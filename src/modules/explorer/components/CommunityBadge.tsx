import React from "react"
import { Avatar, Grid, styled, Typography } from "@material-ui/core"

const StyledAvatar = styled(Avatar)({
    height: 27,
    width: 27
  })
  
export const CommunityBadge: React.FC = () => {
  return (
    <Grid container style={{ gap: 11 }}>
      <Grid item>
        <StyledAvatar> </StyledAvatar>
      </Grid>
      <Grid item>
        <Typography color="textPrimary" variant="subtitle2">
          TEZDAO
        </Typography>
      </Grid>
    </Grid>
  )
}
