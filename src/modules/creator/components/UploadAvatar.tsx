import React from "react"
import { Avatar, Button, Grid, styled, Typography } from "@mui/material"

const AvatarCardContainer = styled(Grid)(({ theme }) => ({
  height: "100%",
  background: theme.palette.primary.main,
  borderRadius: 8
}))

const StyledAvatar = styled(Avatar)({
  width: 166,
  height: 166
})

const AvatarContainer = styled(Grid)({
  marginTop: 50,
  marginBottom: 30
})

const AvatarBox = styled(Grid)(({ theme }) => ({
  borderBottom: `0.3px solid ${theme.palette.primary.light}`,
  paddingLeft: 26
}))

export const UploadAvatar: React.FC = () => {
  return (
    <AvatarCardContainer container flexDirection={"column"}>
      <AvatarBox item py={2}>
        <Typography variant={"body2"} color="textPrimary">
          Avatar
        </Typography>
      </AvatarBox>
      <AvatarContainer container style={{ gap: 28 }} alignItems={"center"} flexDirection={"column"}>
        <Grid item justifyContent={"center"}>
          <StyledAvatar> </StyledAvatar>
        </Grid>

        <Grid item>
          <Button variant="contained" color="secondary">
            Upload
          </Button>
        </Grid>
      </AvatarContainer>
    </AvatarCardContainer>
  )
}
