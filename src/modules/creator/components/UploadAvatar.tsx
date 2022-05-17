import React from "react"
import { Avatar, Button, Divider, Grid, styled, Typography } from "@mui/material"
import { theme } from "theme"

const AvatarCardContainer = styled(Grid)(({ theme }) => ({
  height: "100%",
  background: theme.palette.primary.main,
  borderRadius: 8
}))

const StyledAvatar = styled(Avatar)({
  width: 116,
  height: 116
})

export const UploadAvatar = () => {
  return (
    <AvatarCardContainer container flexDirection="column">
      <Grid item px={2} py={2}>
        <Typography variant="body2" color={theme.palette.text.secondary}>
          Avatar
        </Typography>
      </Grid>
      <Divider />
      <Grid container my={3.8} style={{ gap: 28 }} alignItems="center" flexDirection="column">
        <Grid item justifyContent="center">
          <StyledAvatar> </StyledAvatar>
        </Grid>

        <Grid item>
          <Button variant="contained" color="secondary">
            Upload
          </Button>
        </Grid>
      </Grid>
    </AvatarCardContainer>
  )
}
