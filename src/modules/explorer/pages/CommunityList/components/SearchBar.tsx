import React from "react"

import { InputAdornment, styled, TextField, Theme, withStyles } from "@material-ui/core"
import { SearchOutlined } from "@material-ui/icons"

const StyledInput = withStyles((theme: Theme) => ({
  root: {
    "& label.MuiInputLabel-root": {
      display: "none"
    },
    "& div.MuiInputBase-root": {
      "height": 54,
      "boxSizing": "border-box",
      "background": theme.palette.primary.main,
      "padding": "18px 22px",
      "width": "100%",
      "borderRadius": 4,
      "marginTop": "0px !important",
      "maxWidth": 571,
      "& input": {
        "color": theme.palette.text.primary,
        "textAlign": "start",
        "&:placeholder": {
          opacity: 0.8
        }
      },
      "&:focus-visible": {
        outline: "none"
      },
      ["@media (max-width: 280px)"]: {
        marginBottom: "20px",
      },
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "transparent"
    },
    "& .MuiInput-underline:hover:before": {
      borderBottomColor: "transparent"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "transparent"
    }
  }
}))(TextField)

const SearchIcon = styled(SearchOutlined)({
  marginRight: 16
})

export const SearchInput: React.FC<{ search: any }> = ({ search }) => {
  return (
    <StyledInput
      id="standard-search"
      type="search"
      placeholder="Search"
      onChange={(e: any) => search(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon color="secondary" />
          </InputAdornment>
        )
      }}
    />
  )
}
