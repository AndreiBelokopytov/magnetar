import React from "react";
import ReactDOM from "react-dom";
import "reflect-metadata";
import { DIContainer } from "./DIContainer";
import { SpotMarketDetailPage, MarketsPage, DerivativeMarketDetailPage } from "./pages";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { MarketType } from "~/domain";
import { Grommet } from "grommet";
import { defaultTheme } from "~/theme/defaultTheme";

global.Buffer = global.Buffer || require("buffer").Buffer;

class App extends React.Component {
  render() {
    return (
      <DIContainer>
        <Grommet theme={defaultTheme} full>
          <Router>
            <Switch>
              <Route exact path={"/"}>
                <MarketsPage />
              </Route>
              <Route path={`/${MarketType.spot}/:id`}>
                <SpotMarketDetailPage />
              </Route>
              <Route path={`/${MarketType.derivative}/:id`}>
                <DerivativeMarketDetailPage />
              </Route>
            </Switch>
          </Router>
        </Grommet>
      </DIContainer>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
