import { MarketAdapter } from "~/adapters";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { LineChartPoint, MarketVM } from "~/components";
import {
  AccountInfoStore,
  MarketHistoryQuery,
  MarketHistoryResolution,
  MarketHistoryStore,
  MarketStore,
  SubAccountStore,
} from "~/stores";
import { injectable } from "inversify";
import { AccountInfo, MarketType } from "~/domain";
import { HistoryChartPoint } from "~/adapters/_models";
import { createIntervalObservable, Period, toStream } from "~/utils";
import { distinct, filter, switchMap } from "rxjs";

@injectable()
export abstract class BaseMarketAdapter<T, P> implements MarketAdapter {
  readonly defaultMarketHistoryResolution = MarketHistoryResolution.min30;
  readonly defaultMarketHistoryPeriod = new Period({ days: 1 });

  readonly refreshHistory$ = (interval: number) =>
    createIntervalObservable(
      this._refreshHistory,
      interval,
      toStream(() => this.isReady)
    );

  readonly refreshAllSummary$ = (interval: number) => createIntervalObservable(this._refreshAllSummary, interval);

  readonly refreshSummary$ = (marketId: string, interval: number) =>
    createIntervalObservable(() => this._refreshSingleSummary(marketId), interval);

  readonly refreshBalances$ = toStream(() => this._accountInfoStore.accountInfo).pipe(
    filter((accountInfo): accountInfo is AccountInfo => accountInfo != null),
    distinct((accountInfo) => accountInfo.injectiveAddress),
    switchMap((accountInfo) => this._subAccountStore.fetchAllBalances(accountInfo.injectiveAddress))
  );

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
  abstract readonly marketListItems: MarketVM[];
  abstract readonly marketDetail?: MarketVM;

  protected abstract readonly _accountInfoStore: AccountInfoStore;
  protected abstract readonly _marketHistoryQuery?: MarketHistoryQuery;
  protected abstract readonly _marketStore: MarketStore<T, P>;
  protected abstract readonly _marketHistoryStore: MarketHistoryStore;
  protected abstract readonly _subAccountStore: SubAccountStore;

  constructor() {
    makeObservable(this);
  }

  @action.bound
  async refreshAllMarkets(): Promise<void> {
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
  async refreshSingleMarket(marketId: string): Promise<void> {
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
  protected async _refreshAllSummary(): Promise<void> {
    try {
      await this._marketStore.refreshSummary();
    } catch (e) {
      console.log("Error loading markets summary:", e);
    }
  }

  @action.bound
  protected async _refreshSingleSummary(marketId: string): Promise<void> {
    try {
      await this._marketStore.refreshSingleSummary(marketId);
    } catch (e) {
      console.log("Error loading market summary:", e);
    }
  }

  @action.bound
  protected async _refreshHistory(): Promise<void> {
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
