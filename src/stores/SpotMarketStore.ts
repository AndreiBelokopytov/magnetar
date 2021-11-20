import { IndexedArray } from "~/utils";
import { AllChronosSpotMarketSummary, SpotMarket } from "@injectivelabs/spot-consumer";

export interface SpotMarketStore {
  readonly marketSummaries: IndexedArray<AllChronosSpotMarketSummary>;
  readonly markets: IndexedArray<SpotMarket>;
  readonly activeMarkets: SpotMarket[];
  readonly refreshedMarketId?: string;

  refreshMarkets(): Promise<void>;
  refreshSummary(): Promise<void>;
  refreshSingleMarket(id: string): Promise<void>;
  refreshSingleSummary(id: string): Promise<void>;
}

export const SpotMarketStore = Symbol("SpotMarketStore");
