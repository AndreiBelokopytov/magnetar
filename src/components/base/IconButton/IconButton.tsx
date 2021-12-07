import React from "react";
import styled, { css } from "styled-components";
import { normalizeColor } from "grommet/utils";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  size?: number;
  bordering?: boolean;
};

type ContainerProps = {
  onClick?: () => void;
  bordering?: boolean;
}

const DEFAULT_SIZE = 14;

export const IconButton = ({ Icon, size = DEFAULT_SIZE, onClick, bordering }: Props) => {
  return (
    <Container
      onClick={onClick}
      bordering={bordering}
    >
      <Icon
        width={size}
        height={size}
      />
    </Container>
  );
};

const Container = styled.div<ContainerProps>`
  ${({ theme, bordering }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    border-style: solid;
    border-width: ${bordering ? "4px" : "0"};
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
