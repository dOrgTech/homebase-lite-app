import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { AppBar, Toolbar, Button, Typography, Box, Grid, useTheme, Popover, useMediaQuery, styled } from "@mui/material"
import { ExitToAppOutlined, FileCopyOutlined } from "@mui/icons-material"
import { toShortAddress } from "services/contracts/utils"
import { NetworkType, useWallet } from "services/beacon"
import { UserProfileName } from "modules/explorer/components/UserProfileName"
import { ProfileAvatar } from "modules/explorer/components/ProfileAvatar"
import { NetworkMenu } from "./NetworkMenu"
import HomeButton from "assets/logos/homebase_lite_logo.svg"

const Header = styled(Grid)({
  padding: "40px 0"
})

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  background: theme.palette.primary.dark
}))

const StyledToolbar = styled(Toolbar)({
  width: "100%",
  display: "flex",
  padding: 0,
  boxSizing: "border-box",
  justifyContent: "space-between",
  flexWrap: "wrap"
})

const ToolbarContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    marginLeft: 16
  },
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "center",
    marginLeft: 0
  }
}))

const LogoItem = styled("img")({
  height: "30px",
  cursor: "pointer",
  paddingTop: 8
})

const LogoText = styled(Typography)({
  fontWeight: "bold",
  fontSize: "24px",
  cursor: "pointer"
})

const LogoSecondText = styled(Typography)({
  marginLeft: "2px",
  marginTop: "1px",
  fontSize: "24px",
  cursor: "pointer",
  fontFamily: "Roboto Condensed"
})

const AddressContainer = styled(Grid)({
  cursor: "pointer"
})

const ConnectWallet = styled(Button)({
  maxHeight: 50,
  alignSelf: "baseline"
})

const AddressMenu = styled(Box)(() => ({
  width: 264,
  borderRadius: 4,
  backgroundColor: "#282B31"
}))

const AddressMenuItem = styled(Grid)(({ theme }) => ({
  "cursor": "pointer",
  "boxSizing": "border-box",
  "color": theme.palette.text.secondary,
  "padding": "20px 34px",
  "&:hover": {
    background: "rgba(129, 254, 183, 0.03)",
    borderLeft: `2px solid ${theme.palette.secondary.light}`,
    cursor: "pointer"
  }
}))

const AddressMenuIcon = styled(Grid)({
  paddingRight: "12px",
  marginBottom: "-4px"
})

const AddressBarWrapper = styled(Grid)({
  "boxSizing": "border-box",
  "padding": "8px 16px",
  "borderRadius": 4,
  "&:hover": {
    background: "rgba(129, 254, 183, 0.03)"
  }
})

const StyledPopover = styled(Popover)({
  ".MuiPaper-root": {
    borderRadius: 4
  }
})

export const ConnectWalletButton = ({ text, onClick }: { text: string; onClick: VoidFunction }) => (
  <ConnectWallet color="secondary" variant="contained" onClick={onClick}>
    {text}
  </ConnectWallet>
)

export const Navbar = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobileSmall = useMediaQuery(theme.breakpoints.down("sm"))
  const { connect, address, reset, changeNetwork, network } = useWallet()

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNetworkMenuOpen, setIsNetworkMenuOpen] = useState(false)
  const [networkMenuAnchorEl, setNetworkMenuAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleNetworkButtonClick = (event: React.MouseEvent<any>) => {
    setNetworkMenuAnchorEl(event.currentTarget)
    setIsNetworkMenuOpen(!isNetworkMenuOpen)
  }

  const handleNetworkChange = (network: NetworkType) => {
    changeNetwork(network)
    setIsMenuOpen(!isMenuOpen)
    setIsNetworkMenuOpen(!isNetworkMenuOpen)
    navigate("/explorer/communities")
  }

  const handleAccountClick = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget)
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    reset()
    setIsMenuOpen(false)
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address)
    setIsMenuOpen(false)
  }

  return (
    <StyledAppBar position="sticky">
      <StyledToolbar>
        <Header
          container
          direction={isMobileSmall ? "column" : "row"}
          alignItems="center"
          wrap="wrap"
          justifyContent="space-between"
        >
          <Grid item>
            <Box onClick={() => () => navigate("/explorer/communities")}>
              <ToolbarContainer container alignItems="center" wrap="nowrap">
                <Grid item>
                  <LogoItem src={HomeButton} />
                </Grid>
                <Grid item>
                  <Box paddingLeft="10px" display="flex">
                    <LogoText color="textSecondary">Homebase</LogoText>
                    <LogoSecondText color="textPrimary">lite</LogoSecondText>
                  </Box>
                </Grid>
              </ToolbarContainer>
            </Box>
          </Grid>

          <Grid item>
            <Grid container justifyContent={isMobileSmall ? "center" : "flex-end"}>
              {address ? (
                <>
                  <Grid container alignItems="center" justifyContent={isMobileSmall ? "center" : "flex-end"}>
                    <AddressBarWrapper item>
                      <AddressContainer
                        container
                        alignItems="center"
                        wrap="nowrap"
                        justifyContent="flex-end"
                        onClick={handleAccountClick}
                        style={{ gap: 8 }}
                      >
                        <Grid item>
                          <ProfileAvatar size={22} address={address} />
                        </Grid>
                        <Grid item>
                          <Typography>
                            <UserProfileName address={address} short={true} />
                          </Typography>
                        </Grid>
                      </AddressContainer>
                    </AddressBarWrapper>
                  </Grid>

                  <StyledPopover
                    id="wallet-Popper"
                    open={isMenuOpen}
                    anchorEl={anchorEl}
                    style={{ zIndex: 1500, borderRadius: 4 }}
                    onClose={() => setIsMenuOpen(false)}
                    PaperProps={{
                      style: {
                        borderRadius: 4,
                        backgroundColor: "transparent"
                      }
                    }}
                  >
                    <AddressMenu>
                      <AddressMenuItem container alignItems="center" onClick={handleCopyAddress}>
                        <AddressMenuIcon item>
                          <FileCopyOutlined color="inherit" fontSize="inherit" />
                        </AddressMenuIcon>
                        <Grid item>
                          <Typography variant="subtitle2" color="textSecondary">
                            {toShortAddress(address)}
                          </Typography>
                        </Grid>
                      </AddressMenuItem>
                      <AddressMenuItem container alignItems="center" onClick={handleNetworkButtonClick}>
                        <Grid item>
                          <Typography variant="subtitle2" color="textSecondary">
                            Change network ({network})
                          </Typography>
                        </Grid>
                      </AddressMenuItem>
                      <AddressMenuItem
                        style={{
                          borderTop: "2px solid rgba(255, 255, 255, 0.2)"
                        }}
                        container
                        alignItems="center"
                        onClick={handleLogout}
                      >
                        <AddressMenuIcon item>
                          <ExitToAppOutlined color="inherit" fontSize="inherit" />
                        </AddressMenuIcon>
                        <Grid item>
                          <Typography variant="subtitle2" color="textSecondary">
                            Log out
                          </Typography>
                        </Grid>
                      </AddressMenuItem>
                    </AddressMenu>
                  </StyledPopover>
                </>
              ) : isMobileSmall ? (
                <Grid container justifyContent="center">
                  <Grid item>
                    <ConnectWalletButton text="Connect" onClick={() => connect()} />
                  </Grid>
                </Grid>
              ) : (
                <Grid container justifyContent="flex-end" wrap="nowrap" style={{ gap: 8 }}>
                  <Grid item>
                    <ConnectWalletButton text="Connect Wallet" onClick={() => connect()} />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Header>
      </StyledToolbar>
      <NetworkMenu
        open={isNetworkMenuOpen}
        anchorEl={networkMenuAnchorEl}
        onClose={() => setIsNetworkMenuOpen(false)}
        handleNetworkChange={handleNetworkChange}
      />
    </StyledAppBar>
  )
}
