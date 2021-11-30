import { MarketPrice, MarketType } from "~/domain";
import { MarketHistoryQuery } from "~/stores/MarketHistoryQuery";

export interface MarketHistoryStore {
  data: MarketPrice[];

  refresh(marketType: MarketType, query: MarketHistoryQuery): Promise<void>;
}

export const MarketHistoryStore = Symbol("MarketHistoryStore");
