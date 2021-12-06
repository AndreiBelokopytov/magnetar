import React from "react";
import styled, { css } from "styled-components";
import { normalizeColor } from "grommet/utils";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  size?: number;
};

const DEFAULT_SIZE = 14;

export const IconButton = ({ Icon, size = DEFAULT_SIZE, ...rest }: Props) => {
  return <Container {...rest}>{<Icon width={size} height={size} style={{ verticalAlign: "middle" }} />}</Container>;
};

const Container = styled.div`
  ${({ theme }) => css`
    display: inline-block;
    text-align: center;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    line-height: 48px;
    border-style: solid;
    border-width: 4px;
    border-color: ${normalizeColor("dark-1", theme)};
    color: ${normalizeColor("accent-1", theme)};
    cursor: pointer;
    transition: all 0.2s ease-out;
    &:hover,
    &:active {
      border-color: ${normalizeColor("accent-1", theme)};
    }
  `}
`;
