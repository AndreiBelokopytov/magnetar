import { computed, makeObservable } from "mobx";
import { injectable, inject } from "inversify";
import { MarketDetailVM, MarketListItemVM } from "~/components";
import { SpotMarketStore } from "~/stores";
import { SpotMarketDetailVMImpl, SpotMarketListItemVMImpl } from "~/adapters/_models";
import { BaseMarketAdapter } from "~/adapters/injective/base";
import { AllChronosSpotMarketSummary, SpotMarket } from "@injectivelabs/spot-consumer";

@injectable()
export class SpotMarketAdapterImpl extends BaseMarketAdapter<SpotMarket, AllChronosSpotMarketSummary> {
  @computed
  get marketListItems(): MarketListItemVM[] {
    return this._marketStore.activeMarkets.map((market) => {
      const marketSummary = this._marketStore.marketSummaries.index.get(market.marketId);
      return new SpotMarketListItemVMImpl(market, marketSummary);
    });
  }

  @computed
  get marketDetail(): MarketDetailVM | undefined {
    if (!this._marketStore.refreshedMarketId) {
      return;
    }
    const marketId = this._marketStore.refreshedMarketId;
    const market = this._marketStore.markets.index.get(marketId);
    const marketSummary = this._marketStore.marketSummaries.index.get(marketId);
    if (market && marketSummary) {
      return new SpotMarketDetailVMImpl(market, marketSummary);
    }
  }

  constructor(@inject(SpotMarketStore) protected _marketStore: SpotMarketStore) {
    super();
    makeObservable(this);
  }
}
