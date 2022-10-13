import React from "react"
import { Divider, Grid, Typography, styled } from "@material-ui/core"
import { Dropdown } from "modules/common/Dropdown"
import { ProposalTableRow } from "./ProposalTableRow"
import { ProposalStatus } from "./ProposalTableRowStatusBadge"
import { Poll } from "models/Polls"

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

const NoProposalsText = styled(Typography)({
  paddingTop: 20,
  paddingBottom: 20
})

export const ProposalList: React.FC<{ polls: Poll[] }> = ({ polls }) => {
  return (
    <ProposalListContainer container direction="column">
      <Header container justifyContent="space-between" alignItems="center">
        <Grid item xs={6}>
          <Typography variant={"body2"} color="textPrimary">
            Proposals
          </Typography>
        </Grid>
        <Grid item xs={6} container direction="row" justifyContent="flex-end">
          <Dropdown
            options={[
              { name: "All", value: "all" },
              { name: "Active", value: "active" },
              { name: "Closed", value: "closed" }
            ]}
            value={"all"}
          />
        </Grid>
      </Header>
      <StyledDivider />
      {polls && polls.length > 0 ?
        polls.map((poll, i) => {
          return (
            <div key={`poll-${i}`}>
              <ProposalTableRow poll={poll} proposal={ProposalStatus.ACTIVE} />
              {polls.length - 1 !== i ? <StyledDivider key={`divider-${i}`} /> : null}
            </div>
          )
        }) : (
        <Header>
          <NoProposalsText color="textPrimary">No proposals</NoProposalsText>
        </Header>)}
    </ProposalListContainer>
  )
}
