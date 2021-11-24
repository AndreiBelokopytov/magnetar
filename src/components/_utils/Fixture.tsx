import { defaultTheme } from "~/theme/defaultTheme";
import { Box, Grommet } from "grommet";
import React from "react";

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export const Fixture = ({ children }: Props) => {
  return (
    <Grommet theme={defaultTheme} full>
      <Box background={"dark-1"} fill>
        {children}
      </Box>
    </Grommet>
  );
};