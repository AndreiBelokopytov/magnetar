import { AllChronosSpotMarketSummary, SpotMarket } from "@injectivelabs/spot-consumer";
import { MarketListItemVM } from "~/components";
import { MarketType } from "~/domain";

export class SpotMarketListItemVMImpl implements MarketListItemVM {
  get id() {
    return this._spotMarket.marketId;
  }

  get ticker() {
    return this._spotMarket.baseToken?.name ?? "";
  }

  get imageUrl() {
    return this._spotMarket.baseToken?.logo;
  }

  get pair() {
    return this._spotMarket.ticker;
  }

  get lastPrice() {
    if (this._marketSummary) {
      return `${this._marketSummary.price.toFixed(2)} ${this._spotMarket.quoteToken?.symbol}`;
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
    return MarketType.spot;
  }

  constructor(
    private readonly _spotMarket: SpotMarket,
    private readonly _marketSummary?: AllChronosSpotMarketSummary
  ) {}
}
