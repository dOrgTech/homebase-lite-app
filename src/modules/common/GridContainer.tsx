import { Grid, styled } from "@mui/material"

export const GridContainer = styled(Grid)(({ theme }) => ({
  minHeight: 145,
  borderRadius: 8,
  cursor: "pointer",
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    padding: "35px 0"
  }
}))
