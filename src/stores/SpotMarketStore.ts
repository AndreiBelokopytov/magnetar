import {
  AllChronosSpotMarketSummary,
  SpotMarket,
  SpotMarketChronosConsumer,
  SpotMarketConsumer,
  SpotTransformer,
} from "@injectivelabs/spot-consumer";
import { computed, makeObservable, observable, runInAction } from "mobx";
import { inject, injectable } from "inversify";
import { Settings } from "../settings";
import { IndexedArray } from "../utils";

@injectable()
export class SpotMarketStore {
  static readonly TYPE = Symbol("MarketsStoreInjective");

  @observable
  marketSummaries = IndexedArray.empty<AllChronosSpotMarketSummary>();

  @observable
  markets: SpotMarket[] = [];

  @computed
  get activeMarkets() {
    return this.markets.filter((el) => el.marketStatus === "active");
  }

  @observable
  private _marketSummaries: AllChronosSpotMarketSummary[] = [];

  private _spotMarketChronosConsumer: SpotMarketChronosConsumer;
  private _spotMarketConsumer: SpotMarketConsumer;

  constructor(@inject(Settings) private _settings: Settings) {
    this._spotMarketChronosConsumer = new SpotMarketChronosConsumer(this._settings.appUrlEndpoint.baseUrl);
    this._spotMarketConsumer = new SpotMarketConsumer(this._settings.appUrlEndpoint.exchangeUrl);

    makeObservable(this);
  }

  async refresh(): Promise<void> {
    const allChronosSpotMarketSummary = await this._spotMarketChronosConsumer.fetchSpotMarketsSummary();
    const allSpotMarketInfo = await this._spotMarketConsumer.fetchMarkets();

    runInAction(() => {
      this.marketSummaries = new IndexedArray<AllChronosSpotMarketSummary>(
        allChronosSpotMarketSummary,
        (el) => el.marketId
      );
      this.markets = SpotTransformer.grpcMarketsToMarkets(allSpotMarketInfo);
    });
  }
}
