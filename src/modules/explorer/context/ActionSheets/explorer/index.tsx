import React, { createContext, useContext, useEffect, useState } from "react";

interface ContextProps {
  updateChoices: string;
  setUpdateChoices: any;
  }

export const DashboardContext = createContext({} as ContextProps);

export const AppContextProvider = ({ children }: any) => {
  const tokenInitialState = ""

  const [updateChoices, setUpdateChoices] = useState(tokenInitialState);

  useEffect(() => {
    console.log(`store: "${updateChoices}" to localstorage`);
  }, [updateChoices]);

  const values = {
    updateChoices,
    setUpdateChoices,
  };

  return (
    <DashboardContext.Provider value={values}>
      {children}
    </DashboardContext.Provider>
  );
};