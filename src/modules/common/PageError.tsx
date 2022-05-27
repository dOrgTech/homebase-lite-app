import React from "react"
import { styled, Typography } from "@mui/material"

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center"
})

export const PageError = () => {
  return (
    <Container>
      <Typography variant="h2" color="secondary">
        Sorry Something Went Wrong :(
      </Typography>
    </Container>
  )
}
