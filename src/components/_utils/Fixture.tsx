import { defaultTheme } from "~/theme/defaultTheme";
import { Box, Grommet } from "grommet";
import React from "react";

type Props = {
  children: React.ReactNode | React.ReactNode[];
} & React.ComponentProps<typeof Box>;

export const Fixture = ({ children, ...rest }: Props) => {
  return (
    <Grommet theme={defaultTheme} full>
      <Box pad={"24px"} background={"dark-1"} fill {...rest}>
        {children}
      </Box>
    </Grommet>
  );
};
