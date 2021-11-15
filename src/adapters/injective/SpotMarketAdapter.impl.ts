import { SpotMarketAdapter } from "./SpotMarketAdapter";
import { computed, makeObservable, observable, runInAction } from "mobx";
import { injectable, inject } from "inversify";
import { SpotMarketListItemVM } from "~/components";
import { SpotMarketStore } from "~/stores";
import { SpotMarketListItemVMImpl } from "~/adapters/_models";

@injectable()
export class SpotMarketAdapterImpl implements SpotMarketAdapter {
  @observable
  isLoading = false;

  @computed
  get marketListItems(): SpotMarketListItemVM[] {
    return this._spotMarketStore.activeMarkets.map((market) => {
      const marketSummary = this._spotMarketStore.marketSummaries.index[market.marketId];
      return new SpotMarketListItemVMImpl(market, marketSummary);
    });
  }

  constructor(@inject(SpotMarketStore) private _spotMarketStore: SpotMarketStore) {
    makeObservable(this);
  }

  async refresh(): Promise<void> {
    this.isLoading = true;
    try {
      await this._spotMarketStore.refreshMarkets();
    } catch (e) {
      console.log("Error loading spot markets:", e);
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }

  async refreshSummary(): Promise<void> {
    try {
      await this._spotMarketStore.refreshSummary();
    } catch (e) {
      console.log("Error loading spot markets summary:", e);
    }
  }
}
