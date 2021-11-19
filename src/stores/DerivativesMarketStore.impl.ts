import { DerivativesMarketStore } from "~/stores/DerivativesMarketStore";
import { inject } from "inversify";
import { Settings } from "~/settings";
import {
  AllChronosDerivativeMarketSummary,
  DerivativeMarket,
  DerivativeMarketConsumer,
  DerivativeMarketChronosConsumer,
  DerivativeTransformer,
} from "@injectivelabs/derivatives-consumer";
import { IndexedArray } from "~/utils";
import { computed, makeObservable, observable, runInAction } from "mobx";

export class DerivativesMarketStoreImpl implements DerivativesMarketStore {
  @observable
  marketSummaries = IndexedArray.empty<AllChronosDerivativeMarketSummary>();

  @observable
  markets: DerivativeMarket[] = [];

  @computed
  get activeMarkets() {
    return this.markets.filter((el) => el.marketStatus === "active");
  }

  private readonly _derivativesMarketConsumer: DerivativeMarketConsumer;
  private readonly _derivativesMarketChronosConsumer: DerivativeMarketChronosConsumer;

  constructor(@inject(Settings) private _settings: Settings) {
    this._derivativesMarketConsumer = new DerivativeMarketConsumer(this._settings.appUrlEndpoint.baseUrl);
    this._derivativesMarketChronosConsumer = new DerivativeMarketChronosConsumer(
      this._settings.appUrlEndpoint.exchangeUrl
    );

    makeObservable(this);
  }

  async refreshMarkets(): Promise<void> {
    const marketsInfo = await this._derivativesMarketConsumer.fetchMarkets();
    runInAction(() => {
      this.markets = DerivativeTransformer.grpcMarketsToMarkets(marketsInfo);
    });
  }

  async refreshSummary(): Promise<void> {
    const marketSummaries = await this._derivativesMarketChronosConsumer.fetchDerivativeMarketsSummary();
    runInAction(() => {
      this.marketSummaries = new IndexedArray<AllChronosDerivativeMarketSummary>(marketSummaries, (el) => el.marketId);
    });
  }
}
