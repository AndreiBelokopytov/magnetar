import React from "react";
import styled, { css } from "styled-components";
import { normalizeColor } from "grommet/utils";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement> & {
    isActive?: boolean;
  }>;
  isSelected?: boolean;
  onClick?: () => void;
  size?: number;
};

const DEFAULT_SIZE = 14;

export const IconButton = ({ Icon, size = DEFAULT_SIZE, isSelected, onClick }: Props) => {
  const [ isActive, setIsActive ] = React.useState(false);

  return (
    <Container
      onMouseOver={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={onClick}
    >
      <Icon
        isActive={isActive || isSelected}
        width={size}
        height={size}
      />
    </Container>
  );
};

const Container = styled.div`
  ${({ theme }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    border-style: solid;
    border-width: 4px;
    box-sizing: border-box;
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
