import React from "react";

import "App.css";
import { Button } from "@mui/material";
import { Navbar } from "modules/common/Navbar";

const App: React.FC = () => {
  return (
    <Navbar>
      <Button variant='contained' color='secondary'>
        Hello World
      </Button>
    </Navbar>
  );
};

export default App;
