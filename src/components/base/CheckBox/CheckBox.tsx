import { Text } from "grommet";
import styled, { css } from "styled-components";
import { Check as CheckIcon } from "react-bootstrap-icons";
import { normalizeColor } from "grommet/utils";

type Props = {
  label: string;
  checked?: boolean;
  onChange?: (isChecked: boolean) => void;
};

export const CheckBox = ({ label, checked, onChange }: Props) => {
  const handleClick = () => onChange?.(!checked);
  return (
    <Container onClick={handleClick}>
      <CheckMark checked={checked}>{checked && <CheckIcon size={"20px"} />}</CheckMark>
      <Text margin={{ left: "8px" }}>{label}</Text>
    </Container>
  );
};

const Container = styled.div`
  display: inline-block;
  line-height: 24px;
  cursor: pointer;
`;

type CheckMarkProps = {
  checked?: boolean;
};

const CheckMark = styled.div<CheckMarkProps>`
  ${({ theme, checked }) => css`
    box-sizing: border-box;
    display: inline-block;
    vertical-align: middle;
    width: 24px;
    height: 24px;
    border-radius: 8px;
    border-width: 2px;
    border-style: solid;
    border-color: ${normalizeColor("accent-2", theme)};
    background-color: ${checked ? normalizeColor("accent-2", theme) : "transparent"};
    transition: all 0.2s ease-out;
  `}
`;
