import React from "react";
import { SpotMarketListItem } from "./SpotMarketListItem";
import { spotMarketListMock } from "../../../mocks";
import { View, StyleSheet } from "react-native";

const model = spotMarketListMock[0];

const styles = StyleSheet.create({
  root: {
    width: 480,
  },
});

export default (
  <View style={styles.root}>
    <SpotMarketListItem model={model} />
  </View>
);
