import {
  AllChronosSpotMarketSummary,
  SpotMarket,
  SpotMarketChronosConsumer,
  SpotMarketConsumer,
  SpotTransformer,
} from "@injectivelabs/spot-consumer";
import { makeObservable, observable, runInAction } from "mobx";
import { inject, injectable } from "inversify";
import { Settings } from "../settings";

@injectable()
export class SpotMarketStore {
  static readonly TYPE = Symbol("MarketsStoreInjective");

  @observable
  spotMarketSummaries: AllChronosSpotMarketSummary[] = [];

  @observable
  spotMarkets: SpotMarket[] = [];

  private _spotMarketChronosConsumer: SpotMarketChronosConsumer;
  private _spotMarketConsumer: SpotMarketConsumer;

  constructor(@inject(Settings) private _settings: Settings) {
    this._spotMarketChronosConsumer = new SpotMarketChronosConsumer(this._settings.appUrlEndpoint.baseUrl);
    this._spotMarketConsumer = new SpotMarketConsumer(this._settings.appUrlEndpoint.baseUrl);

    makeObservable(this);
  }

  async refresh(): Promise<void> {
    const allChronosSpotMarketSummary = await this._spotMarketChronosConsumer.fetchSpotMarketsSummary();
    const allSpotMarketInfo = await this._spotMarketConsumer.fetchMarkets();

    runInAction(() => {
      this.spotMarketSummaries = allChronosSpotMarketSummary;
      this.spotMarkets = SpotTransformer.grpcMarketsToMarkets(allSpotMarketInfo);
    });
  }
}
