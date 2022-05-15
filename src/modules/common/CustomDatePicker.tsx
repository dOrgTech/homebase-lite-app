import React from "react"
import { Grid, TextField } from "@mui/material"
import DatePicker, { DatePickerProps } from "@mui/lab/DatePicker"

interface CustomDatePickerProps extends DatePickerProps {
  id: string
}

export const CustomDatePicker: React.FC = () => {
  const [value, setValue] = React.useState<Date | null>(null)
  return (
    <Grid container>
      {/* <Grid item>Hello</Grid> */}
      <Grid item>
        <DatePicker
          onChange={() => console.log("")}
          renderInput={params => <TextField {...params} />}
          label="Basic example"
          value={value}
        />
      </Grid>
    </Grid>
  )
}
