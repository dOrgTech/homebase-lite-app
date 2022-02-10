import React from "react";
import { Route, Routes } from "react-router-dom";
import { CommunityList } from "./pages/CommunityList";
import { CommunityDetails } from "./pages/CommunityDetails";
import { CreateProposal } from "./pages/CreateProposal";

export const DAOExplorerRouter = (): JSX.Element => {
  return (
    <Routes>
      <Route path={`/communities`} element={<CommunityList />} />
      <Route path={`/communities/:id`} element={<CommunityDetails />} />
      <Route path={`/communities/:id/proposal`} element={<CreateProposal />} />
    </Routes>
  );
};
