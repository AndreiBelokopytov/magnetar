import React from "react";
import "reflect-metadata";
import { AppRegistry } from "react-native";
import { DIContainer } from "./DIContainer";
import { WelcomePage } from "./pages";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <DIContainer>
        <Router>
          <Switch>
            <Route path={"/"}>
              <Redirect to={"markets"} />
            </Route>
            <Route path={"/markets"}>
              <WelcomePage />
            </Route>
          </Switch>
        </Router>
        <WelcomePage />
      </DIContainer>
    );
  }
}

AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", { rootTag: document.getElementById("root") });
