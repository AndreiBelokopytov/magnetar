import React from "react";
import { MarketListItem } from "./MarketListItem";
import { marketListMock } from "~/components/_mocks";
import { Fixture } from "~/components/_utils";
import { Box } from "grommet";

const model = marketListMock[0];

export default (
  <Fixture>
    <Box margin={"32px"}>
      <MarketListItem model={model} />
    </Box>
  </Fixture>
);
