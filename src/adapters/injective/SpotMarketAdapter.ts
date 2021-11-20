import { MarketDetailVM, SpotMarketListItemVM } from "~/components";

export interface SpotMarketAdapter {
  marketListItems: SpotMarketListItemVM[];
  marketDetail?: MarketDetailVM;
  isLoading?: boolean;

  refreshAll(): Promise<void>;
  refreshAllSummary(): Promise<void>;
  refreshSingle(marketId: string): Promise<void>;
  refreshSingleSummary(marketId: string): Promise<void>;
}

export const SpotMarketAdapter = Symbol("SpotMarketAdapter");
