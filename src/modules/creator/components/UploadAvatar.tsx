import React, { useState } from "react"
import { Avatar, Button, Grid, styled, Typography } from "@material-ui/core"

const AvatarCardContainer = styled(Grid)(({ theme }) => ({
  height: "100%",
  background: theme.palette.primary.main,
  borderRadius: 8
}))

const StyledAvatar = styled(Avatar)({
  width: 126,
  height: 126
})

const AvatarContainer = styled(Grid)(({ theme }) => ({
  marginTop: 70,
  marginBottom: 30,
  [theme.breakpoints.down("sm")]: {
    marginTop: 30
  }
}))

const AvatarBox = styled(Grid)(({ theme }) => ({
  borderBottom: `0.3px solid ${theme.palette.primary.light}`,
  paddingLeft: 26,
  height: 54,
  display: "grid",
  alignItems: "center"
}))

export const UploadAvatar: React.FC<any> = ({ setFieldValue, values }) => {
  const [avatarPreview, setAvatarPreview] = useState<any>("")

  return (
    <AvatarCardContainer container direction={"column"}>
      <AvatarBox item>
        <Typography variant={"body2"} color="textPrimary">
          Avatar
        </Typography>
      </AvatarBox>
      <AvatarContainer container item style={{ gap: 28 }} alignItems={"center"} direction={"column"}>
        <Grid item>
          <StyledAvatar src={avatarPreview} />
        </Grid>

        <Grid item>
          <Button variant="contained" color="secondary" component="label">
            Upload
            <input
              name="avatar_url"
              accept="image/*"
              id="contained-button-file"
              type="file"
              hidden
              onChange={e => {
                const fileReader = new FileReader()
                fileReader.onload = () => {
                  if (fileReader.readyState === 2) {
                    setFieldValue("avatar_url", fileReader.result)
                    setAvatarPreview(fileReader.result)
                  }
                }
                if (e.target && e.target.files && e.target.files?.length > 0) {
                  fileReader.readAsDataURL(e.target.files[0])
                }
              }}
            />
          </Button>
        </Grid>
      </AvatarContainer>
    </AvatarCardContainer>
  )
}
