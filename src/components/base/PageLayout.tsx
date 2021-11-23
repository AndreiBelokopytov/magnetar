import { StackView } from "~/components";
import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "~/theme";

type Props = {
  children: React.ReactNode;
  header?: JSX.Element | React.ReactNode;
  noPadding?: boolean;
};

export const PageLayout = ({ children, header, noPadding }: Props) => {
  return (
    <StackView flex bgColor={colors.background}>
      {header}
      <StackView flex style={noPadding ? undefined : styles.padding}>
        {children}
      </StackView>
    </StackView>
  );
};

const styles = StyleSheet.create({
  padding: {
    top: 8,
    right: 16,
    bottom: 8,
    left: 16,
  },
});
