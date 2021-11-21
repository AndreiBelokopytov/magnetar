import React from "react";
import "reflect-metadata";
import { AppRegistry } from "react-native";
import { DIContainer } from "./DIContainer";
import { DerivativeMarketDetailPage, MarketsPage, SpotMarketDetailPage, WalletPage } from "./pages";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MarketIcon, WalletIcon } from "~/components";
import { AppLayout } from "~/AppLayout";
import { MarketType } from "~/domain";
import { MarketsStackParams } from "~/Routing.types";

class App extends React.Component {
  render() {
    const Tab = createBottomTabNavigator();
    const MarketsStack = createNativeStackNavigator<MarketsStackParams>();

    const MarketsStackScreen = () => (
      <MarketsStack.Navigator initialRouteName={"Markets"}>
        <MarketsStack.Screen name={"Markets"} options={{ headerShown: false }} component={MarketsPage} />
        <MarketsStack.Screen name={MarketType.spot} options={{ headerShown: false }} component={SpotMarketDetailPage} />
        <MarketsStack.Screen
          name={MarketType.derivative}
          options={{ headerShown: false }}
          component={DerivativeMarketDetailPage}
        />
      </MarketsStack.Navigator>
    );

    return (
      <DIContainer>
        <AppLayout>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen
                name="Markets"
                options={{ headerShown: false, tabBarIcon: () => <MarketIcon /> }}
                component={MarketsStackScreen}
              />
              <Tab.Screen
                name="Wallet"
                options={{ headerShown: false, tabBarIcon: () => <WalletIcon /> }}
                component={WalletPage}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </AppLayout>
      </DIContainer>
    );
  }
}

AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", { rootTag: document.getElementById("root") });
