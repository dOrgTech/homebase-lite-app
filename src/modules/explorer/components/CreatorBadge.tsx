import React from "react"
import { Grid, Typography } from "@mui/material"
import { toShortAddress } from "services/contracts/utils"
import { Blockie } from "modules/common/Blockie"

type Props = {
  address: string
}

export const CreatorBadge = (props: Props) => {
  const { address } = props

  return (
    <Grid container style={{ gap: 15 }}>
      <Grid item>
        <Typography color="textPrimary" variant="subtitle2" fontWeight={500}>
          CREATED BY
        </Typography>
      </Grid>
      <Grid item>
        <Grid container style={{ gap: 9 }}>
          <Blockie address={address} size={27} />
          <Typography color="textPrimary" variant="subtitle2">
            {toShortAddress(address)}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
