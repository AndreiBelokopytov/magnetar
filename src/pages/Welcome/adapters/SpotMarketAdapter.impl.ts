import { SpotMarketAdapter } from "./SpotMarketAdapter";
import { computed, makeObservable } from "mobx";
import { injectable, inject } from "inversify";
import { SpotMarketListItemVM } from "../../../components";
import { SpotMarketStore } from "../../../stores";
import { SpotMarketListItemVMImpl } from "../models";

@injectable()
export class SpotMarketAdapterImpl implements SpotMarketAdapter {
  @computed
  get marketListItems(): SpotMarketListItemVM[] {
    return this._spotMarketStore.activeMarkets.map((market) => {
      const marketSummary = this._spotMarketStore.marketSummaries.index[market.marketId];
      return new SpotMarketListItemVMImpl(market, marketSummary);
    });
  }

  constructor(@inject(SpotMarketStore.TYPE) private _spotMarketStore: SpotMarketStore) {
    makeObservable(this);
  }

  async refresh(): Promise<void> {
    try {
      await this._spotMarketStore.refresh();
    } catch (e) {
      console.log("Error loading spot markets:", e);
    }
  }
}
