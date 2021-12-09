import { LineChartPoint, MarketVM } from "~/components";
import { MarketType } from "~/domain";
import { Observable } from "rxjs";

export interface MarketAdapter {
  readonly marketType: MarketType;
  readonly marketListItems: MarketVM[];
  readonly marketDetail?: MarketVM;
  readonly lineChartData: LineChartPoint[];
  readonly isReady?: boolean;
  readonly refreshAllSummary$: (interval: number) => Observable<void>;
  readonly refreshSummary$: (marketId: string, interval: number) => Observable<void>;
  readonly refreshHistory$: (interval: number) => Observable<void>;
  isLoading?: boolean;

  refreshAllMarkets(): Promise<void>;
  refreshSingleMarket(marketId: string): Promise<void>;
}

export const MarketAdapter = Symbol("MarketAdapter");

export const MarketAdapterFactory = Symbol("MarketAdapterFactory");
