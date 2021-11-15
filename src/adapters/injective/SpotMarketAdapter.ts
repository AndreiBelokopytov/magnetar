import { SpotMarketListItemVM } from "~/components";

export interface SpotMarketAdapter {
  marketListItems: SpotMarketListItemVM[];
  isLoading?: boolean;
  refresh(): Promise<void>;
  refreshSummary(): Promise<void>;
}

export const SpotMarketAdapter = Symbol("SpotMarketAdapter");
