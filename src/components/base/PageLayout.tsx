import React from "react";
import { Box } from "grommet";

type Props = {
  children: React.ReactNode;
  header?: JSX.Element | React.ReactNode;
  noPadding?: boolean;
};

export const PageLayout = ({ children, header, noPadding }: Props) => {
  const padding = { vertical: "8px", horizontal: "16px" };
  return (
    <Box flex background={"white"}>
      {header}
      <Box flex pad={noPadding ? "none" : padding}>
        {children}
      </Box>
    </Box>
  );
};
