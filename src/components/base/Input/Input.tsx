import styled, { css } from "styled-components";
import { normalizeColor } from "grommet/utils";
import React from "react";
import { Text } from "grommet";
import { v4 as uuid } from "uuid";

type Props = React.HTMLAttributes<HTMLInputElement> & {
  autoFocus?: boolean;
  disabled?: boolean;
  labelLeft?: React.ReactChild;
  labelRight?: React.ReactChild;
  addonAfter?: React.ReactChild;
};

export const Input = ({ autoFocus, disabled, labelLeft, labelRight, addonAfter, ...rest }: Props) => {
  const id = React.useMemo(() => uuid(), []);

  return (
    <Container>
      <Label htmlFor={id}>
        {labelLeft && <LabelText>{labelLeft}</LabelText>}
        {labelRight && <LabelText>{labelRight}</LabelText>}
      </Label>
      <StyledInput {...rest} autoFocus={autoFocus} disabled={disabled} id={id} />
      {addonAfter && <Addon>{addonAfter}</Addon>}
    </Container>
  );
};

const StyledInput = styled.input`
  ${({ theme }) => css`
    background-color: ${normalizeColor("dark-1", theme)};
    border-radius: 8px;
    padding: 16px;
    border-width: 1px;
    border-color: transparent;
    font-size: 18px;
    line-height: 32px;
    color: ${normalizeColor("light-2", theme)};
    transition: all 0.25s ease-in-out;
    &:focus {
      border-color: ${normalizeColor("accent-1", theme)};
      box-shadow: none;
      outline: none;
    }
  `}
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const LabelText = (props: React.ComponentProps<typeof Text>) => <Text {...props} size={"small"} color={"light-3"} />;

const Addon = styled.div`
  ${({ theme }) => css`
    box-sizing: border-box;
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
    padding: 8px;
    background-color: ${normalizeColor("dark-2", theme)};
    border-radius: 8px;
    position: absolute;
    right: 8px;
    bottom: 16px;
    height: 48px;
  `}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding-bottom: 8px;
  position: relative;
`;
