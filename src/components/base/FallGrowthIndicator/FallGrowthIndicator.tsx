import React from "react";
import { Typography } from "~/components";
import { StyleSheet } from "react-native";
import { colors } from "~/theme";

type Props = {
  children: React.ReactChild;
} & React.ComponentProps<typeof Typography>;

export const FallGrowthIndicator = ({ children, ...rest }: Props) => {
  const isFall = checkIfFall(children);
  const style = isFall != null ? (isFall ? styles.fall : styles.growth) : undefined;

  return (
    <Typography {...rest} style={style}>
      {children}
    </Typography>
  );
};

const checkIfFall = (children: React.ReactChild): boolean | null => {
  let child: React.ReactChild;
  if (typeof children === "string") {
    return children.startsWith("-");
  }
  if (typeof children === "number") {
    return children < 0;
  }
  try {
    child = React.Children.only(children);
  } catch {
    return null;
  }
  return checkIfFall(child.props.children);
};

const styles = StyleSheet.create({
  fall: {
    color: colors.negative,
  },
  growth: {
    color: colors.positive,
  },
});
