import { LineChartPoint, MarketDetailVM, MarketListItemVM } from "~/components";
import { MarketType } from "~/domain";

export interface MarketAdapter {
  readonly marketType: MarketType;
  readonly marketListItems: MarketListItemVM[];
  readonly marketDetail?: MarketDetailVM;
  readonly lineChartData: LineChartPoint[];
  readonly isReady?: boolean;
  isLoading?: boolean;

  refreshAll(): Promise<void>;
  refreshAllSummary(): Promise<void>;
  refreshSingle(marketId: string): Promise<void>;
  refreshSingleSummary(marketId: string): Promise<void>;
  refreshHistory(): Promise<void>;
}

export const MarketAdapter = Symbol("MarketAdapter");

export const MarketAdapterFactory = Symbol("MarketAdapterFactory");
