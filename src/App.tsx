import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import AdapterDayjs from "@mui/lab/AdapterDayjs"
import { ThemeProvider } from "@mui/material"
import { LocalizationProvider } from "@mui/lab"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { DAOExplorerRouter } from "modules/explorer/router"
import { CommunityCreator } from "modules/creator"
import { Navbar } from "modules/common/Navbar"
import { ScrollToTop } from "modules/common/ScrollToTop"
import { theme } from "theme"
import "App.css"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 60000),
      retry: false,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      staleTime: 5000,
      cacheTime: 30000
    }
  }
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Navbar />
            <ScrollToTop />
            <Routes>
              <Route path="/explorer/*" element={<DAOExplorerRouter />} />
              <Route path="/creator" element={<CommunityCreator />} />
              <Route path="*" element={<Navigate to="/explorer/communities" />} />
            </Routes>
          </Router>
        </QueryClientProvider>
      </LocalizationProvider>
    </ThemeProvider>
  )
}

export default App
