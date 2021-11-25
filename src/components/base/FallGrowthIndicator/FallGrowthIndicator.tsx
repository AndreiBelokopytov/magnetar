import React from "react";
import { Text } from "grommet";
import { GraphUpArrow, GraphDownArrow, Icon } from "react-bootstrap-icons";
import styled, { css } from "styled-components";
import { normalizeColor } from "grommet/utils";

type Props = {
  children: React.ReactChild;
  showIcon?: boolean;
} & React.ComponentProps<typeof Text>;

export const FallGrowthIndicator = ({ children, showIcon, ...rest }: Props) => {
  const isFall = checkIfFall(children);
  const IconComponent: Icon | undefined = showIcon ? (isFall ? GraphDownArrow : GraphUpArrow) : undefined;
  return (
    <Container negative={isFall}>
      {IconComponent ? (
        <IconContainer>
          <IconComponent width={16} height={16} fill={"currentColor"} />
        </IconContainer>
      ) : null}

      <Text {...rest} color={"inherit"}>
        {children}
      </Text>
    </Container>
  );
};

type ContainerProps = {
  negative?: boolean;
};

const Container = styled.div`
  ${({ theme }) => css`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    color: ${(props: ContainerProps) =>
      props.negative ? normalizeColor("status-error", theme) : normalizeColor("status-ok", theme)};
  `}
`;

const IconContainer = styled.div`
  display: inline;
  position: relative;
  top: -1px;
  margin-right: 8px;
`;

const checkIfFall = (children: React.ReactChild): boolean | undefined => {
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
    return undefined;
  }
  return checkIfFall(child.props.children);
};
