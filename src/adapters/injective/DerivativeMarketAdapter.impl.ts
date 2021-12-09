import { computed, makeObservable } from "mobx";
import { inject, injectable } from "inversify";
import {
  AccountInfoStore,
  DerivativeMarketHistoryQuery,
  DerivativeMarketStore,
  MarketHistoryStore,
  SubAccountStore,
} from "~/stores";
import { DerivativeMarketVMImpl } from "~/adapters/_models";
import { BaseMarketAdapter } from "~/adapters/injective/base";
import { AllChronosDerivativeMarketSummary, DerivativeMarket } from "@injectivelabs/derivatives-consumer";
import { MarketHistoryQuery } from "~/stores/MarketHistoryQuery";
import { MarketType } from "~/domain";
import { MarketVM } from "~/components";

@injectable()
export class DerivativeMarketAdapterImpl extends BaseMarketAdapter<
  DerivativeMarket,
  AllChronosDerivativeMarketSummary
> {
  readonly marketType = MarketType.derivative;

  @computed
  get marketListItems(): MarketVM[] {
    return this._marketStore.activeMarkets.map((market) => {
      const marketSummary = this._marketStore.marketSummaries.index.get(market.marketId);
      return new DerivativeMarketVMImpl(market, marketSummary);
    });
  }

  @computed
  get marketDetail(): MarketVM | undefined {
    if (this._marketStore.currentMarket && this._marketStore.currentMarketSummary) {
      return new DerivativeMarketVMImpl(this._marketStore.currentMarket, this._marketStore.currentMarketSummary);
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
    @inject(AccountInfoStore) protected _accountInfoStore: AccountInfoStore,
    @inject(DerivativeMarketStore) protected readonly _marketStore: DerivativeMarketStore,
    @inject(MarketHistoryStore) protected readonly _marketHistoryStore: MarketHistoryStore,
    @inject(SubAccountStore) protected readonly _subAccountStore: SubAccountStore
  ) {
    super();
    makeObservable(this);
  }
}
