import React from "react";
import { Text } from "grommet";

type Props = {
  children: React.ReactChild;
} & React.ComponentProps<typeof Text>;

export const FallGrowthIndicator = ({ children, ...rest }: Props) => {
  const isFall = checkIfFall(children);

  return (
    <Text {...rest} color={isFall ? "status-error" : "status-ok"}>
      {children}
    </Text>
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
