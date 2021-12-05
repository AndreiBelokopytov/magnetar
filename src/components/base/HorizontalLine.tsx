import styled, { css } from "styled-components";
import { normalizeColor } from "grommet/utils";

export const HorizontalLine = styled.hr`
  ${({ theme }) => css`
    height: 2px;
    margin: 0;
    border: 0;
    background-color: ${normalizeColor("dark-1", theme)};
  `}
`;
