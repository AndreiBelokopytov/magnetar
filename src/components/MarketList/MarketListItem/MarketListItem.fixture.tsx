import React from "react";
import { MarketListItem } from "./MarketListItem";
import { marketListMock } from "~/components/_mocks";
import { Fixture } from "~/components/_utils";

const model = marketListMock[0];

export default (
  <Fixture>
    <MarketListItem model={model} />
  </Fixture>
);
