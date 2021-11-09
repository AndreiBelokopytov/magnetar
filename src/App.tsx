import React from "react";
import "reflect-metadata";
import { AppRegistry } from "react-native";
import { DIContainer } from "./DIContainer";
import { WelcomePage } from "./pages";

class App extends React.Component {
  render() {
    return (
      <DIContainer>
        <WelcomePage />
      </DIContainer>
    );
  }
}

AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", { rootTag: document.getElementById("root") });
