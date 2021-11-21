import { MarketType } from "~/domain";

export type MarketsStackParams = {
  Markets: undefined;
  [MarketType.spot]: { marketId: string };
  [MarketType.derivative]: { marketId: string };
};
