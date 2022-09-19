import React from "react"
import { Switch, Route, Redirect, useRouteMatch } from "react-router"
import { CommunityList } from "./pages/CommunityList"
import { CommunityDetails } from "./pages/CommunityDetails"
import { CreateProposal } from "./pages/CreateProposal"
import { ProposalDetails } from "./pages/ProposalDetails"

export const DAOExplorerRouter: React.FC = (): JSX.Element => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.url}/communities`}>
        <CommunityList />
      </Route>
      <Route path={`${match.url}/community/:id`}>
        <CommunityDetails />
      </Route>
      <Route path={`${match.url}/community/:id/proposal`}>
        <CreateProposal />
      </Route>
      <Route path={`${match.url}/community/:id/proposal/:proposalId`}>
        <ProposalDetails />
      </Route>
      <Redirect to={`${match.url}/communities`} />
    </Switch>
  )
}
