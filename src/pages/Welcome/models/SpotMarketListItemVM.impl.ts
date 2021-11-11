import { AllChronosSpotMarketSummary, SpotMarket } from "@injectivelabs/spot-consumer";
import { computed, makeObservable } from "mobx";
import { SpotMarketListItemVM } from "~/components";

export class SpotMarketListItemVMImpl implements SpotMarketListItemVM {
  @computed
  get id() {
    return this._spotMarket.marketId;
  }

  @computed
  get ticker() {
    return this._spotMarket.baseToken?.name ?? "";
  }

  @computed
  get imageUrl() {
    return this._spotMarket.baseToken?.logo;
  }

  @computed
  get pair() {
    return this._spotMarket.ticker;
  }

  @computed
  get lastPrice() {
    if (this._marketSummary) {
      return `${this._marketSummary.price.toFixed(2)} ${this._spotMarket.quoteToken?.symbol}`;
    }
    return "no data";
  }

  @computed
  get change() {
    if (this._marketSummary) {
      return `${this._marketSummary?.change.toFixed(2)}%`;
    }
    return "no data";
  }

  constructor(private _spotMarket: SpotMarket, private _marketSummary?: AllChronosSpotMarketSummary) {
    makeObservable(this);
  }
}
