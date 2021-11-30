import { MarketHistoryStore } from "~/stores";
import { inject, injectable } from "inversify";
import { Settings } from "~/settings";
import { computed, makeObservable, observable, runInAction } from "mobx";
import { MarketPrice, MarketType } from "~/domain";
import { MarketHistoryQuery } from "~/stores/MarketHistoryQuery";

export type Data = {
  c: number[];
  h: number[];
  l: number[];
  o: number[];
  t: number[];
  v: number[];
};

@injectable()
export class MarketHistoryStoreImpl implements MarketHistoryStore {
  @computed
  get data(): MarketPrice[] {
    if (!this._marketHistory) {
      return [];
    }
    const history = this._marketHistory;
    return this._marketHistory.t.map((timestamp, index) => ({
      timestamp,
      open: history.o[index],
      close: history.c[index],
      high: history.h[index],
      low: history.l[index],
      volume: history.v[index],
    }));
  }

  @observable
  private _marketHistory?: Data;

  constructor(@inject(Settings) private readonly _settings: Settings) {
    makeObservable(this);
  }

  async refresh(marketType: MarketType, query: MarketHistoryQuery) {
    const endpoint = this._buildMarketHistoryEndpoint(marketType);
    const response = await fetch(`${endpoint}?${query.toString()}`);
    if (response.ok) {
      const data = await response.json();
      runInAction(() => (this._marketHistory = data));
    } else {
      throw new Error(`Server returns HTTP error status code ${response.status}`);
    }
  }

  private _buildMarketHistoryEndpoint(marketType: MarketType): string {
    return `${this._settings.appUrlEndpoint.baseUrl}/chronos/v1/${marketType}/history`;
  }
}
