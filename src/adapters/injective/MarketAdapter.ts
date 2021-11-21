import { MarketDetailVM, MarketListItemVM } from "~/components";

export interface MarketAdapter {
  marketListItems: MarketListItemVM[];
  marketDetail?: MarketDetailVM;
  isLoading?: boolean;

  refreshAll(): Promise<void>;
  refreshAllSummary(): Promise<void>;
  refreshSingle(marketId: string): Promise<void>;
  refreshSingleSummary(marketId: string): Promise<void>;
}

export const MarketAdapter = Symbol("MarketAdapter");

export const MarketAdapterFactory = Symbol("MarketAdapterFactory");
