import React from "react"
import { makeStyles, ThemeProvider } from "@material-ui/core"
import { theme } from "theme"
import { Switch, Route, Redirect } from "react-router"
import { BrowserRouter as Router } from "react-router-dom"
import ScrollToTop from "modules/common/ScrollToTop"
import { Navbar as Toolbar } from "modules/common/Toolbar";
import "App.css"
import { DAOExplorerRouter } from "modules/explorer/router"
import { CommunityCreator } from "modules/creator"
import { SnackbarProvider } from "notistack"
import { ActionSheetProvider } from "modules/explorer/context/ActionSheets"
import { QueryClient, QueryClientProvider } from "react-query"
import mixpanel from "mixpanel-browser"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attemptIndex: any) => Math.min(1000 * 2 ** attemptIndex, 60000),
      retry: false,
      retryOnMount: false,
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      staleTime: 5000,
      cacheTime: 30000
    }
  }
})

const styles = makeStyles({
  success: {
    backgroundColor: "#4BCF93 !important",
    padding: "6px 28px",
    height: 54,
    fontSize: 13,
    lineHeight: "0px",
    opacity: 1
  },
  error: {
    backgroundColor: "#ED254E !important",
    padding: "6px 28px",
    height: 54,
    fontSize: 13,
    lineHeight: "0px",
    opacity: 1
  },
  info: {
    backgroundColor: "#3866F9 !important",
    padding: "6px 28px",
    height: 54,
    fontSize: 13,
    lineHeight: "0px",
    opacity: 1
  }
})

if (!process.env.REACT_APP_MIXPANEL_TOKEN) {
  throw new Error("REACT_APP_MIXPANEL_TOKEN env variable is missing");
}


if (!process.env.REACT_APP_MIXPANEL_DEBUG_ENABLED) {
  throw new Error("REACT_APP_MIXPANEL_DEBUG_ENABLED env variable is missing");
}

mixpanel.init(process.env.REACT_APP_MIXPANEL_TOKEN, {
  debug: process.env.REACT_APP_MIXPANEL_DEBUG_ENABLED == "true",
});
mixpanel.track("Visit");

const App: React.FC = () => {
  const classes = styles()
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider
        classes={{
          variantSuccess: classes.success,
          variantError: classes.error,
          variantInfo: classes.info
        }}
      >
        <QueryClientProvider client={queryClient}>
          <ActionSheetProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Router>
              <Toolbar />
              <ScrollToTop />
              <Switch>
                <Route path="/explorer">
                  <DAOExplorerRouter />
                </Route>
                <Route path="/creator">
                  <CommunityCreator />
                </Route>
                <Redirect to="/explorer" />
              </Switch>
            </Router>
            </LocalizationProvider>
          </ActionSheetProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default App
