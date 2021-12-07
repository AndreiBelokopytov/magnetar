import React from "react";
import styled, { css } from "styled-components";
import { normalizeColor } from "grommet/utils";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  size?: number;
  withoutBorder?: boolean;
};

type ContainerProps = {
  onClick?: () => void;
  withoutBorder?: boolean;
}

const DEFAULT_SIZE = 14;

export const IconButton = ({ Icon, size = DEFAULT_SIZE, onClick, withoutBorder }: Props) => {
  return (
    <Container
      onClick={onClick}
      withoutBorder={withoutBorder}
    >
      <Icon
        width={size}
        height={size}
      />
    </Container>
  );
};

const Container = styled.div<ContainerProps>`
  ${({ theme, withoutBorder }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    border-style: solid;
    border-width: ${!withoutBorder ? "4px" : "0"};
    box-sizing: border-box;
    border-color: ${normalizeColor("dark-1", theme)};
    color: ${normalizeColor("light-3", theme)};
    cursor: pointer;
    transition: all 0.2s ease-out;
    &:hover,
    &:active {
      border-color: ${normalizeColor("accent-1", theme)};
      color: ${normalizeColor("accent-1", theme)};
    }
  `}
`;
