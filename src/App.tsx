import React from "react";
import ReactDOM from "react-dom";
import "reflect-metadata";
import { DIContainer, useInstanceOf } from "./DIContainer";
import { MarketDetailPage, MarketsPage } from "./pages";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { MarketType } from "~/domain";
import { Box, Grommet, Spinner } from "grommet";
import { defaultTheme } from "~/theme/defaultTheme";
import { observer } from "mobx-react";
import { AccountInfoAdapter } from "./adapters";

global.Buffer = global.Buffer || require("buffer").Buffer;


export const App = observer(() => {
    const accountInfoAdapter = useInstanceOf<AccountInfoAdapter>(AccountInfoAdapter);
    const [ accountLoading, setAccountLoading ] = React.useState(true);

    React.useEffect(() => {
      accountInfoAdapter.refresh().then(() => setAccountLoading(false));
    });

    return (
      <DIContainer>
          <Grommet theme={defaultTheme} full>
            {accountLoading ? (
              <Box width="100%" height="100%" align="center" justify="center">
                <Spinner size="large"/>
              </Box>
            ) : (
              <Router>
                <Switch>
                  <Route exact path={"/"}>
                    <MarketsPage />
                  </Route>
                  <Route path={`/${MarketType.spot}/:id`}>
                    <MarketDetailPage marketType={MarketType.spot} />
                  </Route>
                  <Route path={`/${MarketType.derivative}/:id`}>
                    <MarketDetailPage marketType={MarketType.derivative} />
                  </Route>
                </Switch>
              </Router>
            )}
          </Grommet>
      </DIContainer>
    );
  }
);

ReactDOM.render(<App />, document.getElementById("root"));
