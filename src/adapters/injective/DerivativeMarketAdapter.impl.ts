import { computed, makeObservable } from "mobx";
import { injectable, inject } from "inversify";
import { MarketDetailVM, MarketListItemVM } from "~/components";
import { DerivativeMarketStore } from "~/stores";
import { DerivativeMarketDetailVMImpl, DerivativeMarketListItemVMImpl } from "~/adapters/_models";
import { BaseMarketAdapter } from "~/adapters/injective/base";
import { AllChronosDerivativeMarketSummary, DerivativeMarket } from "@injectivelabs/derivatives-consumer";

@injectable()
export class DerivativeMarketAdapterImpl extends BaseMarketAdapter<
  DerivativeMarket,
  AllChronosDerivativeMarketSummary
> {
  @computed
  get marketListItems(): MarketListItemVM[] {
    return this._marketStore.activeMarkets.map((market) => {
      const marketSummary = this._marketStore.marketSummaries.index.get(market.marketId);
      return new DerivativeMarketListItemVMImpl(market, marketSummary);
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
      return new DerivativeMarketDetailVMImpl(market, marketSummary);
    }
  }

  constructor(@inject(DerivativeMarketStore) protected _marketStore: DerivativeMarketStore) {
    super();
    makeObservable(this);
  }
}
