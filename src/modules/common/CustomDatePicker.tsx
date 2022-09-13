import React from "react"
import { Grid, TextField } from "@material-ui/core"


interface CustomDatePickerProps {
  id: string
}

export const CustomDatePicker: React.FC = () => {
  const [value, setValue] = React.useState<Date | null>(null)
  return (
    <Grid container>
      {/* <Grid item>Hello</Grid> */}
      <Grid item>
        {/* <DatePicker
          onChange={() => console.log("")}
          renderInput={(params: any) => <TextField {...params} />}
          label="Basic example"
          value={value}
        /> */}
      </Grid>
    </Grid>
  )
}
