import React from "react"
import { Switch, Route, Redirect, useRouteMatch } from "react-router"
import { CommunityDetails } from "./index";
import { CreateProposal } from "../CreateProposal";
import { ProposalDetails } from "../ProposalDetails";

export const CommunityDetailsRouter: React.FC = (): JSX.Element => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact={true} path={`${match.url}/:id`}>
        <CommunityDetails />
      </Route>
      <Route exact={true}  path={`${match.url}/:id/proposal`}>
        <CreateProposal />
      </Route>
      <Route exact={true}  path={`${match.url}/:id/proposal/:proposalId`}>
        <ProposalDetails />
      </Route>
      <Redirect to={`${match.url}/:id`} />
    </Switch>
  )
}
