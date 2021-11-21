import React from "react";
import { MarketListItem } from "./MarketListItem";
import { marketListMock } from "~/components/_mocks";
import { View, StyleSheet } from "react-native";

const model = marketListMock[0];

const styles = StyleSheet.create({
  root: {
    width: 480,
  },
});

export default (
  <View style={styles.root}>
    <MarketListItem model={model} />
  </View>
);
