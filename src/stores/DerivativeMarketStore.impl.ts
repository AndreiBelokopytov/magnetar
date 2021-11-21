import { DerivativeMarketStore } from "~/stores/DerivativeMarketStore";
import { inject, injectable } from "inversify";
import { Settings } from "~/settings";
import {
  AllChronosDerivativeMarketSummary,
  DerivativeMarket,
  DerivativeMarketConsumer,
  DerivativeMarketChronosConsumer,
  DerivativeTransformer,
} from "@injectivelabs/derivatives-consumer";
import { IndexedArray } from "~/utils";
import { action, computed, makeObservable, observable, runInAction } from "mobx";

@injectable()
export class DerivativeMarketStoreImpl implements DerivativeMarketStore {
  @observable
  marketSummaries = IndexedArray.empty<AllChronosDerivativeMarketSummary>();

  @observable
  markets = IndexedArray.empty<DerivativeMarket>();

  @computed
  get activeMarkets() {
    return this.markets.items.filter((el) => el.marketStatus === "active");
  }

  @computed
  get refreshedMarketId() {
    return this._refreshedMarketId;
  }

  @observable
  private _refreshedMarketId: string | undefined;
  private readonly _derivativesMarketConsumer: DerivativeMarketConsumer;
  private readonly _derivativesMarketChronosConsumer: DerivativeMarketChronosConsumer;

  constructor(@inject(Settings) private _settings: Settings) {
    this._derivativesMarketConsumer = new DerivativeMarketConsumer(this._settings.appUrlEndpoint.baseUrl);
    this._derivativesMarketChronosConsumer = new DerivativeMarketChronosConsumer(
      this._settings.appUrlEndpoint.exchangeUrl
    );

    makeObservable(this);
  }

  @action
  async refreshMarkets(): Promise<void> {
    const marketsInfo = await this._derivativesMarketConsumer.fetchMarkets();
    runInAction(() => {
      const markets = DerivativeTransformer.grpcMarketsToMarkets(marketsInfo);
      this.markets = new IndexedArray<DerivativeMarket>(markets, (el) => el.marketId);
    });
  }

  @action
  async refreshSummary(): Promise<void> {
    const marketSummaries = await this._derivativesMarketChronosConsumer.fetchDerivativeMarketsSummary();
    runInAction(() => {
      this.marketSummaries = new IndexedArray<AllChronosDerivativeMarketSummary>(marketSummaries, (el) => el.marketId);
    });
  }

  @action
  async refreshSingleMarket(id: string): Promise<void> {
    this._refreshedMarketId = id;
    const marketInfo = await this._derivativesMarketConsumer.fetchMarket(id);
    runInAction(() => {
      const market = DerivativeTransformer.grpcMarketToMarket(marketInfo);
      this.markets.index.set(market.marketId, market);
    });
  }

  @action
  async refreshSingleSummary(marketId: string): Promise<void> {
    const marketSummary = await this._derivativesMarketChronosConsumer.fetchDerivativeMarketSummary(marketId);
    runInAction(() => {
      this.marketSummaries.index.set(marketId, {
        ...marketSummary,
        marketId,
      });
    });
  }
}
