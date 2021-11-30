import React from "react";
import styled, { css } from "styled-components";
import { normalizeColor } from "grommet/utils";

export const WalletButton = styled.div`
  ${({ theme }) => css`
    display: inline-block;
    box-sizing: border-box;
    padding: 8px 16px;
    border-radius: 8px;
    background-color: ${normalizeColor("dark-1", theme)};
    transition: background-color 0.25s;
    cursor: pointer;
    &:hover {
      background-color: ${normalizeColor("dark-3", theme)};
    }
  `}
`;
