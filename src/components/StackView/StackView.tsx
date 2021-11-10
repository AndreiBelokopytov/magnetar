import React from "react";
import { View, ViewProps, StyleSheet, FlexStyle, ViewStyle } from "react-native";

type Props = {
  direction?: FlexStyle["flexDirection"];
  flex?: boolean;
  basis?: FlexStyle["flexBasis"];
  grow?: FlexStyle["flexGrow"];
  shrink?: FlexStyle["flexShrink"];
  alignItems?: FlexStyle["alignItems"];
  justifyContent?: FlexStyle["justifyContent"];
  p?: FlexStyle["padding"];
  pt?: FlexStyle["paddingTop"];
  pr?: FlexStyle["paddingRight"];
  pb?: FlexStyle["paddingBottom"];
  pl?: FlexStyle["paddingLeft"];
  mt?: FlexStyle["marginTop"];
  mr?: FlexStyle["marginRight"];
  mb?: FlexStyle["marginBottom"];
  ml?: FlexStyle["marginLeft"];
  m?: FlexStyle["margin"];
  margin?: FlexStyle["margin"];
  padding?: FlexStyle["padding"];
  width?: FlexStyle["width"];
  height?: FlexStyle["height"];
  bgColor?: ViewStyle["backgroundColor"];
} & ViewProps;

export const StackView = ({
  flex,
  direction,
  alignItems,
  justifyContent,
  m,
  margin,
  p,
  padding,
  width,
  height,
  style,
  bgColor,
  basis,
  grow,
  shrink,
  pt,
  pr,
  pb,
  pl,
  mt,
  mr,
  ml,
  mb,
  ...rest
}: Props) => {
  const computedStyle: FlexStyle & ViewStyle = {
    flexDirection: direction,
    flexBasis: basis,
    flexGrow: grow,
    flexShrink: shrink,
    flex: flex ? 1 : undefined,
    alignItems,
    justifyContent,
    margin: m ?? margin,
    padding: p ?? padding,
    paddingTop: pt,
    paddingRight: pr,
    paddingBottom: pb,
    paddingLeft: pl,
    marginTop: mt,
    marginRight: mr,
    marginBottom: mb,
    marginLeft: ml,
    width,
    height,
    backgroundColor: bgColor,
  };

  return <View {...rest} style={StyleSheet.compose(computedStyle, style)} />;
};
