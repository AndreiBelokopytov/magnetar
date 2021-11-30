import React, { useMemo, memo } from "react";
import styled, { css, StyledComponentProps } from "styled-components";
import { normalizeColor } from "grommet/utils";
import { omit } from "lodash";

const Div = (variant: CardVariant = CardVariant.Light, width?: string) => styled.div`
  ${({ theme }) => css`
    display: inline-block;
    box-sizing: border-box;
    padding: 8px 16px;
    width: ${width ?? ""};
    border-radius: 8px;
    background-color: ${variant === CardVariant.Dark ? normalizeColor("dark-1", theme) : normalizeColor("dark-2", theme)};
    transition: background-color .25s;
    cursor: pointer;
    &:hover {
      background-color: ${variant === CardVariant.Dark ? normalizeColor("light-4", theme) : normalizeColor("dark-3", theme)};
    }
  `}
`;

export const enum CardVariant {
  Dark,
  Light
};

type Props = {
  variant?: CardVariant;
  width?: string;
} & StyledComponentProps<"div", any, {}, never>;

export const WalletButton = (props: Props) => {
  const Component = Div(props.variant, props.width);
  const divProps = omit(props, "width", "variant");

  return <Component {...divProps} />;
};
