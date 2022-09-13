import { Grid, styled } from "@material-ui/core"

export const RowContainer = styled(Grid)(({ theme }) => ({
  minHeight: 145,
  padding: "0px 43px",
  cursor: "pointer",
  [theme.breakpoints.down("md")]: {
    padding: "35px 0"
  }
}))
