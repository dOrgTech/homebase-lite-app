import React from "react"
import { Divider, Grid, styled, Theme, Typography, useMediaQuery, useTheme } from "@material-ui/core"

const StyledContainer = styled(Grid)(({ theme }: { theme: Theme }) => ({
  borderRadius: 4,
  minHeight: 75,
  border: "1px solid",
  borderColor: theme.palette.primary.light,
  cursor: "pointer",
}))

export const ChoiceItemSelected: React.FC<{ description: string }> = ({ description }) => {
  const theme = useTheme()
  const isMobileSmall = useMediaQuery(theme.breakpoints.down("sm"))
  
  return (
    <StyledContainer spacing={isMobileSmall ? 1 : 2} container item xs={isMobileSmall ? 12 : 6} justifyContent={"center"} alignItems="center">
      <Typography variant="body1" color="textPrimary">
        {description}
      </Typography>

    </StyledContainer>
  )
}
