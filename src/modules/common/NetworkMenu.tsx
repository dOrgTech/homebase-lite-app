import React from "react"
import { Box, Grid, Popover, PopoverProps, styled, Typography } from "@mui/material"
import { NetworkType } from "services/beacon"

const StyledPopover = styled(Popover)({
  ".MuiPaper-root": {
    borderRadius: 4
  }
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

type Props = PopoverProps & { handleNetworkChange: (network: NetworkType) => void }

export const NetworkMenu = (props: Props) => {
  const { handleNetworkChange, ...rest } = props
  return (
    <StyledPopover
      id="wallet-Popper"
      style={{ zIndex: 1500, borderRadius: 4 }}
      PaperProps={{
        style: { borderRadius: 4, backgroundColor: "transparent" }
      }}
      {...rest}
    >
      <AddressMenu>
        <AddressMenuItem container alignItems="center" onClick={() => handleNetworkChange(NetworkType.MAINNET)}>
          <Grid item>
            <Typography variant="subtitle2" color="textSecondary">
              MAINNET
            </Typography>
          </Grid>
        </AddressMenuItem>
        <AddressMenuItem container alignItems="center" onClick={() => handleNetworkChange(NetworkType.HANGZHOUNET)}>
          <Grid item>
            <Typography variant="subtitle2" color="textSecondary">
              HANGZHOUNET
            </Typography>
          </Grid>
        </AddressMenuItem>
        <AddressMenuItem container alignItems="center" onClick={() => handleNetworkChange(NetworkType.ITHACANET)}>
          <Grid item>
            <Typography variant="subtitle2" color="textSecondary">
              ITHACANET
            </Typography>
          </Grid>
        </AddressMenuItem>
      </AddressMenu>
    </StyledPopover>
  )
}
