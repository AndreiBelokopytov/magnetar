import { computed, makeObservable } from "mobx";
import { inject, injectable } from "inversify";
import {
  AccountInfoStore,
  MarketHistoryStore,
  SpotMarketHistoryQuery,
  SpotMarketStore,
  SubAccountStore,
} from "~/stores";
import { SpotMarketVMImpl } from "~/adapters/_models";
import { BaseMarketAdapter } from "~/adapters/injective/base";
import { AllChronosSpotMarketSummary, SpotMarket } from "@injectivelabs/spot-consumer";
import { MarketHistoryQuery } from "~/stores/MarketHistoryQuery";
import { MarketType } from "~/domain";
import { MarketVM } from "~/components";
import { SubaccountBalance } from "@injectivelabs/subaccount-consumer";

@injectable()
export class SpotMarketAdapterImpl extends BaseMarketAdapter<SpotMarket, AllChronosSpotMarketSummary> {
  readonly marketType = MarketType.spot;

  @computed
  get marketListItems(): MarketVM[] {
    return this._marketStore.activeMarkets.map((market) => {
      const marketSummary = this._marketStore.marketSummaries.index.get(market.marketId);
      return new SpotMarketVMImpl(market, marketSummary);
    });
  }

  @computed
  get marketDetail(): MarketVM | undefined {
    if (this._marketStore.currentMarket && this._marketStore.currentMarketSummary) {
      return new SpotMarketVMImpl(
        this._marketStore.currentMarket,
        this._marketStore.currentMarketSummary,
        this._baseTokenBalance,
        this._quoteTokenBalance
      );
    }
  }

  @computed
  protected get _baseTokenBalance(): SubaccountBalance | undefined {
    if (this._marketStore.currentMarket) {
      return this._subAccountStore.balances.index.get(this._marketStore.currentMarket.baseDenom);
    }
  }

  @computed
  protected get _quoteTokenBalance(): SubaccountBalance | undefined {
    if (this._marketStore.currentMarket) {
      return this._subAccountStore.balances.index.get(this._marketStore.currentMarket.quoteDenom);
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
    @inject(AccountInfoStore) protected _accountInfoStore: AccountInfoStore,
    @inject(SpotMarketStore) protected _marketStore: SpotMarketStore,
    @inject(MarketHistoryStore) protected readonly _marketHistoryStore: MarketHistoryStore,
    @inject(SubAccountStore) protected readonly _subAccountStore: SubAccountStore
  ) {
    super();
    makeObservable(this);
  }
}
