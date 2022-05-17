import React from "react"
import { Button, useMediaQuery, Grid, Typography, Theme, styled, useTheme } from "@mui/material"
import { theme } from "theme"
import { SearchInput } from "./components/SearchBar"
import { DaoCard } from "../../components/DaoCard"
import { useNavigate } from "react-router-dom"

const PageContainer = styled("div")({
  width: "100%",
  maxWidth: 1186,
  height: "100%",
  margin: "auto",

  [theme.breakpoints.down("md")]: {
    padding: "18px",
    boxSizing: "border-box"
  }
})

export const CommunityList = () => {
  const theme = useTheme<Theme>()
  const navigate = useNavigate()
  const isMobileSmall = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <PageContainer>
      <Grid container style={{ gap: 42 }} direction="column">
        <Grid item>
          <Grid
            container
            justifyContent={isMobileSmall ? "center" : "space-between"}
            alignItems="center"
            style={{ gap: 42 }}
          >
            <Grid item xs={8} sm={6}>
              <SearchInput
                search={value => {
                  // @TODO: Add functionality
                  console.log("search value => ", value)
                }}
              />
            </Grid>
            <Grid item>
              <Grid container style={{ gap: 22 }} justifyContent="center">
                <Grid item>
                  <Grid container justifyContent="center" alignItems="center" style={{ height: "100%" }}>
                    <Grid item>
                      <Typography color="textPrimary">548 communities</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary" onClick={() => navigate("/creator")}>
                    Create Community
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container rowSpacing={{ xs: 1, sm: 2, md: 3 }} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
          {/*@ts-ignore */}
          {[...Array(30).keys()].map(elem => (
            <Grid item xs={6} md={4} lg={3} xl={2} key={elem}>
              <DaoCard isDetails={false} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </PageContainer>
  )
}
