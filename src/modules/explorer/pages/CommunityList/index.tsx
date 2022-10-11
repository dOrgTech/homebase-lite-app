import React, { useEffect, useState } from "react"
import { theme } from "theme"
import { SearchInput } from "./components/SearchBar"
import { DaoCard } from "../../components/DaoCard"
import { useHistory } from "react-router"
import { Button, Grid, styled, Theme, Typography, useMediaQuery, useTheme } from "@material-ui/core"
import { Community } from "models/Community"

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
    width: "86vw"
  },

  ["@media (max-width:1030px)"]: {},

  ["@media (max-width:960px)"]: {},

  ["@media (max-width:645px)"]: {
    flexDirection: "column"
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
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"))
  const [communities, setCommunities] = useState<Community[]>([])
  const [error, setError] = useState(false)
  const [isUpdated, setIsUpdated] = useState(1)

  useEffect(() => {
    async function getCommunities() {
      await fetch(`${process.env.REACT_APP_API_URL}/daos/`)
        .then(async response => {
          if (!response.status) {
            const message = `An error occurred: ${response.statusText}`
            setError(true)
            return
          }

          const records = await response.json()
          setCommunities(records)
        })
        .catch(err => setError(true))
    }
    getCommunities()
    return
  }, [communities.length])

  useEffect(() => {
    setCommunities([])
  }, [isUpdated])

  return (
    <PageContainer>
      <Grid container direction="column">
        <Grid item>
          <Grid container justifyContent={isMobile ? "center" : "space-between"} alignItems="center">
            <Grid item xs={12} sm={6}>
              <SearchInput search={""} />
            </Grid>
            <Grid item>
              <Grid container style={{ gap: isMobileSmall ? 10 : isMobile ? 0 : 22 }} justifyContent="center">
                <Grid item>
                  <Grid container justifyContent="center" alignItems="center" style={{ height: "100%" }}>
                    <Grid item>
                      <Typography color="textPrimary">{error ? 0 : communities.length} communities</Typography>
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
        {error ? (
          <Grid container>
            <Typography variant="body1" color="textPrimary">
              No communities found
            </Typography>
          </Grid>
        ) : null}

        <Grid container spacing={3}>
          {communities &&
            communities.map(elem => (
              <Grid item xs={6} md={4} lg={3} xl={2} key={elem._id}>
                <DaoCard community={elem} setIsUpdated={setIsUpdated} />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </PageContainer>
  )
}
