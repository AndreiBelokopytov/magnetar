import {
  AllChronosSpotMarketSummary,
  SpotMarket,
  SpotMarketChronosConsumer,
  SpotMarketConsumer,
  SpotTransformer,
} from "@injectivelabs/spot-consumer";
import { computed, makeObservable, observable, runInAction } from "mobx";
import { inject, injectable } from "inversify";
import { Settings } from "~/settings";
import { IndexedArray } from "~/utils";
import { SpotMarketStore } from "~/stores";

@injectable()
export class SpotMarketStoreImpl implements SpotMarketStore {
  @observable marketSummaries = IndexedArray.empty<AllChronosSpotMarketSummary>();

  @observable markets: SpotMarket[] = [];

  @computed
  get activeMarkets() {
    return this.markets.filter((el) => el.marketStatus === "active");
  }

  private _spotMarketChronosConsumer: SpotMarketChronosConsumer;
  private _spotMarketConsumer: SpotMarketConsumer;

  constructor(@inject(Settings) private _settings: Settings) {
    this._spotMarketChronosConsumer = new SpotMarketChronosConsumer(this._settings.appUrlEndpoint.baseUrl);
    this._spotMarketConsumer = new SpotMarketConsumer(this._settings.appUrlEndpoint.exchangeUrl);

    makeObservable(this);
  }

  async refreshMarkets(): Promise<void> {
    const allSpotMarketInfo = await this._spotMarketConsumer.fetchMarkets();
    runInAction(() => {
      this.markets = SpotTransformer.grpcMarketsToMarkets(allSpotMarketInfo);
    });
  }

  async refreshSummary(): Promise<void> {
    const marketSummaries = await this._spotMarketChronosConsumer.fetchSpotMarketsSummary();
    runInAction(() => {
      this.marketSummaries = new IndexedArray<AllChronosSpotMarketSummary>(marketSummaries, (el) => el.marketId);
    });
  }
}
