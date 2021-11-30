import { computed, makeObservable } from "mobx";
import { inject, injectable } from "inversify";
import { MarketDetailVM, MarketListItemVM } from "~/components";
import { DerivativeMarketHistoryQuery, DerivativeMarketStore, MarketHistoryStore } from "~/stores";
import { DerivativeMarketDetailVMImpl, DerivativeMarketListItemVMImpl } from "~/adapters/_models";
import { BaseMarketAdapter } from "~/adapters/injective/base";
import { AllChronosDerivativeMarketSummary, DerivativeMarket } from "@injectivelabs/derivatives-consumer";
import { MarketHistoryQuery } from "~/stores/MarketHistoryQuery";
import { MarketType } from "~/domain";

@injectable()
export class DerivativeMarketAdapterImpl extends BaseMarketAdapter<
  DerivativeMarket,
  AllChronosDerivativeMarketSummary
> {
  readonly marketType = MarketType.derivative;

  @computed
  get marketListItems(): MarketListItemVM[] {
    return this._marketStore.activeMarkets.map((market) => {
      const marketSummary = this._marketStore.marketSummaries.index.get(market.marketId);
      return new DerivativeMarketListItemVMImpl(market, marketSummary);
    });
  }

  @computed
  get marketDetail(): MarketDetailVM | undefined {
    if (this._marketStore.currentMarket && this._marketStore.currentMarketSummary) {
      return new DerivativeMarketDetailVMImpl(this._marketStore.currentMarket, this._marketStore.currentMarketSummary);
    }
  }

  @computed
  protected get _marketHistoryQuery(): MarketHistoryQuery | undefined {
    if (this._marketStore.currentMarket) {
      return new DerivativeMarketHistoryQuery(
        this._marketStore.currentMarket,
        this.defaultMarketHistoryResolution,
        this.defaultMarketHistoryPeriod
      );
    }
  }

  constructor(
    @inject(DerivativeMarketStore) protected readonly _marketStore: DerivativeMarketStore,
    @inject(MarketHistoryStore) protected readonly _marketHistoryStore: MarketHistoryStore
  ) {
    super();
    makeObservable(this);
  }
}
