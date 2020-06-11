import { AppBar, Toolbar, Typography } from "@material-ui/core";
import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { TokenExchange } from "./components/ExchangingTokens";
import { DashboardScene } from "./scenes/DashboardScene";
import { NotFoundScene } from "./scenes/NotFoundScene";
import { authenticatedSelector } from "./features/authentication/authenticationSlice";
import { useSelector } from "react-redux";
import { GitubLogin } from "./authentication/Github";


const LoggedIn: React.FC = (props) => {
  const isAuthenticated = useSelector(authenticatedSelector)
  return (
      <Route
        render={() => {
          return isAuthenticated ? props.children : <DoLogin />;
        }}
      />
    );
}

const DoLogin: React.FC = (props) => {
  GitubLogin()
  return null;
};

export const Router: React.FC = (props) => {
  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Github App</Typography>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path="/callback">
          <TokenExchange />
        </Route>

        <LoggedIn>
          <Route exact path="/">
            <DashboardScene />
          </Route>
        </LoggedIn>

        <Route component={NotFoundScene}/>
      </Switch>
    </React.Fragment>
  );
};
