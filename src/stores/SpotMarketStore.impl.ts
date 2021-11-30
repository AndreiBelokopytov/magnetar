import {
  AllChronosSpotMarketSummary,
  SpotMarket,
  SpotMarketChronosConsumer,
  SpotMarketConsumer,
  SpotTransformer,
} from "@injectivelabs/spot-consumer";
import { action, computed, makeObservable, observable, runInAction } from "mobx";
import { inject, injectable } from "inversify";
import { Settings } from "~/settings";
import { IndexedArray } from "~/utils";
import { SpotMarketStore } from "~/stores/SportMarketStore";

@injectable()
export class SpotMarketStoreImpl implements SpotMarketStore {
  @observable marketSummaries = IndexedArray.empty<AllChronosSpotMarketSummary>();

  @observable markets = IndexedArray.empty<SpotMarket>();

  @computed
  get activeMarkets() {
    return this.markets.items.filter((el) => {
      const isActive = el.marketStatus === "active";
      const marketSummary = this.marketSummaries.index.get(el.marketId);
      return isActive && marketSummary && marketSummary?.price > 0;
    });
  }

  @computed
  get currentMarket() {
    if (this._refreshedMarketId) {
      return this.markets.index.get(this._refreshedMarketId);
    }
  }

  @computed
  get currentMarketSummary() {
    if (this._refreshedMarketId) {
      return this.marketSummaries.index.get(this._refreshedMarketId);
    }
  }

  @observable
  private _refreshedMarketId?: string;
  private _spotMarketChronosConsumer: SpotMarketChronosConsumer;
  private _spotMarketConsumer: SpotMarketConsumer;

  constructor(@inject(Settings) private _settings: Settings) {
    this._spotMarketChronosConsumer = new SpotMarketChronosConsumer(this._settings.appUrlEndpoint.baseUrl);
    this._spotMarketConsumer = new SpotMarketConsumer(this._settings.appUrlEndpoint.exchangeUrl);

    makeObservable(this);
  }

  @action
  async refreshMarkets(): Promise<void> {
    const allSpotMarketInfo = await this._spotMarketConsumer.fetchMarkets();
    runInAction(() => {
      const markets = SpotTransformer.grpcMarketsToMarkets(allSpotMarketInfo);
      this.markets = new IndexedArray<SpotMarket>(markets, (el) => el.marketId);
    });
  }

  @action
  async refreshSummary(): Promise<void> {
    const marketSummaries = await this._spotMarketChronosConsumer.fetchSpotMarketsSummary();
    runInAction(() => {
      this.marketSummaries = new IndexedArray<AllChronosSpotMarketSummary>(marketSummaries, (el) => el.marketId);
    });
  }

  @action
  async refreshSingleMarket(id: string): Promise<void> {
    this._refreshedMarketId = id;
    const marketInfo = await this._spotMarketConsumer.fetchMarket(id);
    runInAction(() => {
      const market = SpotTransformer.grpcMarketToMarket(marketInfo);
      this.markets.index.set(market.marketId, market);
    });
  }

  @action
  async refreshSingleSummary(marketId: string): Promise<void> {
    const marketSummary = await this._spotMarketChronosConsumer.fetchSpotMarketSummary(marketId);
    runInAction(() => {
      this.marketSummaries.index.set(marketId, {
        ...marketSummary,
        marketId,
      });
    });
  }
}
