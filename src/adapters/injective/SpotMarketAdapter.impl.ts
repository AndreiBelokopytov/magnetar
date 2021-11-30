import { computed, makeObservable } from "mobx";
import { inject, injectable } from "inversify";
import { MarketDetailVM, MarketListItemVM } from "~/components";
import { MarketHistoryStore, SpotMarketHistoryQuery, SpotMarketStore } from "~/stores";
import { SpotMarketDetailVMImpl, SpotMarketListItemVMImpl } from "~/adapters/_models";
import { BaseMarketAdapter } from "~/adapters/injective/base";
import { AllChronosSpotMarketSummary, SpotMarket } from "@injectivelabs/spot-consumer";
import { MarketHistoryQuery } from "~/stores/MarketHistoryQuery";
import { MarketType } from "~/domain";

@injectable()
export class SpotMarketAdapterImpl extends BaseMarketAdapter<SpotMarket, AllChronosSpotMarketSummary> {
  readonly marketType = MarketType.spot;

  @computed
  get marketListItems(): MarketListItemVM[] {
    return this._marketStore.activeMarkets.map((market) => {
      const marketSummary = this._marketStore.marketSummaries.index.get(market.marketId);
      return new SpotMarketListItemVMImpl(market, marketSummary);
    });
  }

  @computed
  get marketDetail(): MarketDetailVM | undefined {
    if (this._marketStore.currentMarket && this._marketStore.currentMarketSummary) {
      return new SpotMarketDetailVMImpl(this._marketStore.currentMarket, this._marketStore.currentMarketSummary);
    }
  }

  @computed
  protected get _marketHistoryQuery(): MarketHistoryQuery | undefined {
    if (this._marketStore.currentMarket) {
      return new SpotMarketHistoryQuery(
        this._marketStore.currentMarket,
        this.defaultMarketHistoryResolution,
        this.defaultMarketHistoryPeriod
      );
    }
  }

  constructor(
    @inject(SpotMarketStore) protected _marketStore: SpotMarketStore,
    @inject(MarketHistoryStore) protected readonly _marketHistoryStore: MarketHistoryStore
  ) {
    super();
    makeObservable(this);
  }
}
