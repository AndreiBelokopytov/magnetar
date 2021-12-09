import React from "react";
import { Box, Grid } from "grommet";

type Props = {
  children: React.ReactNode;
  header?: JSX.Element | React.ReactNode;
  footer?: JSX.Element | React.ReactNode;
};

export const PageLayout = ({ children, header, footer }: Props) => {
  return (
    <Box background={"dark-1"}>
      <Grid
        style={{ minHeight: "100vh" }}
        columns={["flex", "xlarge", "flex"]}
        rows={["56px", "flex", "56px"]}
        areas={[
          { name: "header", start: [1, 0], end: [1, 0] },
          { name: "main", start: [1, 1], end: [1, 1] },
          { name: "footer", start: [1, 2], end: [1, 2] },
        ]}
        gap={"none"}
      >
        <Box gridArea={"header"}>{header}</Box>

        <Box flex gridArea={"main"}>
          {children}
        </Box>
        <Box gridArea={"footer"}>{footer}</Box>
      </Grid>
    </Box>
  );
};
