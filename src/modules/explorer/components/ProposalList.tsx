import React from "react"
import { Divider, Grid, Typography, styled } from "@material-ui/core"
import { theme } from "theme"
import { Dropdown } from "modules/common/Dropdown"
import { ProposalTableRow } from "./ProposalTableRow"
import { ProposalStatus } from "./ProposalTableRowStatusBadge"

const ProposalListContainer = styled(Grid)(({ theme }) => ({
  background: theme.palette.primary.main,
  borderRadius: 8
}))

export const ProposalList: React.FC = () => {
  return (
    <ProposalListContainer container direction="column">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant={"body2"} color="secondary">
            Proposals
          </Typography>
        </Grid>
        <Grid item>
          <Dropdown options={[{ name: "All", value: "all" }]} value={"all"} />
        </Grid>
      </Grid>
      <Divider />
      <ProposalTableRow proposal={ProposalStatus.ACTIVE} />
      <Divider />
      <ProposalTableRow proposal={ProposalStatus.REJECTED} />
      <Divider />
      <ProposalTableRow proposal={ProposalStatus.PASSED} />
    </ProposalListContainer>
  )
}
