import React from "react"
import { Divider, Grid, Theme, Typography, styled } from "@mui/material"

const StyledContainer = styled(Grid)(({ theme }: { theme: Theme }) => ({
  borderRadius: 4,
  minHeight: 75,
  border: "1px solid",
  borderColor: theme.palette.primary.light,
  cursor: "pointer"
}))

type Props = { description: string }

export const ChoiceItemSelected = (props: Props) => {
  const { description } = props

  return (
    <StyledContainer container justifyContent="center" alignItems="center">
      <Typography variant="body1" color="textPrimary">
        {description}
      </Typography>
      <Divider />
    </StyledContainer>
  )
}
