import React from "react";
import { SpotMarketListItem } from "./SpotMarketListItem";
import { spotMarketListMock } from "../../../mocks";

const model = spotMarketListMock[0];

export default <SpotMarketListItem model={model} />;
