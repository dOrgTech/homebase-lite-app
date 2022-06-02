import React from "react"
import { styled } from "@mui/material"

const Container = styled("div")({
  height: "calc(100% - 100px)",
  width: "100%",
  maxWidth: 1186,
  margin: "auto"
})

const InnerContainer = styled("div")({
  height: "100%",
  padding: "0 24px"
})

export const PageContainer = (props: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => (
  <Container>
    <InnerContainer {...props} />
  </Container>
)
