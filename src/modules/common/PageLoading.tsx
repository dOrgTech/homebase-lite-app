import React from "react"
import { styled } from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress"

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center"
})

export const PageLoading = () => {
  return (
    <Container>
      <CircularProgress size={75} color="secondary" />
    </Container>
  )
}
