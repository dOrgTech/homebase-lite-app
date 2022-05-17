import React from "react"
import { InputAdornment, TextField, styled } from "@mui/material"
import { SearchOutlined } from "@mui/icons-material"

const StyledInput = styled(TextField)(({ theme }) => ({
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
      }
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
}))

const SearchIcon = styled(SearchOutlined)({
  marginRight: 16
})

type Props = { search: (value: string) => void }

export const SearchInput = (props: Props) => {
  const { search } = props

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
