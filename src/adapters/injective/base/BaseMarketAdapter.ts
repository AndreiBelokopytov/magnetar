import { MarketAdapter } from "~/adapters";
import { action, makeObservable, observable, runInAction } from "mobx";
import { MarketDetailVM, MarketListItemVM } from "~/components";
import { MarketStore } from "~/stores";
import { injectable } from "inversify";

@injectable()
export abstract class BaseMarketAdapter<T, P> implements MarketAdapter {
  @observable
  isLoading = false;

  abstract readonly marketListItems: MarketListItemVM[];
  abstract readonly marketDetail: MarketDetailVM | undefined;

  protected abstract _marketStore: MarketStore<T, P>;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  async refreshAll(): Promise<void> {
    this.isLoading = true;
    try {
      await this._marketStore.refreshMarkets();
    } catch (e) {
      console.log("Error loading markets:", e);
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }

  @action.bound
  async refreshAllSummary(): Promise<void> {
    try {
      await this._marketStore.refreshSummary();
    } catch (e) {
      console.log("Error loading markets summary:", e);
    }
  }

  @action.bound
  async refreshSingle(marketId: string): Promise<void> {
    this.isLoading = true;
    try {
      await this._marketStore.refreshSingleMarket(marketId);
    } catch (e) {
      console.log("Error loading market:", e);
    } finally {
      runInAction(() => (this.isLoading = false));
    }
  }

  @action.bound
  async refreshSingleSummary(marketId: string): Promise<void> {
    try {
      await this._marketStore.refreshSingleSummary(marketId);
    } catch (e) {
      console.log("Error loading market summary:", e);
    }
  }
}
