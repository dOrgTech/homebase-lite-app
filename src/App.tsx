import React from "react";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import { ThemeProvider } from "@mui/material";
import { theme } from "theme";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "modules/common/ScrollToTop";
import { Navbar } from "modules/common/Navbar";
import { LocalizationProvider } from "@mui/lab";
import "App.css";
import { DAOExplorerRouter } from "modules/explorer/router";
import { CommunityCreator } from "modules/creator";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path='/explorer/*' element={<DAOExplorerRouter />} />
            <Route path='/creator' element={<CommunityCreator />} />
            <Route path='*' element={<Navigate to='/explorer/communities' />} />
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
