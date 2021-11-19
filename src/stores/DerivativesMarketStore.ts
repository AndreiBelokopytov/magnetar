import { IndexedArray } from "~/utils";
import { DerivativeMarket, AllChronosDerivativeMarketSummary } from "@injectivelabs/derivatives-consumer";

export interface DerivativesMarketStore {
  readonly marketSummaries: IndexedArray<AllChronosDerivativeMarketSummary>;
  readonly markets: DerivativeMarket[];
  readonly activeMarkets: DerivativeMarket[];

  refreshMarkets(): Promise<void>;
  refreshSummary(): Promise<void>;
}

export const DerivativesMarketStore = Symbol("DerivativesStore");
