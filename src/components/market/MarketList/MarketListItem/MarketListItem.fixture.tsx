import React from "react";
import { MarketListItem } from "./MarketListItem";
import { marketsMock } from "~/components/_mocks";
import { Fixture } from "~/components/_utils";

const model = marketsMock[0];

export default (
  <Fixture>
    <MarketListItem model={model} />
  </Fixture>
);
