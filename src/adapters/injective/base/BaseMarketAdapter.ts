import { MarketAdapter } from "~/adapters";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { LineChartPoint, MarketDetailVM, MarketListItemVM } from "~/components";
import { MarketHistoryQuery, MarketHistoryResolution, MarketHistoryStore, MarketStore } from "~/stores";
import { injectable } from "inversify";
import { MarketType } from "~/domain";
import { HistoryChartPoint } from "~/adapters/_models";
import { Period } from "~/utils";

@injectable()
export abstract class BaseMarketAdapter<T, P> implements MarketAdapter {
  readonly defaultMarketHistoryResolution = MarketHistoryResolution.min30;
  readonly defaultMarketHistoryPeriod = new Period({ days: 1 });

  @computed
  get lineChartData(): LineChartPoint[] {
    return this._marketHistoryStore.data.map((el) => new HistoryChartPoint(el));
  }

  @observable
  isLoading = false;

  @computed
  get isReady() {
    return !(this.marketListItems.length === 0 && this.isLoading);
  }

  abstract readonly marketType: MarketType;
  abstract readonly marketListItems: MarketListItemVM[];
  abstract readonly marketDetail: MarketDetailVM | undefined;

  protected abstract readonly _marketHistoryQuery?: MarketHistoryQuery;
  protected abstract readonly _marketStore: MarketStore<T, P>;
  protected abstract readonly _marketHistoryStore: MarketHistoryStore;

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

  @action.bound
  async refreshHistory(): Promise<void> {
    if (!this._marketHistoryQuery) {
      return;
    }
    this.isLoading = true;
    try {
      await this._marketHistoryStore.refresh(this.marketType, this._marketHistoryQuery);
    } catch (err) {
      console.log("Error loading chart data:", err);
    } finally {
      this.isLoading = false;
    }
  }
}
