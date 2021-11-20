import { SpotMarketAdapter } from "./SpotMarketAdapter";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { injectable, inject } from "inversify";
import { MarketDetailVM, SpotMarketListItemVM } from "~/components";
import { SpotMarketStore } from "~/stores";
import { MarketDetailVMImpl, SpotMarketListItemVMImpl } from "~/adapters/_models";

@injectable()
export class SpotMarketAdapterImpl implements SpotMarketAdapter {
  @observable
  isLoading = false;

  @computed
  get marketListItems(): SpotMarketListItemVM[] {
    return this._spotMarketStore.activeMarkets.map((market) => {
      const marketSummary = this._spotMarketStore.marketSummaries.index.get(market.marketId);
      return new SpotMarketListItemVMImpl(market, marketSummary);
    });
  }

  @computed
  get marketDetail(): MarketDetailVM | undefined {
    if (!this._spotMarketStore.refreshedMarketId) {
      return;
    }
    const marketId = this._spotMarketStore.refreshedMarketId;
    const market = this._spotMarketStore.markets.index.get(marketId);
    const marketSummary = this._spotMarketStore.marketSummaries.index.get(marketId);
    if (market && marketSummary) {
      return new MarketDetailVMImpl(market, marketSummary);
    }
  }

  constructor(@inject(SpotMarketStore) private _spotMarketStore: SpotMarketStore) {
    makeObservable(this);
  }

  @action
  async refreshAll(): Promise<void> {
    this.isLoading = true;
    try {
      await this._spotMarketStore.refreshMarkets();
    } catch (e) {
      console.log("Error loading spot markets:", e);
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }

  @action
  async refreshAllSummary(): Promise<void> {
    try {
      await this._spotMarketStore.refreshSummary();
    } catch (e) {
      console.log("Error loading spot markets summary:", e);
    }
  }

  @action
  async refreshSingle(marketId: string): Promise<void> {
    this.isLoading = true;
    try {
      await this._spotMarketStore.refreshSingleMarket(marketId);
    } catch (e) {
      console.log("Error loading spot market:", e);
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }

  @action
  async refreshSingleSummary(marketId: string): Promise<void> {
    try {
      await this._spotMarketStore.refreshSingleSummary(marketId);
    } catch (e) {
      console.log("Error loading spot market summary:", e);
    }
  }
}
