import React from "react";
import { Box, Grid } from "grommet";

type Props = {
  children: React.ReactNode;
  header?: JSX.Element | React.ReactNode;
};

export const PageLayout = ({ children, header }: Props) => {
  return (
    <Box height={"100%"} background={"dark-1"}>
      <Grid
        fill
        columns={["flex", "xlarge", "flex"]}
        rows={["56px", "flex"]}
        areas={[
          { name: "header", start: [1, 0], end: [1, 0] },
          { name: "main", start: [1, 1], end: [1, 1] },
        ]}
        gap={"none"}
      >
        <Box gridArea={"header"}>{header}</Box>

        <Box flex gridArea={"main"}>
          {children}
        </Box>
      </Grid>
    </Box>
  );
};
