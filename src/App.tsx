import { MuiThemeProvider } from "@material-ui/core";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import theme from './theme';


function App() {
  return (
    <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
