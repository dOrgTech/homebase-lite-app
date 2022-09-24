import React from "react"
import { theme } from "theme"
import { SearchInput } from "./components/SearchBar"
import { DaoCard } from "../../components/DaoCard"
import { useHistory } from "react-router"
import { Button, Grid, styled, Theme, Typography, useMediaQuery, useTheme } from "@material-ui/core"

const PageContainer = styled("div")({
  marginBottom: 50,
  width: "1000px",
  height: "100%",
  margin: "auto",
  padding: "28px 0",
  boxSizing: "border-box",
  paddingTop: 0,

  ["@media (max-width: 1425px)"]: {},

  ["@media (max-width:1335px)"]: {},

  ["@media (max-width:1167px)"]: {
    width: "86vw",
  },

  ["@media (max-width:1030px)"]: {},

  ["@media (max-width:960px)"]: {},

  ["@media (max-width:645px)"]: {
    flexDirection: "column",
  }
})

const ButtonLabel = styled(Button)(({ theme }) => ({
  fontSize: 15,
  [theme.breakpoints.down("sm")]: {
    fontSize: 14,
    padding: "8px !important"
  }
}))

const CommunitiesContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    marginTop: 24,
    marginBottom: 24
  }
}))

export const CommunityList: React.FC = () => {
  const theme: Theme = useTheme()
  const navigate = useHistory()
  const isMobileSmall = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <PageContainer>
      <Grid container direction="column">
        <Grid item>
          <Grid container justifyContent={isMobileSmall ? "center" : "space-between"} alignItems="center">
            <Grid item xs={12} sm={6}>
              <SearchInput search={""} />
            </Grid>
            <Grid item>
              <Grid container style={{ gap: isMobileSmall ? 16 : 22 }} justifyContent="center">
                <Grid item>
                  <Grid container justifyContent="center" alignItems="center" style={{ height: "100%" }}>
                    <Grid item>
                      <Typography color="textPrimary">548 communities</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <CommunitiesContainer item>
                  <ButtonLabel variant="contained" color="secondary" onClick={() => navigate.push("/creator")}>
                    Create Community
                  </ButtonLabel>
                </CommunitiesContainer>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
          {/*@ts-ignore */}
          {[...Array(30).keys()].map(elem => (
            <Grid item xs={6} md={4} lg={3} xl={2} key={elem}>
              <DaoCard />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </PageContainer>
  )
}
