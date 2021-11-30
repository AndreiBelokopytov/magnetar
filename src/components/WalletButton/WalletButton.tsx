import styled, { css, StyledComponentProps } from "styled-components";
import { normalizeColor } from "grommet/utils";
import { Spinner } from "grommet";
import { omit } from "lodash";

type Props = {
  disabled?: boolean;
  loading?: boolean;
};

const Button = styled.div<Props>`
  ${(props) => css`
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    padding: 8px 16px;
    border-radius: 8px;
    background-color: ${props.disabled ? normalizeColor("dark-3", props.theme) : normalizeColor("dark-1", props.theme)};
    transition: background-color 0.25s;
    cursor: ${props.disabled ? "default" : "pointer"};
    pointer-events: ${props.disabled ? "none" : ""};
    &:hover {
      background-color: ${normalizeColor("dark-3", props.theme)};
    }
  `}
`;

export const WalletButton = (props: Props & StyledComponentProps<"div", any, {}, never>) => (
  <Button {...omit(props, "loading")}>
    {props.children}
    {props.loading && (
      <Spinner margin={{ left: "auto" }} flex={false} />
    )}
  </Button>
)