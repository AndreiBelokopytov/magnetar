import { SpotMarketListItemVM } from "~/components";

export interface SpotMarketAdapter {
  marketListItems: SpotMarketListItemVM[];
  isLoading?: boolean;
  refresh(): Promise<void>;
}

export const SpotMarketAdapter = Symbol("SpotMarketAdapter");
