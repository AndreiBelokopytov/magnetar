import { Box, Text } from "grommet";
import { ArrowLeft } from "react-bootstrap-icons";
import React from "react";
import { useHistory } from "react-router";
import styled, { css } from "styled-components";
import { normalizeColor } from "grommet/utils";

type Props = {
  title: string;
};

export const BackButton = ({ title }: Props) => {
  const history = useHistory();

  return (
    <BackButtonContainer onClick={history?.goBack}>
      <Box direction={"row"} align={"center"}>
        <Box margin={{ right: "8px" }}>
          <ArrowLeft width={24} height={24} />
        </Box>
        <Text>{title}</Text>
      </Box>
    </BackButtonContainer>
  );
};

const BackButtonContainer = styled.div`
  ${({ theme }) => css`
    display: inline-block;
    color: ${normalizeColor("light-3", theme)};
    cursor: pointer;
    transition: all 0.2s ease-out;
    &:hover {
      color: ${normalizeColor("brand", theme)};
    }
  `}
`;
