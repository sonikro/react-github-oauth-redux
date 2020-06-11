import { Card, CardContent, CardHeader, Grid, Typography, LinearProgress } from "@material-ui/core";
import * as React from "react";
import { useDispatch } from "react-redux";
import { exchangeTokens } from "../features/authentication/authenticationSlice";

export const TokenExchange: React.FC = (props) => {
  const params = new URLSearchParams(window.location.search);
  const authCode = params.get("code")!
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(exchangeTokens(authCode));
  }, [dispatch, authCode]);

  return (
    <Grid
      container
      alignContent="center"
      alignItems="center"
      justify="center"
      spacing={4}
      style={{ padding: 10 }}>
      <Card style={{ marginTop: 10 }}>
        <CardHeader title="Authenticating" />
        <CardContent>
          <Grid item alignContent="center">
            <Typography>Exchanging tokens</Typography>
          </Grid>
          <Grid item alignContent="center">
            <LinearProgress />
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};
