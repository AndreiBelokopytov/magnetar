import { MarketListItemVM } from "~/components";
import { MarketType } from "~/domain";
import { AllChronosDerivativeMarketSummary, DerivativeMarket } from "@injectivelabs/derivatives-consumer";

export class DerivativeMarketListItemVMImpl implements MarketListItemVM {
  get id() {
    return this._market.marketId;
  }

  get ticker() {
    return this._market.ticker;
  }

  get imageUrl() {
    return this._market.quoteToken?.logo;
  }

  get pair() {
    return this._market.quoteToken?.symbol ?? "";
  }

  get lastPrice() {
    if (this._marketSummary) {
      return `${this._marketSummary.price.toFixed(2)} ${this._market.quoteToken?.symbol}`;
    }
    return "no data";
  }

  get change() {
    if (this._marketSummary) {
      return `${this._marketSummary?.change.toFixed(2)}%`;
    }
    return "no data";
  }

  get detailPageUrl() {
    return `/${MarketType.derivative}/${this.id}`;
  }

  constructor(
    private readonly _market: DerivativeMarket,
    private readonly _marketSummary?: AllChronosDerivativeMarketSummary
  ) {}
}
