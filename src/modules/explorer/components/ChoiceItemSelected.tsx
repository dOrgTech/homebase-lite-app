import React from "react"
import { Divider, Grid, Theme, Typography } from "@mui/material"
import { styled } from "@mui/styles"

const StyledContainer = styled(Grid)(({ theme }: { theme: Theme }) => ({
  borderRadius: 4,
  minHeight: 75,
  border: "1px solid",
  borderColor: theme.palette.primary.light,
  cursor: "pointer"
}))

export const ChoiceItemSelected: React.FC<{ description: string }> = ({ description }) => {
  return (
    <StyledContainer container justifyContent={"center"} alignItems="center">
      <Typography variant="body1" color="textPrimary">
        {description}
      </Typography>
      <Divider />
    </StyledContainer>
  )
}
