import styled, { css } from "styled-components";
import { normalizeColor } from "grommet/utils";

export const Card = styled.div`
  ${({ theme }) => css`
    display: inline-block;
    padding: 16px;
    border-radius: 16px;
    background-color: ${normalizeColor("dark-2", theme)};
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.08);
  `}
`;
