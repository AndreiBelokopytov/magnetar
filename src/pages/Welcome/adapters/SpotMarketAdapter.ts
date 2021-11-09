import { SpotMarketListItemVM } from "../../../components";

export interface SpotMarketAdapter {
  marketListItems: SpotMarketListItemVM[];
  refresh(): Promise<void>;
}

export const SpotMarketAdapter = Symbol("SpotMarketAdapter");
