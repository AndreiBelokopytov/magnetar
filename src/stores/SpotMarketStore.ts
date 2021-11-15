import { IndexedArray } from "~/utils";
import { AllChronosSpotMarketSummary, SpotMarket } from "@injectivelabs/spot-consumer";

export interface SpotMarketStore {
  readonly marketSummaries: IndexedArray<AllChronosSpotMarketSummary>;
  readonly markets: SpotMarket[];
  readonly activeMarkets: SpotMarket[];

  refreshMarkets(): Promise<void>;
  refreshSummary(): Promise<void>;
}

export const SpotMarketStore = Symbol("SpotMarketStore");
