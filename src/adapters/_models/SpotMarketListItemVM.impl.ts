import { AllChronosSpotMarketSummary, SpotMarket } from "@injectivelabs/spot-consumer";
import { MarketListItemVM } from "~/components";
import { MarketType } from "~/domain";

export class SpotMarketListItemVMImpl implements MarketListItemVM {
  get id() {
    return this._market.marketId;
  }

  get ticker() {
    return this._market.baseToken?.name ?? "";
  }

  get imageUrl() {
    return this._market.baseToken?.logo;
  }

  get pair() {
    return this._market.ticker;
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
    return `/${MarketType.spot}/${this.id}`;
  }

  constructor(private readonly _market: SpotMarket, private readonly _marketSummary?: AllChronosSpotMarketSummary) {}
}
