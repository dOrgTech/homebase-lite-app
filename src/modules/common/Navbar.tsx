import React from "react";
import { Grid, AppBar, Toolbar, Typography, Box, useMediaQuery } from "@mui/material";
import { styled, Theme } from "@mui/material/styles";
import HomeButton from "assets/logos/homebase_lite_logo.svg";
import { theme } from "theme";
import { useNavigate } from "react-router-dom";

const Header = styled(Grid)({
  padding: "28px 125px",
});

const StyledAppBar = styled(AppBar)(({ theme }: { theme: Theme }) => ({
  boxShadow: "none",
  background: theme.palette.primary.dark,
}));

const StyledToolbar = styled(Toolbar)({
  width: "100%",
  display: "flex",
  padding: 0,
  boxSizing: "border-box",
  justifyContent: "space-between",
  flexWrap: "wrap",
});

const LogoText = styled(Typography)({
  fontWeight: "bold",
  fontSize: "24px",
  cursor: "pointer",
});

const LogoSecondText = styled(Typography)({
  marginLeft: "2px",
  marginTop: "1px",
  fontSize: "24px",
  cursor: "pointer",
  fontFamily: "Roboto Condensed",
});

const LogoItem = styled("img")({
  height: "30px",
  cursor: "pointer",
  paddingTop: 8,
});

const ToolbarContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    marginLeft: 16,
  },
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "center",
    marginLeft: 0,
  },
}));

export const Navbar: React.FC = () => {
  const isMobileExtraSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const navigate = useNavigate();
  return (
    <StyledAppBar position='sticky'>
      <StyledToolbar>
        <Header
          container
          direction={isMobileExtraSmall ? "column" : "row"}
          alignItems='center'
          wrap='wrap'
          onClick={() => navigate('/explorer/communities')}
          justifyContent='space-between'>
          <Grid item>
            <Box>
              <ToolbarContainer container alignItems='center' wrap='nowrap'>
                <Grid item>
                  <LogoItem src={HomeButton} />
                </Grid>
                <Grid item>
                  <Box paddingLeft='10px' display='flex'>
                    <LogoText color='textPrimary'>Homebase</LogoText>
                    <LogoSecondText color='textPrimary'>lite</LogoSecondText>
                  </Box>
                </Grid>
              </ToolbarContainer>
            </Box>
          </Grid>
        </Header>
      </StyledToolbar>
    </StyledAppBar>
  );
};
