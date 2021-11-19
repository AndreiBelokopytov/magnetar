import React from "react";
import "reflect-metadata";
import { AppRegistry } from "react-native";
import { DIContainer } from "./DIContainer";
import { MarketDetailPage, MarketsPage } from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <DIContainer>
        <Router>
          <Switch>
            <Route exact path={"/"}>
              <MarketsPage />
            </Route>
            <Route path={`/:id`}>
              <MarketDetailPage />
            </Route>
          </Switch>
        </Router>
      </DIContainer>
    );
  }
}

AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", { rootTag: document.getElementById("root") });
