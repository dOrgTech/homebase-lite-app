import React, { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, useMediaQuery, Grid, Typography, Theme, useTheme } from "@mui/material"
import { DAOListItem, getAllDAOs } from "services/indexer"
import { useWallet } from "services/beacon"
import { PageContainer } from "modules/common/PageContainer"
import { PageLoading } from "modules/common/PageLoading"
import { PageError } from "modules/common/PageError"
import { DaoCard } from "../../components/DaoCard"
import { SearchInput } from "./components/SearchBar"

export const CommunityList = () => {
  const { network } = useWallet()
  const navigate = useNavigate()
  const theme = useTheme<Theme>()
  const isSmSize = useMediaQuery(theme.breakpoints.down("sm"))
  const isMdSize = useMediaQuery(theme.breakpoints.down("md"))

  const [loading, setLoading] = useState(true)
  const [loadingError, setLoadingError] = useState(null)
  const [DAOList, setDAOList] = useState<DAOListItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    getAllDAOs(network)
      .then(daos => {
        const sortedDAOList = daos.sort((a, b) => b.ledgers.length - a.ledgers.length)
        setDAOList(sortedDAOList)
      })
      .catch(error => setLoadingError(error))
      .finally(() => setLoading(false))
  }, [network])

  const navigateToCreateCommunity = () => {
    navigate("/creator")
  }

  const filteredDAOList = useMemo(
    () =>
      DAOList.filter(
        dao =>
          dao.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dao.token.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [DAOList, searchTerm]
  )

  return (
    <PageContainer>
      {!!loadingError ? <PageError /> : null}

      {!loadingError && loading ? <PageLoading /> : null}

      {!loadingError && !loading ? (
        <Grid container style={{ gap: 42 }} direction="column">
          <Grid item>
            <Grid
              container
              justifyContent={isMdSize ? "center" : "space-between"}
              alignItems="center"
              style={{ gap: 42 }}
            >
              <Grid item xs={8} sm={6}>
                <SearchInput search={setSearchTerm} />
              </Grid>
              <Grid item>
                <Grid container style={{ gap: 22 }} justifyContent="center">
                  <Grid item>
                    <Grid container justifyContent="center" alignItems="center" style={{ height: "100%" }}>
                      <Grid item>
                        <Typography color="textPrimary">{DAOList.length} communities</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" onClick={navigateToCreateCommunity}>
                      Create Community
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            style={{ justifyContent: isSmSize ? "center" : "left" }}
            rowSpacing={{ xs: 1, sm: 2, md: 3 }}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {filteredDAOList.map(dao => (
              <Grid item xs={9} sm={6} md={4} lg={3} xl={2} key={dao.address}>
                <DaoCard isDetails={false} dao={dao} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      ) : null}
    </PageContainer>
  )
}
