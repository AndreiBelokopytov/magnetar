import { IndexedArray } from "~/utils";

export interface MarketStore<T, P> {
  readonly marketSummaries: IndexedArray<P>;
  readonly markets: IndexedArray<T>;
  readonly activeMarkets: T[];
  readonly refreshedMarketId?: string;

  refreshMarkets(): Promise<void>;
  refreshSummary(): Promise<void>;
  refreshSingleMarket(id: string): Promise<void>;
  refreshSingleSummary(id: string): Promise<void>;
}
