import React from "react"
import { Divider, Grid, Typography, styled } from "@material-ui/core"
import { Dropdown } from "modules/common/Dropdown"
import { ProposalTableRow } from "./ProposalTableRow"
import { ProposalStatus } from "./ProposalTableRowStatusBadge"

const ProposalListContainer = styled(Grid)(({ theme }) => ({
  background: theme.palette.primary.main,
  borderRadius: 8
}))

const Header = styled(Grid)({
  paddingLeft: 41,
  paddingRight: 41
})

const StyledDivider = styled(Divider)({
  height: 0
})


export const ProposalList: React.FC = () => {
  return (
    <ProposalListContainer container direction="column">
      <Header container justifyContent="space-between" alignItems="center">
        <Grid item xs={6}>
          <Typography variant={"body2"} color="textPrimary">
            Proposals
          </Typography>
        </Grid>
        <Grid item xs={6} container direction="row" justifyContent="flex-end">
          <Dropdown options={[{ name: "All", value: "all"},{ name: "Active", value: "active"}, { name: "Closed", value: "closed"}]} value={"all"} />
        </Grid>
      </Header>
      <StyledDivider />
      <ProposalTableRow proposal={ProposalStatus.ACTIVE} />
      <StyledDivider />
      <ProposalTableRow proposal={ProposalStatus.CLOSED} />
      <StyledDivider />
      <ProposalTableRow proposal={ProposalStatus.CLOSED} />
    </ProposalListContainer>
  )
}
