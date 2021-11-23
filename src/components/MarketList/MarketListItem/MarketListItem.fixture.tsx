import React from "react";
import { MarketListItem } from "./MarketListItem";
import { marketListMock } from "~/components/_mocks";
import { Box } from "grommet";

const model = marketListMock[0];

export default (
  <Box>
    <MarketListItem model={model} />
  </Box>
);
