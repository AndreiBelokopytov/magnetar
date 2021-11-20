import React from "react";
import "reflect-metadata";
import { AppRegistry } from "react-native";
import { DIContainer } from "./DIContainer";
import { SpotMarketDetailPage, MarketsPage, DerivativeMarketDetailPage } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MarketType } from "~/domain";

class App extends React.Component {
  render() {
    return (
      <DIContainer>
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
      </DIContainer>
    );
  }
}

AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", { rootTag: document.getElementById("root") });
